import { useState, useEffect } from "react";

import CountryList from "../components/CountryList";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp"; // Tambahkan import icon

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Fungsi untuk mendeteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fungsi untuk kembali ke atas
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box position="relative">
      <CountryList />

      {/* Button Scroll to Top */}
      {showScrollButton && (
        <Box
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 1000,
          }}
        >
          <Button
            onClick={scrollToTop}
            variant="contained"
            color="primary"
            sx={{
              minWidth: 0,
              width: 48,
              height: 48,
              borderRadius: "50%",
              boxShadow: 3,
              p: 0,
              bgcolor: "#4285f4",
              "&:hover": { bgcolor: "#1a73e8" },
            }}
          >
            <KeyboardDoubleArrowUpIcon sx={{ color: "#ffecec", fontSize: 32 }} />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Home;
