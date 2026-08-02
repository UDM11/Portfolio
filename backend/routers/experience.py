from fastapi import APIRouter, HTTPException, Depends
from database import supabase
from models import ExperienceData
from utils.security import get_admin_token

router = APIRouter(prefix="/api/experience", tags=["experience"])

@router.get("")
async def get_experiences():
    try:
        response = supabase.table("experience").select("*").order("created_at", desc=False).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("", dependencies=[Depends(get_admin_token)])
async def create_experience(exp: ExperienceData):
    try:
        response = supabase.table("experience").insert(exp.model_dump()).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{exp_id}", dependencies=[Depends(get_admin_token)])
async def update_experience(exp_id: str, exp: ExperienceData):
    try:
        response = supabase.table("experience").update(exp.model_dump()).eq("id", exp_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Experience not found")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{exp_id}", dependencies=[Depends(get_admin_token)])
async def delete_experience(exp_id: str):
    try:
        response = supabase.table("experience").delete().eq("id", exp_id).execute()
        return {"message": "Experience deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
