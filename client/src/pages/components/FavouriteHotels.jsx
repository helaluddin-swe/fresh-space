import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiJson } from "../../utils/axiosInstance";




const FavouriteHotel = () => {
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
    <div className="max-w-3xl mx-auto p-6 bg-yellow-50 shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">{hotel.hotelName} (Favourite)</h2>
      {hotel.hotelImage && (
        <img
          src={`http://localhost:8000/uploads/${hotel.hotelImage}`}
          alt={hotel.hotelName}
          className="w-full h-64 object-cover mb-4 rounded"
        />
      )}
      <p className="text-gray-700 mb-2">{hotel.hotelDes}</p>
      <p className="text-gray-500 mb-1">
        <span className="font-semibold">Location:</span> {hotel.hotelLocation}
      </p>
      <p className="text-gray-500 mb-1">
        <span className="font-semibold">Price:</span> ${hotel.hotelPrice} / night
      </p>
      <p className="text-gray-500">
        <span className="font-semibold">Rating:</span> {hotel.hotelRating}
      </p>
    </div>
  );
};

export default FavouriteHotel;
