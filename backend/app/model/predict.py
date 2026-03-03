import joblib
import numpy as np
import os

# Absolute safe path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "model.pkl")

model = joblib.load(model_path)

class_names = ["Setosa", "Versicolor", "Virginica"]

def predict_iris(data):
    features = np.array([[
        data.sepal_length,
        data.sepal_width,
        data.petal_length,
        data.petal_width
    ]])

    prediction = model.predict(features)[0]
    probabilities = model.predict_proba(features)[0]

    return {
        "prediction": class_names[int(prediction)],
        "probabilities": probabilities.tolist()
    }