import './App.css';
import AddDisease from "./pages/AddDisease";
import Dashboard from "./pages/Dashboard";
import TestDNA from "./pages/TestDNA";
import Search from "./pages/Search";
import AboutUs from './pages/AboutUs';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/Dashboard' element={<Dashboard />} />
        <Route path='/TestDNA' element={<TestDNA />} />
        <Route path='/Search' element={<Search />} />
        <Route path='/AddDisease' element={<AddDisease />} />
        <Route path='/AboutUs' element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
