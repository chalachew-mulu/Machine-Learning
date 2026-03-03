import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography } from "@mui/material";

function Analytics({ history }) {
  const counts = {
    Setosa: 0,
    Versicolor: 0,
    Virginica: 0,
  };

  history.forEach((item) => {
    counts[item.prediction]++;
  });

  const data = Object.keys(counts).map((key) => ({
    name: key,
    value: counts[key],
  }));

  return (
    <Paper sx={{ p: 4, height: 400 }}>
      <Typography variant="h5">Live Prediction Distribution</Typography>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default Analytics;