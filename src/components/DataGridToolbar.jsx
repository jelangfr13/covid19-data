import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import Popover from "@mui/material/Popover";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";

import { sortOptions } from "./countryListConstants";

const DataGridToolbar = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
}) => {
  const [anchorSort, setAnchorSort] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSortClick = (event) => setAnchorSort(event.currentTarget);
  const handleSortClose = () => setAnchorSort(null);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} mb={2}>
      {/* Title */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography
          variant={isMobile ? "body2" : "h6"}
          align="center"
          fontWeight="bold"
          mb={3}
          sx={
            isMobile && showSearch
              ? { display: "none" }
              : {}
          }
        >
          COVID-19 Data by Country
        </Typography>
      </Stack>
      
      <Box display="flex" alignItems="center">
        {/* Search Icon & Inline Input */}
        <IconButton onClick={() => setShowSearch(true)}>
          <SearchIcon />
        </IconButton>
        <Input
          placeholder="Search by country or number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
                sx={{ visibility: showSearch ? "visible" : "hidden" }}
              >
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          }
          sx={showSearch ? {
            width: 200,
            transition: "width 0.25s ease-in-out"
          } : {
            width: 0,
          }}
          disableUnderline
        />

        {/* Sort Icon & Popover */}
        <IconButton onClick={handleSortClick}>
          <SortIcon />
        </IconButton>
        <Popover
          open={Boolean(anchorSort)}
          anchorEl={anchorSort}
          onClose={handleSortClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <List>
            {sortOptions.map((option) => (
              <ListItemButton
                key={option.value}
                selected={sortOption === option.value}
                onClick={() => {
                  setSortOption(option.value);
                  handleSortClose();
                }}
              >
                <ListItemText primary={option.label} />
              </ListItemButton>
            ))}
          </List>
        </Popover>
      </Box>
    </Box>
  );
};

export default DataGridToolbar;