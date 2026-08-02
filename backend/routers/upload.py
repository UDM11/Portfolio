import os
import uuid
from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from database import supabase
from utils.security import get_admin_token

router = APIRouter(prefix="/api/upload", tags=["upload"])

@router.post("", dependencies=[Depends(get_admin_token)])
async def upload_image(file: UploadFile = File(...)):
    try:
        file_ext = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_ext}"
        file_content = await file.read()
        
        # Upload to Supabase bucket 'project-images'
        response = supabase.storage.from_("project-images").upload(
            path=unique_filename,
            file=file_content,
            file_options={"content-type": file.content_type}
        )
        
        # Get public url
        public_url = supabase.storage.from_("project-images").get_public_url(unique_filename)
        return {"url": public_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")
