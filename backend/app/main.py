from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.prediction import router

app = FastAPI(title="ML API")

# Enable CORS (important for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change later for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def home():
    return {"message": "ML API is running"}