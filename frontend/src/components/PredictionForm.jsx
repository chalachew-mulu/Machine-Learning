import { useState } from "react";
import { getPrediction } from "../api/predictionApi";
import ResultCard from "./ResultCard";

export default function PredictionForm() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = input.split(",").map(Number);
      const response = await getPrediction(values);
      setResult(response.prediction);
    } catch (error) {
      alert("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        placeholder="Example: 5.1,3.5,1.4,0.2"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {loading ? "Predicting..." : "Predict"}
      </button>

      {result && <ResultCard result={result} />}
    </div>
  );
}