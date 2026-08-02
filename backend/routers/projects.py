from fastapi import APIRouter, HTTPException, Depends
from database import supabase
from models import ProjectData
from utils.security import get_admin_token

router = APIRouter(prefix="/api/projects", tags=["projects"])

@router.get("")
async def get_projects():
    try:
        response = supabase.table("projects").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("", dependencies=[Depends(get_admin_token)])
async def create_project(project: ProjectData):
    try:
        response = supabase.table("projects").insert(project.model_dump()).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{project_id}", dependencies=[Depends(get_admin_token)])
async def update_project(project_id: str, project: ProjectData):
    try:
        response = supabase.table("projects").update(project.model_dump()).eq("id", project_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Project not found")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{project_id}", dependencies=[Depends(get_admin_token)])
async def delete_project(project_id: str):
    try:
        response = supabase.table("projects").delete().eq("id", project_id).execute()
        return {"message": "Project deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
