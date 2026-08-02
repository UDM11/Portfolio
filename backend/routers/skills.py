from fastapi import APIRouter, HTTPException, Depends
from database import supabase
from models import SkillData
from utils.security import get_admin_token

router = APIRouter(prefix="/api/skills", tags=["skills"])

@router.get("")
async def get_skills():
    try:
        response = supabase.table("skills").select("*").order("created_at", desc=False).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("", dependencies=[Depends(get_admin_token)])
async def create_skill(skill: SkillData):
    try:
        response = supabase.table("skills").insert(skill.model_dump()).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{skill_id}", dependencies=[Depends(get_admin_token)])
async def update_skill(skill_id: str, skill: SkillData):
    try:
        response = supabase.table("skills").update(skill.model_dump()).eq("id", skill_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Skill not found")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{skill_id}", dependencies=[Depends(get_admin_token)])
async def delete_skill(skill_id: str):
    try:
        response = supabase.table("skills").delete().eq("id", skill_id).execute()
        return {"message": "Skill deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
