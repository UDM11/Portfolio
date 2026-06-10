import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from config import PORT
from routers import admin, projects, skills, experience, highlights, contact, messages, upload

app = FastAPI(title="Portfolio Admin API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(admin.router)
app.include_router(projects.router)
app.include_router(skills.router)
app.include_router(experience.router)
app.include_router(highlights.router)
app.include_router(contact.router)
app.include_router(messages.router)
app.include_router(upload.router)

# Serve static frontend files if directory exists
static_dir = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(os.path.join(static_dir, "assets")):
    app.mount("/assets", StaticFiles(directory=os.path.join(static_dir, "assets")), name="assets")

@app.get("/")
async def root():
    index_path = os.path.join(static_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"status": "healthy", "service": "Portfolio API"}

# SPA catch-all routing (React Router)
@app.get("/{path:path}")
async def serve_spa(path: str):
    # Skip API routes
    if path.startswith("api"):
        return {"error": "Not Found"}
        
    local_path = os.path.join(static_dir, path)
    if os.path.isfile(local_path):
        return FileResponse(local_path)
        
    index_path = os.path.join(static_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
        
    return {"error": "Not Found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=True)

