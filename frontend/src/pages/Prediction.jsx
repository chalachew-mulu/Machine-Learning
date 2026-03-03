import PredictionForm from "../components/PredictionForm";
import { Paper, Typography } from "@mui/material";

function Prediction({ setHistory }) {
  return (
    <Paper elevation={4} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Iris Classification
      </Typography>

      <PredictionForm setHistory={setHistory} />
    </Paper>
  );
}

export default Prediction;