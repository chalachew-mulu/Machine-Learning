import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import Analytics from "./pages/Analytics";
import About from "./pages/About";
import History from "./pages/History";
import ModelInfo from "./pages/ModelInfo";
import Comparison from "./pages/Comparison";
import Footer from "./components/Footer";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('predictionHistory');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [mode, setMode] = useState('light');
  const [modelMetrics, setModelMetrics] = useState({
    accuracy: 0.97,
    precision: 0.96,
    recall: 0.97,
    f1Score: 0.96,
    totalPredictions: 0
  });

  useEffect(() => {
    localStorage.setItem('predictionHistory', JSON.stringify(history));
    setModelMetrics(prev => ({
      ...prev,
      totalPredictions: history.length
    }));
  }, [history]);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#6366f1',
      },
      secondary: {
        main: '#ec4899',
      },
      background: {
        default: mode === 'light' ? '#f8fafc' : '#0f172a',
        paper: mode === 'light' ? '#ffffff' : '#1e293b',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
              <Routes>
                <Route path="/" element={<Dashboard history={history} modelMetrics={modelMetrics} />} />
                <Route path="/predict" element={<Prediction setHistory={setHistory} />} />
                <Route path="/analytics" element={<Analytics history={history} />} />
                <Route path="/history" element={<History history={history} setHistory={setHistory} />} />
                <Route path="/model-info" element={<ModelInfo modelMetrics={modelMetrics} />} />
                <Route path="/comparison" element={<Comparison history={history} />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Container>
            <Footer />
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;