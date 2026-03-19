import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Box,
  Stack,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@mui/material";
import {
  CheckCircle,
  TrendingUp,
  Speed,
  Memory,
  Analytics,
  Science
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

function ModelInfo({ modelMetrics }) {
  const metrics = [
    { name: 'Accuracy', value: modelMetrics.accuracy, color: '#6366f1' },
    { name: 'Precision', value: modelMetrics.precision, color: '#ec4899' },
    { name: 'Recall', value: modelMetrics.recall, color: '#10b981' },
    { name: 'F1 Score', value: modelMetrics.f1Score, color: '#f59e0b' }
  ];

  const radarData = [
    { metric: 'Accuracy', value: modelMetrics.accuracy * 100 },
    { metric: 'Precision', value: modelMetrics.precision * 100 },
    { metric: 'Recall', value: modelMetrics.recall * 100 },
    { metric: 'F1 Score', value: modelMetrics.f1Score * 100 }
  ];

  const featureImportance = [
    { feature: 'Petal Length', importance: 0.45 },
    { feature: 'Petal Width', importance: 0.35 },
    { feature: 'Sepal Length', importance: 0.15 },
    { feature: 'Sepal Width', importance: 0.05 }
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Stack direction="row" alignItems="center" spacing={2} mb={4}>
            <Science sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h4" fontWeight="bold">
              Model Information
            </Typography>
            <Chip 
              label="Production Ready" 
              color="success"
              icon={<CheckCircle />}
              sx={{ ml: 'auto' }}
            />
          </Stack>

          <Grid container spacing={4}>
            {metrics.map((metric) => (
              <Grid item xs={12} sm={6} md={3} key={metric.name}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      {metric.name}
                    </Typography>
                    <Typography variant="h3" fontWeight="bold">
                      {(metric.value * 100).toFixed(1)}%
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={metric.value * 100}
                      sx={{ 
                        mt: 2,
                        height: 8,
                        borderRadius: 4,
                        bgcolor: `${metric.color}20`,
                        '& .MuiLinearProgress-bar': {
                          bgcolor: metric.color,
                          borderRadius: 4
                        }
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 4, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Model Performance Radar
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Model"
                  dataKey="value"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 4, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Feature Importance
          </Typography>
          <List>
            {featureImportance.map((item) => (
              <ListItem key={item.feature}>
                <ListItemIcon>
                  <TrendingUp />
                </ListItemIcon>
                <ListItemText 
                  primary={item.feature}
                  secondary={`${(item.importance * 100).toFixed(1)}% importance`}
                />
                <Box sx={{ width: '50%' }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={item.importance * 100}
                    sx={{ 
                      height: 8,
                      borderRadius: 4
                    }}
                  />
                </Box>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Speed color="primary" />
              <Typography variant="body2">
                Inference Time: <strong>~5ms</strong>
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Memory color="primary" />
              <Typography variant="body2">
                Model Size: <strong>2.3 MB</strong>
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Analytics color="primary" />
              <Typography variant="body2">
                Total Predictions: <strong>{modelMetrics.totalPredictions}</strong>
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ModelInfo;