from fastapi import APIRouter, HTTPException, Depends
from database import supabase
from models import ContactInfoData
from utils.security import get_admin_token

router = APIRouter(prefix="/api/contact-info", tags=["contact-info"])

@router.get("")
async def get_contact_info():
    try:
        response = supabase.table("contact_info").select("*").order("created_at", desc=False).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("", dependencies=[Depends(get_admin_token)])
async def create_contact_info(info: ContactInfoData):
    try:
        response = supabase.table("contact_info").insert(info.model_dump()).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{info_id}", dependencies=[Depends(get_admin_token)])
async def update_contact_info(info_id: str, info: ContactInfoData):
    try:
        response = supabase.table("contact_info").update(info.model_dump()).eq("id", info_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Contact info not found")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{info_id}", dependencies=[Depends(get_admin_token)])
async def delete_contact_info(info_id: str):
    try:
        response = supabase.table("contact_info").delete().eq("id", info_id).execute()
        return {"message": "Contact info deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
