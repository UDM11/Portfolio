import os
import uuid
from typing import List, Optional
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

app = FastAPI(title="Portfolio Admin API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase Client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")  # Fallback password

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in env")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Models
class AdminLogin(BaseModel):
    password: str

class ProjectData(BaseModel):
    title: str
    description: str
    image: str
    tech: List[str]
    category: str
    github: Optional[str] = ""
    demo: Optional[str] = ""
    features: List[str] = []
    status: str

# Admin Login Endpoint
@app.post("/api/admin/login")
async def admin_login(login: AdminLogin):
    if login.password == ADMIN_PASSWORD:
        return {"authenticated": True, "token": "admin-session-token-placeholder"}
    raise HTTPException(status_code=401, detail="Invalid admin password")

# Projects Endpoints (Secured via service role key bypass)
@app.get("/api/projects")
async def get_projects():
    try:
        response = supabase.table("projects").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/projects")
async def create_project(project: ProjectData):
    try:
        response = supabase.table("projects").insert(project.model_dump()).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/projects/{project_id}")
async def update_project(project_id: str, project: ProjectData):
    try:
        response = supabase.table("projects").update(project.model_dump()).eq("id", project_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Project not found")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/projects/{project_id}")
async def delete_project(project_id: str):
    try:
        response = supabase.table("projects").delete().eq("id", project_id).execute()
        return {"message": "Project deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# File Upload Endpoint (Uploads to Supabase Storage)
@app.post("/api/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        file_ext = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_ext}"
        file_content = await file.read()
        
        # Upload to Supabase bucket 'portfolio-images'
        response = supabase.storage.from_("portfolio-images").upload(
            path=unique_filename,
            file=file_content,
            file_options={"content-type": file.content_type}
        )
        
        # Get public url
        public_url = supabase.storage.from_("portfolio-images").get_public_url(unique_filename)
        return {"url": public_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")
