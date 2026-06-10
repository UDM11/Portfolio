import os
from database import supabase

def upload_profile_image():
    image_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "src", "assets", "profile.jpg"))
    print(f"Reading profile image from: {image_path}")
    
    if not os.path.exists(image_path):
        print(f"Error: {image_path} does not exist.")
        return
        
    with open(image_path, "rb") as f:
        file_content = f.read()
        
    bucket_name = "project-images"
    file_name = "profile.jpg"
    
    print(f"Uploading to Supabase bucket '{bucket_name}' as '{file_name}'...")
    
    try:
        # First, try to remove if it exists to overwrite it cleanly
        try:
            supabase.storage.from_(bucket_name).remove([file_name])
            print("Removed existing profile.jpg in the bucket.")
        except Exception:
            pass
            
        # Upload
        response = supabase.storage.from_(bucket_name).upload(
            path=file_name,
            file=file_content,
            file_options={"content-type": "image/jpeg"}
        )
        print("Upload successful!")
        
        # Get public url
        public_url = supabase.storage.from_(bucket_name).get_public_url(file_name)
        print(f"Public URL: {public_url}")
        
    except Exception as e:
        print(f"Error during upload: {e}")

if __name__ == "__main__":
    upload_profile_image()
