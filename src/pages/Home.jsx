import { useEffect, useState } from "react";
import CountryList from "../components/CountryList";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
    <div className="relative">
      {loading ? <p>Loading...</p> : <CountryList countries={countries} />}

      {/* Tombol Scroll to Top */}
      {showScrollButton && (
        <button
          className="fixed bottom-8 right-8 bg-blue-500 text-white px-3 py-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          onClick={scrollToTop}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffecec" d="M13 12v8h-2v-8H4l8-8l8 8z"/></svg>
        </button>
      )}
    </div>
  );
};

export default Home;
