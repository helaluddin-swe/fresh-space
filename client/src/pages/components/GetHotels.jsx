import React, { useEffect, useState,  useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Standard axios
import HotelForm from "./HotelInput";
import { useAppContext } from "../../context/AppContext";


const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingHotelId, setEditingHotelId] = useState(null);
  
  const { backendUrl } = useAppContext()
  const navigate = useNavigate();

  // Logic to fetch data using standard axios + backendUrl
  const fetchHotels = useCallback(async () => {
    if (!backendUrl) return; // Guard clause if context isn't ready
    
    setLoading(true);
    try {
      // Direct URL construction
      const { data } = await axios.get(`${backendUrl}/api/hotels`);
      
      // Handle different possible response structures
      const hotelData = Array.isArray(data) ? data : (data.hotels || []);
      setHotels(hotelData);
    } catch (err) {
      console.error("Fetch Error:", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;

  return (
    <div className="min-h-screen py-6 px-4 max-w-7xl mx-auto">
      <header className="text-center mb-10">
        <h3 className="text-3xl font-bold md:text-5xl text-yellow-500 mb-2">Our Top-Rated Hotels</h3>
        <p className="text-gray-400">Quality stays at your fingertips.</p>
      </header>

      <div className="max-w-7xl mx-auto">
        {editingHotelId ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Hotel</h2>
            <HotelForm
              editing
              hotelId={editingHotelId}
              onSuccess={() => {
                setEditingHotelId(null);
                fetchHotels();
              }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {hotels.slice(0, 6).map((hotel) => (
              <div key={hotel._id} className="shadow-md shadow-gray-400 rounded-lg overflow-hidden flex flex-col">
                {hotel.hotelImage && (
                  <img
                    src={`${backendUrl}/uploads/${hotel.hotelImage}`}
                    alt={hotel.hotelName}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 grow">
                  <h3 className="text-xl font-semibold mb-1">{hotel.hotelName}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{hotel.hotelDes}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-4">
                    {hotel.hotelLocation} • <span className="text-blue-500">${hotel.hotelPrice}/night</span>
                  </p>
                  
                  <div className="flex justify-between gap-2 mt-auto">
                    <button 
                      onClick={() => navigate(`/hotel-details/${hotel._id}`)}
                      className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition text-sm font-medium"
                    >
                      Details
                    </button>
                    <button 
                      onClick={() => navigate("/booking-hotels")}
                      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition text-sm font-medium"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelList;