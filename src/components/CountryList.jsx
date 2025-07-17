import { useState } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import useMediaQuery from "@mui/material/useMediaQuery";

import useCovid19Countries from "../hooks/useCovid19Countries";

const CountryList = () => {
  const { countries, loading, error } = useCovid19Countries();

  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");

  // Fungsi untuk mengurutkan berdasarkan pilihan filter
  const sortCountries = (option, data) => {
    let sortedCountries = [...data];

    switch (option) {
      case "cases-highest":
        sortedCountries.sort((a, b) => b.cases - a.cases);
        break;
      case "cases-lowest":
        sortedCountries.sort((a, b) => a.cases - b.cases);
        break;
      case "deaths-highest":
        sortedCountries.sort((a, b) => b.deaths - a.deaths);
        break;
      case "deaths-lowest":
        sortedCountries.sort((a, b) => a.deaths - b.deaths);
        break;
      case "recovered-highest":
        sortedCountries.sort((a, b) => b.recovered - a.recovered);
        break;
      case "recovered-lowest":
        sortedCountries.sort((a, b) => a.recovered - b.recovered);
        break;
      case "name-asc":
        sortedCountries.sort((a, b) => a.country.localeCompare(b.country));
        break;
      case "name-desc":
        sortedCountries.sort((a, b) => b.country.localeCompare(a.country));
        break;
      default:
        break;
    }

    return sortedCountries;
  };

  // Fungsi untuk memfilter data berdasarkan search query
  const filterCountries = () => {
    return countries.filter((country) => {
      const lowerCaseQuery = searchQuery.toLowerCase();

      return (
        country.country.toLowerCase().includes(lowerCaseQuery) ||
        country.cases.toString().includes(searchQuery) ||
        country.deaths.toString().includes(searchQuery) ||
        country.recovered.toString().includes(searchQuery)
      );
    });
  };

  // Mendapatkan data yang telah difilter dan diurutkan
  const displayedCountries = sortCountries(sortOption, filterCountries());

  return (
    <Box maxWidth="lg" mx="auto" my={isMobile ? 0 : 2} p={3} component={Paper} elevation={3}>
      <Typography variant="h5" align="center" fontWeight="bold" mb={3}>
        COVID-19 Data by Country
      </Typography>

      {/* Search Input */}
      <Box mb={1}>
        <TextField
          label="Search by country name or number..."
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {/* Dropdown Filter */}
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            value={sortOption}
            label="Sort By"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <MenuItem value="">-- Select Sorting Option --</MenuItem>
            <MenuItem value="cases-highest">Cases: Highest to Lowest</MenuItem>
            <MenuItem value="cases-lowest">Cases: Lowest to Highest</MenuItem>
            <MenuItem value="deaths-highest">Deaths: Highest to Lowest</MenuItem>
            <MenuItem value="deaths-lowest">Deaths: Lowest to Highest</MenuItem>
            <MenuItem value="recovered-highest">Recovered: Highest to Lowest</MenuItem>
            <MenuItem value="recovered-lowest">Recovered: Lowest to Highest</MenuItem>
            <MenuItem value="name-asc">Country: A-Z</MenuItem>
            <MenuItem value="name-desc">Country: Z-A</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Loading & Error State */}
      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error fetching country data: {error.message}
        </Alert>
      )}
      
      {!loading && !error && (
        <>
          {/* Tabel Data Negara */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3e3e3" }}>
                  <TableCell>No</TableCell>
                  <TableCell>Flag</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Cases</TableCell>
                  <TableCell>Deaths</TableCell>
                  <TableCell>Recovered</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedCountries.map((country, index) => (
                  <TableRow key={country.country} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={country.countryInfo.flag}
                        alt={country.country}
                        style={{ width: 32, height: 20, display: "block", margin: "0 auto" }}
                      />
                    </TableCell>
                    <TableCell>{country.country}</TableCell>
                    <TableCell>{country.cases.toLocaleString()}</TableCell>
                    <TableCell>{country.deaths.toLocaleString()}</TableCell>
                    <TableCell>{country.recovered.toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/details/${country.country}`}
                        variant="text"
                        color="primary"
                        size="small"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Jika tidak ada hasil pencarian */}
          {displayedCountries.length === 0 && (
            <Typography align="center" color="text.secondary" mt={3}>
              No matching results found.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default CountryList;
