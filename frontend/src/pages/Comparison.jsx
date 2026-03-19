import { useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  Chip,
  Box,
  Divider
} from "@mui/material";
import { CompareArrows, Add } from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function Comparison({ history }) {
  const [selected1, setSelected1] = useState('');
  const [selected2, setSelected2] = useState('');

  const prediction1 = history[selected1];
  const prediction2 = history[selected2];

  const comparisonData = prediction1 && prediction2 ? [
    {
      name: 'Setosa',
      'Prediction 1': prediction1.probabilities[0] * 100,
      'Prediction 2': prediction2.probabilities[0] * 100
    },
    {
      name: 'Versicolor',
      'Prediction 1': prediction1.probabilities[1] * 100,
      'Prediction 2': prediction2.probabilities[1] * 100
    },
    {
      name: 'Virginica',
      'Prediction 1': prediction1.probabilities[2] * 100,
      'Prediction 2': prediction2.probabilities[2] * 100
    }
  ] : [];

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={4}>
        <CompareArrows sx={{ fontSize: 40, color: 'primary.main' }} />
        <Typography variant="h4" fontWeight="bold">
          Compare Predictions
        </Typography>
      </Stack>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <FormControl fullWidth>
            <InputLabel>Select First Prediction</InputLabel>
            <Select
              value={selected1}
              onChange={(e) => setSelected1(e.target.value)}
              label="Select First Prediction"
            >
              {history.map((item, index) => (
                <MenuItem key={index} value={index}>
                  {new Date(item.timestamp).toLocaleString()} - {item.prediction}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Chip 
            icon={<CompareArrows />}
            label="VS"
            color="primary"
            sx={{ fontSize: '1.2rem', p: 2 }}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <FormControl fullWidth>
            <InputLabel>Select Second Prediction</InputLabel>
            <Select
              value={selected2}
              onChange={(e) => setSelected2(e.target.value)}
              label="Select Second Prediction"
            >
              {history.map((item, index) => (
                <MenuItem key={index} value={index}>
                  {new Date(item.timestamp).toLocaleString()} - {item.prediction}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {selected1 !== '' && selected2 !== '' && (
        <>
          <Grid container spacing={3} mt={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3, bgcolor: 'primary.light', color: 'white' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Prediction 1
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {prediction1.prediction}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {new Date(prediction1.timestamp).toLocaleString()}
                  </Typography>
                  <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />
                  <Typography variant="body2">
                    Confidence: {(Math.max(...prediction1.probabilities) * 100).toFixed(1)}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3, bgcolor: 'secondary.light', color: 'white' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Prediction 2
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {prediction2.prediction}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {new Date(prediction2.timestamp).toLocaleString()}
                  </Typography>
                  <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />
                  <Typography variant="body2">
                    Confidence: {(Math.max(...prediction2.probabilities) * 100).toFixed(1)}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ height: 400, mt: 4 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Prediction 1" fill="#6366f1" />
                <Bar dataKey="Prediction 2" fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </>
      )}
    </Paper>
  );
}

export default Comparison;