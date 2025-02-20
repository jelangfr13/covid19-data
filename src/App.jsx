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
          <nav className="bg-blue-500 p-4 text-white flex justify-between">
            <a href="/">
              <h1 className="ml-10 text-xl font-bold hover:text-black hover:duration-300">COVID-19 Tracker</h1>
            </a>
            <div className="mr-10">
              <a href="/" className="mr-4 hover:text-black hover:duration-300">Home</a>
              <a href="/notes" className="hover:text-black hover:duration-300">Notes</a>
            </div>
          </nav>
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/details/:country" element={<CountryDetails />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
