from pydantic import BaseModel
from typing import List, Optional

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

class SkillData(BaseModel):
    category: str
    skills: List[str]

class ExperienceData(BaseModel):
    type: str  # 'education' or 'experience'
    title: str
    organization: str
    period: str
    description: str

class HighlightData(BaseModel):
    icon_name: str
    title: str
    description: str

class ContactInfoData(BaseModel):
    icon_name: str
    title: str
    value: str
    href: str

class MessageData(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ChatPayload(BaseModel):
    message: str
    history: Optional[List[dict]] = []

class GenerateProjectPayload(BaseModel):
    title: str
    description: Optional[str] = ""
