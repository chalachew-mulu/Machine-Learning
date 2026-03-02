import joblib
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")

model = joblib.load(MODEL_PATH)

def make_prediction(data):
    prediction = model.predict([data])
    return prediction.tolist()