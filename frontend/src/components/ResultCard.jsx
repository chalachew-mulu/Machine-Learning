import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
} from "@mui/material";

function ResultCard({ result }) {
  const labels = ["Setosa", "Versicolor", "Virginica"];

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5">
          Prediction: {result.prediction}
        </Typography>

        {result.probabilities.map((prob, index) => (
          <Box key={index} sx={{ mt: 2 }}>
            <Typography>
              {labels[index]} — {(prob * 100).toFixed(2)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={prob * 100}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default ResultCard;