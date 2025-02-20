import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://disease.sh/v3/covid-19/countries");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchData();
  }, []);

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
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="flex items-center justify-center text-2xl font-bold mb-4">COVID-19 Data by Country</h2>

      {/* Search Input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Search:</label>
        <input
          type="text"
          placeholder="Search by country name or number..."
          className="border border-gray-300 rounded p-2 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Dropdown Filter */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Sort By:</label>
        <select
          className="border border-gray-300 rounded p-2 w-full"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">-- Select Sorting Option --</option>
          <option value="cases-highest">Cases: Highest to Lowest</option>
          <option value="cases-lowest">Cases: Lowest to Highest</option>
          <option value="deaths-highest">Deaths: Highest to Lowest</option>
          <option value="deaths-lowest">Deaths: Lowest to Highest</option>
          <option value="recovered-highest">Recovered: Highest to Lowest</option>
          <option value="recovered-lowest">Recovered: Lowest to Highest</option>
          <option value="name-asc">Country: A-Z</option>
          <option value="name-desc">Country: Z-A</option>
        </select>
      </div>

      {/* Tabel Data Negara */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Flag</th>
              <th className="border p-2">Country</th>
              <th className="border p-2">Cases</th>
              <th className="border p-2">Deaths</th>
              <th className="border p-2">Recovered</th>
              <th className="border p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {displayedCountries.map((country) => (
              <tr key={country.country} className="text-center hover:bg-gray-100">
                <td className="border p-2">
                  <img src={country.countryInfo.flag} alt={country.country} className="w-8 h-5 mx-auto" />
                </td>
                <td className="border p-2">{country.country}</td>
                <td className="border p-2">{country.cases.toLocaleString()}</td>
                <td className="border p-2">{country.deaths.toLocaleString()}</td>
                <td className="border p-2">{country.recovered.toLocaleString()}</td>
                <td className="border p-2">
                  <Link
                    to={`/details/${country.country}`}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Jika tidak ada hasil pencarian */}
      {displayedCountries.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No matching results found.</p>
      )}
    </div>
  );
};

export default CountryList;
