import { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Slider,
  InputAdornment,
  Alert,
  Zoom,
  Fade,
  Grow,
  Box,
  Chip
} from "@mui/material";
import { predictIris } from "../api/predictionApi";
import ResultCard from "./ResultCard";
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ScienceIcon from '@mui/icons-material/Science';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function PredictionForm({ setHistory }) {
  const [form, setForm] = useState({
    sepal_length: 5.1,
    sepal_width: 3.5,
    petal_length: 1.4,
    petal_width: 0.2,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) || 0 });
    setError(null);
  };

  const handleSliderChange = (name) => (e, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await predictIris(form);
      setResult(data);
      setHistory((prev) => [...prev, { ...data, timestamp: new Date().toISOString(), features: form }]);
    } catch (err) {
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (acceptedFiles) => {
    // Handle file upload for batch prediction
    console.log(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const sampleData = [
    { name: "Setosa", values: [5.1, 3.5, 1.4, 0.2] },
    { name: "Versicolor", values: [6.0, 2.9, 4.5, 1.5] },
    { name: "Virginica", values: [6.7, 3.1, 5.6, 2.4] },
  ];

  const loadSample = (sample) => {
    setForm({
      sepal_length: sample.values[0],
      sepal_width: sample.values[1],
      petal_length: sample.values[2],
      petal_width: sample.values[3],
    });
  };

  return (
    <Grow in={true} timeout={800}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={3}>
          <ScienceIcon color="primary" />
          <Typography variant="h5" fontWeight="bold">
            Iris Flower Classification
          </Typography>
          <Chip 
            label="ML Model v2.0" 
            size="small" 
            color="secondary" 
            icon={<AutoAwesomeIcon />}
            sx={{ ml: 'auto' }}
          />
        </Stack>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                {Object.keys(form).map((key) => (
                  <Fade in={true} timeout={500} key={key}>
                    <div>
                      <Typography gutterBottom color="text.secondary">
                        {key.replace("_", " ").toUpperCase()}
                      </Typography>
                      <Slider
                        value={form[key]}
                        onChange={handleSliderChange(key)}
                        min={0}
                        max={8}
                        step={0.1}
                        valueLabelDisplay="auto"
                      />
                      <TextField
                        fullWidth
                        name={key}
                        value={form[key]}
                        onChange={handleChange}
                        type="number"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                        }}
                      />
                    </div>
                  </Fade>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper 
                {...getRootProps()} 
                sx={{ 
                  p: 4, 
                  border: '2px dashed',
                  borderColor: isDragActive ? 'primary.main' : 'grey.300',
                  bgcolor: isDragActive ? 'action.hover' : 'background.paper',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <input {...getInputProps()} />
                <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  {isDragActive ? 'Drop your file here' : 'Batch Prediction'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Drag & drop a CSV file or click to browse
                </Typography>
              </Paper>

              <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1, alignSelf: 'center' }}>
                  Samples:
                </Typography>
                {sampleData.map((sample) => (
                  <Chip
                    key={sample.name}
                    label={sample.name}
                    onClick={() => loadSample(sample)}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>

          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}

          <Stack direction="row" spacing={2} mt={4}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
              sx={{ minWidth: 200 }}
            >
              {loading ? "Processing..." : "Predict Species"}
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              Advanced Options
            </Button>
          </Stack>
        </form>

        <Zoom in={showAdvanced} timeout={500}>
          <Paper sx={{ mt: 3, p: 2, bgcolor: 'action.hover' }}>
            <Typography variant="subtitle2" gutterBottom>
              Advanced Settings
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Confidence threshold: 0.85<br />
              • Ensemble method: Random Forest<br />
              • Feature importance: Enabled
            </Typography>
          </Paper>
        </Zoom>

        {result && (
          <Zoom in={true} timeout={800}>
            <Box mt={4}>
              <ResultCard result={result} features={form} />
            </Box>
          </Zoom>
        )}
      </Paper>
    </Grow>
  );
}

export default PredictionForm;