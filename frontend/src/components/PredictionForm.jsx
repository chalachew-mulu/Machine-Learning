import { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  CircularProgress,
  Grid,
} from "@mui/material";
import { predictIris } from "../api/predictionApi";
import ResultCard from "./ResultCard";

function PredictionForm({ setHistory }) {
  const [form, setForm] = useState({
    sepal_length: "",
    sepal_width: "",
    petal_length: "",
    petal_width: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = await predictIris({
      ...form,
      sepal_length: parseFloat(form.sepal_length),
      sepal_width: parseFloat(form.sepal_width),
      petal_length: parseFloat(form.petal_length),
      petal_width: parseFloat(form.petal_width),
    });

    setResult(data);
    setHistory((prev) => [...prev, data]);
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(form).map((key) => (
            <Grid item xs={12} md={6} key={key}>
              <TextField
                fullWidth
                label={key.replace("_", " ")}
                name={key}
                value={form[key]}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Predict"}
        </Button>
      </form>

      {result && <ResultCard result={result} />}
    </>
  );
}

export default PredictionForm;