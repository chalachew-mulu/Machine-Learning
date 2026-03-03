import { Paper, Typography } from "@mui/material";

function About() {
  return (
    <Paper elevation={4} sx={{ p: 4 }}>
      <Typography variant="h4">About The Model</Typography>

      <Typography mt={2}>
        This Iris classification model was trained using scikit-learn.
        It predicts flower species based on:
      </Typography>

      <ul>
        <li>Sepal Length</li>
        <li>Sepal Width</li>
        <li>Petal Length</li>
        <li>Petal Width</li>
      </ul>
    </Paper>
  );
}

export default About;