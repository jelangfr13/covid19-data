import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

// Sorting options
export const sortOptions = [
  { value: "", label: "-- Select Sorting Option --" },
  { value: "cases-highest", label: "Cases: Highest to Lowest" },
  { value: "cases-lowest", label: "Cases: Lowest to Highest" },
  { value: "deaths-highest", label: "Deaths: Highest to Lowest" },
  { value: "deaths-lowest", label: "Deaths: Lowest to Highest" },
  { value: "recovered-highest", label: "Recovered: Highest to Lowest" },
  { value: "recovered-lowest", label: "Recovered: Lowest to Highest" },
  { value: "name-asc", label: "Country: A-Z" },
  { value: "name-desc", label: "Country: Z-A" },
];

// Fungsi untuk mengurutkan berdasarkan pilihan filter
export const sortCountries = (option, data) => {
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
export const filterCountries = (countries, searchQuery) => {
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

export const countryListColumns = [
  {
    field: "id",
    headerName: "No",
    width: 70,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        {params.row.id}
      </div>
    )
  },
  {
    field: "flag",
    headerName: "Flag",
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <img
          src={params.row.countryInfo.flag}
          alt={`${params.row.country}'s flag`}
          style={{ width: 48, height: 30, objectFit: "contain" }}
        />
      </div>
    ),
  },
  {
    field: "country",
    headerName: "Country",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "cases",
    headerName: "Total Cases",
    type: "number",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "deaths",
    headerName: "Total Deaths",
    type: "number",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "recovered",
    headerName: "Total Recovered",
    type: "number",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "details",
    headerName: "Details",
    sortable: false,
    width: 120,
    renderCell: (params) => (
      <Button
        component={Link}
        to={`/details/${params.row.country}`}
        variant="text"
        color="primary"
        size="small"
      >
        View Details
      </Button>
    ),
  },
];