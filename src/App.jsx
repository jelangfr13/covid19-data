import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import CountryDetails from "./components/CountryDetails";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="fixed w-screen z-10 bg-blue-500 p-4 text-white flex justify-between lg:px-10 px-5">
            <a href="/">
              <h1 className="text-xl font-bold hover:text-black hover:duration-300">COVID-19 Tracker</h1>
            </a>
            <div>
              <a href="/" className="mr-4 hover:text-black hover:duration-300">Home</a>
              <a href="/Notes" className="hover:text-black hover:duration-300">Notes</a>
            </div>
          </nav>
          
          <div className="pt-20 container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Notes" element={<Notes />} />
              <Route path="/details/:country" element={<CountryDetails />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
