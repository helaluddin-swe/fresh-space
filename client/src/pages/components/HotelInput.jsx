import { useState, useEffect } from "react";

import { UploadCloud } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Input from "./Input";
import { apiForm } from "../../utils/axiosInstance";


const HotelForm = ({ editing = false, hotelId, onSuccess }) => {
  const {isDarkMode}=useTheme()
  const [hotelName, setHotelName] = useState("");
  const [hotelPrice, setHotelPrice] = useState("");
  const [hotelRating, setHotelRating] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  const [hotelDes, setHotelDes] = useState("");
  const [hotelImage, setHotelImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (editing && hotelId) {
      apiForm.get(`/${hotelId}`).then((res) => {
        const data = res.data;
        setHotelName(data.hotelName);
        setHotelPrice(data.hotelPrice);
        setHotelRating(data.hotelRating);
        setHotelLocation(data.hotelLocation);
        setHotelDes(data.hotelDes);
        setCurrentImage(data.hotelImage);
      });
    }
  }, [editing, hotelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("hotelName", hotelName);
    formData.append("hotelPrice", hotelPrice);
    formData.append("hotelRating", hotelRating);
    formData.append("hotelLocation", hotelLocation);
    formData.append("hotelDes", hotelDes);
    if (hotelImage) formData.append("hotelImage", hotelImage);

    try {
      if (editing) {
        await apiForm.put(`/edit-hotel/${hotelId}`, formData);
      } else {
        await apiForm.post("/add-new-hotel", formData);
      }
      onSuccess(); // refresh list after submission
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`max-w-xl mx-auto ${isDarkMode?"bg-gray-600":""}  shadow-md rounded-lg  px-4 py-2 border shadow-gray-400`}>
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editing ? "Edit Hotel" : "Add New Hotel"}
      </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <Input
          type="text"
          placeholder="Hotel Name"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
        
          
        />
        <Input
          type="number"
          placeholder="Price"
          value={hotelPrice}
          onChange={(e) => setHotelPrice(e.target.value)}
         
        
        />
        <Input
          type="number"
          step="0.1"
          placeholder="Rating"
          value={hotelRating}
          onChange={(e) => setHotelRating(e.target.value)}
      
        
        />
        <Input
          type="text"
          placeholder="Location"
          value={hotelLocation}
          onChange={(e) => setHotelLocation(e.target.value)}
   
          
        />
        <div>
          <label className="block mb-2 font-medium">Hotel Image:</label>
          <UploadCloud size={32} className="items-center justify-center  "/> 
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setHotelImage(e.target.files[0])}
         
          /> 
          {editing && currentImage && (
            <img
              src={`http://localhost:8000/uploads/${currentImage}`}
              alt="Hotel"
              className="mt-2 w-48 h-32 object-cover rounded-lg shadow"
            />
          )}
        </div>
        <textarea
          placeholder="Description"
          value={hotelDes}
          onChange={(e) => setHotelDes(e.target.value)}
          required
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          {editing ? "Update Hotel" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default HotelForm;
