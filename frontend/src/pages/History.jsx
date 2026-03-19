import { 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Button,
  Stack,
  Alert
} from "@mui/material";
import { 
  Delete as DeleteIcon, 
  Download as DownloadIcon,
  Refresh as RefreshIcon 
} from "@mui/icons-material";
import { useState } from "react";

function History({ history, setHistory }) {
  const [filter, setFilter] = useState('all');

  const getConfidenceColor = (probabilities) => {
    const maxProb = Math.max(...probabilities);
    if (maxProb > 0.8) return 'success';
    if (maxProb > 0.6) return 'warning';
    return 'error';
  };

  const getConfidenceText = (probabilities) => {
    const maxProb = Math.max(...probabilities);
    return `${(maxProb * 100).toFixed(1)}%`;
  };

  const handleDelete = (index) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      setHistory([]);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `iris_predictions_${new Date().toISOString()}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (history.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No predictions yet. Go to the Predict page to get started!
      </Alert>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Prediction History
        </Typography>
        
        <Stack direction="row" spacing={2}>
          <Tooltip title="Export as JSON">
            <IconButton onClick={handleExport} color="primary">
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear all">
            <IconButton onClick={handleClearAll} color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Prediction</TableCell>
              <TableCell>Confidence</TableCell>
              <TableCell>Features (cm)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(item.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={item.prediction}
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={getConfidenceText(item.probabilities)}
                    color={getConfidenceColor(item.probabilities)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {item.features && Object.values(item.features).join(', ')}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete">
                    <IconButton size="small" onClick={() => handleDelete(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default History;