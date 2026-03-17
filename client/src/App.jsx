import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HotelForm from "./pages/components/HotelInput";
import HotelDetails from "./pages/components/HotelDetails";
import FavouriteHotel from "./pages/components/FavouriteHotels";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Admin/Dashboard";
import Login from "./pages/Auth/Login";
import ThemeProvider from "./context/ThemeContext";
import AllHotelList from "./pages/components/AllHotelList";
import BookingHotel from "./pages/components/BookingHotel";


function App() {
  return (
    <ThemeProvider> 
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/addhotel" element={<HotelForm />} />
        <Route path="/booking-hotels" element={<BookingHotel />} />
        <Route path="/hotel-list" element={<AllHotelList />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/hotel-details/:id" element={<HotelDetails />} />
        <Route path="/favourite/:id" element={<FavouriteHotel />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
