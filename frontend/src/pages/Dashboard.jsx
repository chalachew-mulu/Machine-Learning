import { Grid, Paper, Typography } from "@mui/material";

function Dashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper elevation={4} sx={{ p: 3 }}>
          <Typography variant="h6">Total Predictions</Typography>
          <Typography variant="h3">124</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper elevation={4} sx={{ p: 3 }}>
          <Typography variant="h6">Model Accuracy</Typography>
          <Typography variant="h3">97%</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper elevation={4} sx={{ p: 3 }}>
          <Typography variant="h6">Classes</Typography>
          <Typography variant="h5">
            Setosa / Versicolor / Virginica
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;