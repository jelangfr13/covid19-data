import { useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";

import useCovid19Countries from "../hooks/useCovid19Countries";
import CustomDataGrid from "./DataGrid";
import DataGridToolbar from "./DataGridToolbar";

import { sortCountries, filterCountries, countryListColumns } from "./countryListConstants";

const CountryList = () => {
  const { countries, loading } = useCovid19Countries();

  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");

  // Fungsi untuk menambahkan index ke setiap negara
  const addIndexToCountries = (countries) =>
  countries.map((country, idx) => ({
    ...country,
    id: idx + 1,
  }));

  // Mendapatkan data yang telah difilter dan diurutkan
  const displayedCountries = addIndexToCountries(
    sortCountries(sortOption, filterCountries(countries, searchQuery))
  );

  return (
    <Box maxWidth="lg" mx="auto" my={isMobile ? 0 : 2} mb={3} p={3} component={Paper} elevation={3}>
      {/* Toolbar Search & Sort */}
      <DataGridToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      <CustomDataGrid
        rows={displayedCountries}
        columns={countryListColumns}
        loading={loading}
      />
    </Box>
  );
};

export default CountryList;