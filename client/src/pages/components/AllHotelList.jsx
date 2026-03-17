import React, { useCallback, useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import HotelForm from "./HotelInput";
import { CirclePlus } from "lucide-react";
import { apiJson } from "../../utils/axiosInstance";
import { BASE_URL } from "../../utils/axiosInstance";




const AllHotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [editingHotelId, setEditingHotelId] = useState(null);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const loader = useRef(null);

  // Fetch hotels from backend
  const fetchHotels = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiJson.get(`?page=${page}`);
      const data = res.data;
      const hotelArray = Array.isArray(data) ? data : data.hotels || [];
      const totalCount = data.total || hotelArray.length;
      setHotels((prev) => [...prev, ...hotelArray]);
      setTotal(totalCount);
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
    setLoading(false);
  }, [page]);


  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && hotels.length < total) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) observer.observe(loader.current);

    return () => observer.disconnect();
  }, [loading, total, hotels.length]);



  const handleDelete = async (id) => {
    await apiJson.delete(`/${id}`);
    fetchHotels();
  };

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="text-center mb-6 ">
      <Link to={"/"}>Home</Link>
        <h3 className="text-3xl font-bold md:text-5xl text-yellow-500 mb-2 ">Our Top-Rated Hotels
        </h3>
        <span className="text-md max-w-2xl text-center justify-center text-gray-400 mb-4">
          Handpicked for quality, comfort, and exceptional service. Explore our curated selection of luxury hotels, boutique stays, and family-friendly resorts — all designed to make your trip unforgettable.</span>
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
        ) :
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <div
                key={hotel._id}
                className=" shadow-md shadow-gray-500 rounded-lg overflow-hidden"
              >
                {hotel.hotelImage && (
                  <img
                    src={`${BASE_URL}/${hotel.hotelImage}`}
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
                      onClick={() => setEditingHotelId(hotel._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(hotel._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/hotel-details/${hotel._id}`)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
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
        }
      </div>
      {/* laod more hotesl */}
      <div ref={loader} className="flex justify-center mt-6">
        {loading && <div className="loader border-4 border-gray-300 border-t-blue-500 rounded-full w-8 h-8 animate-spin"></div>}
      </div>
{/* add button for add hotels */}
<button className="fixed right-4 bottom-4 " onClick={() => navigate("/addhotel")}> <CirclePlus size={50} className=" text-red-500  "/></button>

    </div>

  );
};

export default AllHotelList;
