import { Typography, Paper, Box } from "@mui/material";
import PredictionForm from "../components/PredictionForm";

function Home() {
  return (
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Disease Prediction
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={3}>
        Enter your details below to get prediction results.
      </Typography>

      <PredictionForm />
    </Paper>
  );
}

export default Home;