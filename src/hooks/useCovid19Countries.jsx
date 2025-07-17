import { useState, useEffect } from "react";

const useCovid19Countries = (country) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Untuk fetch list negara
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://disease.sh/v3/covid-19/countries");
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Untuk fetch data negara tertentu
  const [countryData, setCountryData] = useState(null);
  const [countryLoading, setCountryLoading] = useState(true);
  const [countryError, setCountryError] = useState(null);

  useEffect(() => {
    if (!country) return;
    setCountryLoading(true);
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://disease.sh/v3/covid-19/countries/${country}`);
        if (!response.ok) throw new Error("Failed to fetch country data");
        const data = await response.json();
        setCountryData(data);
      } catch (err) {
        setCountryError(err);
      } finally {
        setCountryLoading(false);
      }
    };
    fetchCountry();
  }, [country]);

  return {
    countries,
    loading,
    error,
    countryData,
    countryLoading,
    countryError,
  };
};

export default useCovid19Countries;