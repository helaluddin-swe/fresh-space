import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import HotelForm from "./HotelInput";
import { apiJson } from "../../utils/axiosInstance";




const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [editingHotelId, setEditingHotelId] = useState(null);
  const navigate = useNavigate();

  const fetchHotels = async () => {
    try {
      const res = await apiJson.get("/"); // or apiJson.get("/") if GET
      // Check if response has hotels array
      if (Array.isArray(res.data)) {
        setHotels(res.data);
      } else if (res.data.hotels) {
        setHotels(res.data.hotels);
      } else {
        setHotels([]); // fallback
      }
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // const handleDelete = async (id) => {
  //   await apiJson.delete(`/${id}`);
  //   fetchHotels();
  // };

  return (
    <div className="min-h-screen py-6 px-4">
  <div className="text-center mb-6">
    <h3 className="text-3xl font-bold md:text-5xl text-yellow-500 mb-2">
      Our Top-Rated Hotels
    </h3>
    <span className="text-md max-w-2xl text-center justify-center text-gray-400 mb-4">
      Handpicked for quality, comfort, and exceptional service. Explore our curated
      selection of luxury hotels, boutique stays, and family-friendly resorts — all
      designed to make your trip unforgettable.
    </span>
  </div>

  {/* Editing hotels form */}
  <div className="max-w-7xl mx-auto">
    {editingHotelId ? (
      <div className="shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          Edit Hotel
        </h2>
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
      // Else block: show hotel list
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hotels.slice(0,6).map((hotel) => (
          <div
            key={hotel._id}
            className="shadow-md shadow-gray-500 rounded-lg overflow-hidden"
          >
            {hotel.hotelImage && (
              <img
                src={`http://localhost:8000/uploads/${hotel.hotelImage}`}
                alt={hotel.hotelName}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{hotel.hotelName}</h3>
              <p className="text-gray-600 mb-2">{hotel.hotelDes}</p>
              <p className="text-gray-500 mb-2">
                <span className="font-semibold">Location:</span> {hotel.hotelLocation}
              </p>
              <p className="text-gray-500 mb-4">
                <span className="font-semibold">Price:</span> ${hotel.hotelPrice} / night
              </p>
              <div className="flex justify-between flex-wrap gap-2">
                
                <button
                  onClick={() => navigate("/booking-hotels")}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Book Now
                </button>
                <button
                  onClick={() => navigate(`/hotel-details/${hotel._id}`)}
                  className="px-3 py-1 bg-pink-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Details
                </button>
                <button
                  onClick={() => navigate(`/favourite/${hotel._id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Favourite
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  )
};

export default HotelList;
