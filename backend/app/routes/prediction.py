from fastapi import APIRouter
from app.schemas.prediction_schema import PredictionInput
from app.model.predict import make_prediction

router = APIRouter()

@router.post("/predict")
def predict(input_data: PredictionInput):
    result = make_prediction(input_data.data)
    return {"prediction": result}