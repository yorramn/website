from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import os
import logging
import uuid
from datetime import datetime

# Import services
from services.github_service import GitHubService
from services.email_service import EmailService

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize services
github_service = GitHubService()
email_service = EmailService()

# Create the main app without a prefix
app = FastAPI(title="Yorramn Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Pydantic Models
class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    message: str = Field(..., min_length=10, max_length=1000)

class ContactResponse(BaseModel):
    success: bool
    message: str

class GitHubRepo(BaseModel):
    name: str
    description: str
    githubUrl: str
    liveUrl: Optional[str] = None
    stars: int
    forks: int
    language: str
    updated_at: str
    technologies: List[str]
    featured: bool

class GitHubReposResponse(BaseModel):
    repos: List[GitHubRepo]
    total: int

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running", "version": "1.0.0"}

@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "services": {
            "database": "connected",
            "github_api": "available",
            "email_service": "configured" if os.environ.get('GMAIL_APP_PASSWORD') else "not_configured"
        }
    }

@api_router.get("/github/repos", response_model=GitHubReposResponse)
async def get_github_repos():
    """
    Fetch GitHub repositories for yorramn user
    """
    try:
        repos_data = await github_service.get_user_repos()
        
        if not repos_data:
            # Return empty response if no repos found
            return GitHubReposResponse(repos=[], total=0)
        
        # Convert to Pydantic models
        repos = [GitHubRepo(**repo) for repo in repos_data]
        
        return GitHubReposResponse(
            repos=repos,
            total=len(repos)
        )
        
    except Exception as e:
        logging.error(f"Error fetching GitHub repos: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="Erro ao buscar repositórios do GitHub"
        )

@api_router.post("/contact", response_model=ContactResponse)
async def send_contact_email(contact_data: ContactRequest, request: Request):
    """
    Send contact form email to yorramn.dev@gmail.com
    """
    try:
        # Validate data
        validation_result = email_service.validate_contact_data(contact_data.dict())
        
        if not validation_result['valid']:
            raise HTTPException(
                status_code=400,
                detail={
                    "message": "Dados inválidos",
                    "errors": validation_result['errors']
                }
            )
        
        # Add client IP to contact data
        cleaned_data = validation_result['cleaned_data']
        cleaned_data['ip_address'] = request.client.host if request.client else 'Unknown'
        
        # Send email
        email_sent = await email_service.send_contact_email(cleaned_data)
        
        if not email_sent:
            raise HTTPException(
                status_code=500,
                detail="Erro ao enviar email. Tente novamente mais tarde."
            )
        
        # Save contact to database
        contact_record = {
            "id": str(uuid.uuid4()),
            "timestamp": datetime.utcnow(),
            "status": "sent",
            **cleaned_data
        }
        
        await db.contacts.insert_one(contact_record)
        
        return ContactResponse(
            success=True,
            message="Mensagem enviada com sucesso! Retornaremos em breve."
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error in contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Erro interno do servidor"
        )

# Legacy endpoints (keep for compatibility)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()