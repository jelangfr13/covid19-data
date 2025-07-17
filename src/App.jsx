import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Notes from "./pages/Notes";
import CountryDetails from "./components/CountryDetails";
import Navbar from "./components/Navbar";
import { AppProvider } from "./context/AppContext";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function App() {
  return (
    <AppProvider>
      <Router>
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.100" }}>
          <Navbar />
          <Container sx={{ pt: 10, px: 2 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Notes" element={<Notes />} />
              <Route path="/details/:country" element={<CountryDetails />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </AppProvider>
  );
}

export default App;
