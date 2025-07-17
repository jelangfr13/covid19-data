import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";

function Navbar() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#4285f4" }}>
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, lg: 10 } }}>
        <Box>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            component={Link}
            to="/"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              textDecoration: "none",
              "&:hover": { color: "#000", transition: "color 0.3s" },
            }}
          >
            COVID-19 Tracker
          </Typography>
        </Box>
        <Box>
          <Button
            component={Link}
            to="/"
            sx={{
              color: "#fff",
              textTransform: "none",
              "&:hover": { color: "#000", background: "none", transition: "color 0.3s" },
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/Notes"
            sx={{
              color: "#fff",
              textTransform: "none",
              "&:hover": { color: "#000", background: "none", transition: "color 0.3s" },
            }}
          >
            Notes
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;