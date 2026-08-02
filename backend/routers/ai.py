import json
import time
import urllib.request
import urllib.error
from collections import defaultdict
from fastapi import APIRouter, HTTPException, Depends, Request
from database import supabase
from models import ChatPayload, GenerateProjectPayload
from config import GEMINI_API_KEY
from utils.security import get_admin_token

router = APIRouter(prefix="/api/ai", tags=["ai"])

def call_gemini(prompt: str, system_instruction: str = "") -> str:
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key is missing. Configure GEMINI_API_KEY in backend environment settings.")
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key={GEMINI_API_KEY}"
    
    contents = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "maxOutputTokens": 150,
            "temperature": 0.5
        }
    }
    
    if system_instruction:
        contents["systemInstruction"] = {
            "parts": [
                {"text": system_instruction}
            ]
        }
        
    data = json.dumps(contents).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode("utf-8")
            res_json = json.loads(res_body)
            text = res_json["candidates"][0]["content"]["parts"][0]["text"]
            return text
    except urllib.error.HTTPError as e:
        if e.code == 429:
            return "AI Umesh is currently resting (rate limited). Please try asking again in a minute!"
        raise HTTPException(status_code=500, detail=f"Gemini service call failed: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini service call failed: {str(e)}")

def call_gemini_json(prompt: str, system_instruction: str = "") -> dict:
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key is missing.")
        
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key={GEMINI_API_KEY}"
    
    contents = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json"
        }
    }
    
    if system_instruction:
        contents["systemInstruction"] = {
            "parts": [
                {"text": system_instruction}
            ]
        }
        
    data = json.dumps(contents).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode("utf-8")
            res_json = json.loads(res_body)
            text = res_json["candidates"][0]["content"]["parts"][0]["text"]
            return json.loads(text)
    except urllib.error.HTTPError as e:
        if e.code == 429:
            raise HTTPException(status_code=429, detail="Gemini AI is currently rate-limited. Please retry in a minute.")
        raise HTTPException(status_code=500, detail=f"Failed to generate structured data: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate structured data: {str(e)}")

# Simple IP-based in-memory rate limiter
# Max 10 chat requests per minute per IP
chat_rate_limits = defaultdict(list)

def check_chat_rate_limit(request: Request):
    ip = request.client.host if request.client else "unknown"
    now = time.time()
    chat_rate_limits[ip] = [t for t in chat_rate_limits[ip] if now - t < 60]
    
    if len(chat_rate_limits[ip]) >= 10:
        raise HTTPException(
            status_code=429, 
            detail="Too many requests. Please wait a minute before sending another query."
        )
    
    chat_rate_limits[ip].append(now)

@router.post("/chat")
async def chat_with_umesh_avatar(payload: ChatPayload, request: Request):
    check_chat_rate_limit(request)
    try:
        # Load real-time database context
        projects = supabase.table("projects").select("*").execute().data
        skills = supabase.table("skills").select("*").execute().data
        experience = supabase.table("experience").select("*").execute().data
        contact = supabase.table("contact_info").select("*").execute().data
    except Exception as e:
        # Fallback to empty if DB query fails
        projects, skills, experience, contact = [], [], [], []

    system_instruction = f"""
You are the AI avatar/assistant of Umesh Darlami. Your name is "AI Umesh".
Answer recruiter and client queries professionally, dynamically, and with confidence.
Here is the official database of Umesh's portfolio:

PROJECTS:
{json.dumps(projects)}

SKILLS:
{json.dumps(skills)}

EXPERIENCE & EDUCATION:
{json.dumps(experience)}

CONTACT INFO:
{json.dumps(contact)}

System Instructions:
- Answer in first person ("I", "my") as Umesh Darlami.
- Keep your answer extremely short, precise, and to the point (maximum 2 to 3 sentences). Avoid writing long paragraphs.
- Do not make up achievements. Stick strictly to the database. If asked about something not in the database, answer politely that you haven't published details on that yet but are always learning.
"""
    # Compile history conversation structure
    prompt_parts = []
    for turn in payload.history:
        role = "User" if turn.get("role") == "user" else "AI Umesh"
        prompt_parts.append(f"{role}: {turn.get('content')}")
    
    prompt_parts.append(f"User: {payload.message}")
    prompt_parts.append("AI Umesh:")
    prompt = "\n".join(prompt_parts)

    response_text = call_gemini(prompt, system_instruction)
    return {"response": response_text.strip()}

@router.post("/generate-project", dependencies=[Depends(get_admin_token)])
async def generate_project_details(payload: GenerateProjectPayload):
    prompt = f"""
Generate a professional portfolio project detail block.
Seed Title: {payload.title}
Seed Description: {payload.description}

You must return a valid JSON object matching this structure EXACTLY:
{{
  "description": "Professional paragraph detailing the project's architecture, value proposition, and problems solved.",
  "tech": ["Tag1", "Tag2", "Tag3", "Tag4"],
  "features": [
    "Core feature description 1",
    "Core feature description 2",
    "Core feature description 3"
  ]
}}
"""
    system_instruction = "You are a professional full-stack software engineer writing details for your portfolio projects."
    structured_json = call_gemini_json(prompt, system_instruction)
    return structured_json
