from fastapi import APIRouter, HTTPException
from database import supabase
from models import MessageData

router = APIRouter(prefix="/api/messages", tags=["messages"])

@router.post("")
async def create_message(msg: MessageData):
    try:
        response = supabase.table("messages").insert(msg.model_dump()).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("")
async def get_messages():
    try:
        response = supabase.table("messages").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{msg_id}")
async def delete_message(msg_id: str):
    try:
        response = supabase.table("messages").delete().eq("id", msg_id).execute()
        return {"message": "Message deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
