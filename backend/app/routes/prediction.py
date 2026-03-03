from fastapi import APIRouter
from app.schemas.prediction_schema import IrisInput, PredictionResponse
from app.model.predict import predict_iris

router = APIRouter(prefix="/api", tags=["Prediction"])

@router.post("/predict", response_model=PredictionResponse)
def predict(data: IrisInput):
    return predict_iris(data)