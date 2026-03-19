import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Grid,
  Chip,
  Stack,
  Divider,
  Avatar,
  Tooltip,
  Fade
} from "@mui/material";
import {
  CheckCircle,
  Warning,
  TrendingUp,
  Science
} from "@mui/icons-material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";

function ResultCard({ result, features }) {
  const labels = ["Setosa", "Versicolor", "Virginica"];
  const colors = ['#6366f1', '#ec4899', '#10b981'];
  
  const maxProb = Math.max(...result.probabilities);
  const maxIndex = result.probabilities.indexOf(maxProb);
  const confidence = (maxProb * 100).toFixed(1);

  const pieData = result.probabilities.map((prob, index) => ({
    name: labels[index],
    value: prob * 100
  }));

  return (
    <Fade in={true} timeout={1000}>
      <Card sx={{ 
        borderRadius: 4,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
              <Science />
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              Prediction Result
            </Typography>
            <Chip
              label={`${confidence}% Confidence`}
              color={maxProb > 0.8 ? "success" : maxProb > 0.6 ? "warning" : "error"}
              icon={maxProb > 0.8 ? <CheckCircle /> : <Warning />}
              sx={{ ml: 'auto' }}
            />
          </Stack>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {result.prediction}
              </Typography>
              
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }} gutterBottom>
                Iris {labels[maxIndex]}
              </Typography>

              <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />

              <Typography variant="body2" sx={{ opacity: 0.8 }} gutterBottom>
                Input Features:
              </Typography>
              {features && Object.entries(features).map(([key, value]) => (
                <Stack direction="row" justifyContent="space-between" key={key}>
                  <Typography variant="body2">{key.replace('_', ' ')}</Typography>
                  <Typography variant="body2" fontWeight="bold">{value} cm</Typography>
                </Stack>
              ))}
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#333', color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>

              <Stack spacing={2} mt={2}>
                {result.probabilities.map((prob, index) => (
                  <Box key={index}>
                    <Stack direction="row" justifyContent="space-between" mb={0.5}>
                      <Typography variant="body2">{labels[index]}</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {(prob * 100).toFixed(2)}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={prob * 100}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'rgba(255,255,255,0.1)',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: colors[index],
                          borderRadius: 4,
                        }
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>

          <Box mt={3} p={2} sx={{ bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TrendingUp />
              <Typography variant="body2">
                This prediction was made using a Random Forest classifier trained on the Iris dataset.
                Model accuracy: 97%
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
}

export default ResultCard;