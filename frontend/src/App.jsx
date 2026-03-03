import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import Analytics from "./pages/Analytics";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";
import { useState } from "react";
function App() {
  const [history, setHistory] = useState([]);

  return (
    <BrowserRouter>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/predict" element={<Prediction setHistory={setHistory} />} />
          <Route path="/analytics" element={<Analytics history={history} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;