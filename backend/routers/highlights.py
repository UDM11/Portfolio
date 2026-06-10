from fastapi import APIRouter, HTTPException
from database import supabase
from models import HighlightData

router = APIRouter(prefix="/api/highlights", tags=["highlights"])

@router.get("")
async def get_highlights():
    try:
        response = supabase.table("about_highlights").select("*").order("created_at", desc=False).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("")
async def create_highlight(highlight: HighlightData):
    try:
        response = supabase.table("about_highlights").insert(highlight.model_dump()).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{highlight_id}")
async def update_highlight(highlight_id: str, highlight: HighlightData):
    try:
        response = supabase.table("about_highlights").update(highlight.model_dump()).eq("id", highlight_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Highlight not found")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{highlight_id}")
async def delete_highlight(highlight_id: str):
    try:
        response = supabase.table("about_highlights").delete().eq("id", highlight_id).execute()
        return {"message": "Highlight deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
