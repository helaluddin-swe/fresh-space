import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiJson } from "../../utils/axiosInstance";


const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await apiJson.get(`/${id}`);
        setHotel(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHotel();
  }, [id]);

  if (!hotel) return <div className="p-6">Loading...</div>;

  return (
    <div className=" w-full ">
      {/* Top Section: Image + Info */}
      <div className="flex flex-col md:flex-row  shadow-md rounded-lg overflow-hidden">
        {/* Left: Image */}
        {hotel.hotelImage && (
          <div className="md:w-1/2 px-2 border py-3 border-gray-400">
            <img
              src={`http://localhost:8000/uploads/${hotel.hotelImage}`}
              alt={hotel.hotelName}
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
        )}

        {/* Right: Hotel Info */}
        <div className="md:w-1/2  flex flex-col justify-between">
          <div className="px-8 py-8 mb-6">
            <h2 className="text-3xl font-bold mb-2">{hotel.hotelName}</h2>
            <p className="text-gray-700 mb-4">{hotel.hotelDes}</p>
            <p className="text-gray-500 mb-1">
              <span className="font-semibold">Location:</span> {hotel.hotelLocation}
            </p>
            <p className="text-gray-500 mb-1">
              <span className="font-semibold">Price:</span> ${hotel.hotelPrice} / night
            </p>
            <p className="text-gray-500 mb-4">
              <span className="font-semibold">Rating:</span> {hotel.hotelRating} ⭐
            </p>
          </div>
          <button className="mt-4 px-3 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            Book Now
          </button>
        </div>
      </div>

      {/* Bottom Section: Specifications & Features */}
      <div className=" px-4 py-6 shadow-md rounded-lg ">
        <h3 className="text-2xl font-bold mb-4 text-center">Hotel Specifications</h3>
        <div className="h-1 w-full mb-4 bg-red-400 "/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 px-6">
          <p><span className="font-semibold">Free WiFi:</span> Available</p>
          <p><span className="font-semibold">Parking:</span> Available</p>
          <p><span className="font-semibold">Swimming Pool:</span> Yes</p>
          <p><span className="font-semibold">Room Service:</span> 24/7</p>
          <p><span className="font-semibold">Pets Allowed:</span> Yes</p>
          <p><span className="font-semibold">Breakfast:</span> Included</p>
        </div>

        <h3 className="text-2xl font-bold  text-center mb-4">Features & Amenities</h3>
          <div className="h-1 w-full mb-4 bg-blue-400 "/>
        <ul className="list-disc list-inside text-gray-500  space-y-1">
          <li>Luxury Rooms with Modern Interiors</li>
          <li>24/7 Customer Support</li>
          <li>Gym & Spa Facilities</li>
          <li>Conference & Event Halls</li>
          <li>Nearby Tourist Attractions</li>
          <li>Airport Pickup & Drop</li>
        </ul>
      </div>
    </div>
  );
};

export default HotelDetails;
