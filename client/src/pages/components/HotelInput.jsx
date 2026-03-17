import { useState, useEffect} from "react";
import axios from "axios";
import { UploadCloud } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import Input from "./Input";
import { useAppContext } from "../../context/AppContext";

const HotelForm = ({ editing = false, hotelId, onSuccess }) => {
  const { isDarkMode } = useTheme();
  const { backendUrl } = useAppContext()

  // Form States
  const [hotelName, setHotelName] = useState("");
  const [hotelPrice, setHotelPrice] = useState("");
  const [hotelRating, setHotelRating] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  const [hotelDes, setHotelDes] = useState("");
  const [hotelImage, setHotelImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Preview for new upload
  const [currentImage, setCurrentImage] = useState(""); // Image from DB

  // Fetch data if in editing mode
  useEffect(() => {
    if (editing && hotelId && backendUrl) {
      axios.get(`${backendUrl}/api/hotels/${hotelId}`)
        .then((res) => {
          const data = res.data;
          setHotelName(data.hotelName || "");
          setHotelPrice(data.hotelPrice || "");
          setHotelRating(data.hotelRating || "");
          setHotelLocation(data.hotelLocation || "");
          setHotelDes(data.hotelDes || "");
          setCurrentImage(data.hotelImage || "");
        })
        .catch(err => console.error("Error fetching hotel:", err));
    }
  }, [editing, hotelId, backendUrl]);

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHotelImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a temporary local URL for preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!backendUrl) return;

    const formData = new FormData();
    formData.append("hotelName", hotelName);
    formData.append("hotelPrice", hotelPrice);
    formData.append("hotelRating", hotelRating);
    formData.append("hotelLocation", hotelLocation);
    formData.append("hotelDes", hotelDes);
    if (hotelImage) formData.append("hotelImage", hotelImage);

    try {
      const url = editing 
        ? `${backendUrl}/api/hotels/edit-hotel/${hotelId}` 
        : `${backendUrl}/api/hotels/add-new-hotel`;

      const method = editing ? "put" : "post";

      await axios[method](url, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      onSuccess(); 
    } catch (err) {
      console.error("Submission error:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div className={`max-w-xl mx-auto shadow-md rounded-lg px-6 py-8 border transition-colors ${
      isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"
    } shadow-gray-400`}>
      
      <h2 className="text-2xl font-bold mb-6 text-center">
        {editing ? "Edit Hotel Details" : "Add New Hotel"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" placeholder="Hotel Name" value={hotelName} onChange={(e) => setHotelName(e.target.value)} required />
        
        <div className="grid grid-cols-2 gap-4">
          <Input type="number" placeholder="Price" value={hotelPrice} onChange={(e) => setHotelPrice(e.target.value)} required />
          <Input type="number" step="0.1" placeholder="Rating (0-5)" value={hotelRating} onChange={(e) => setHotelRating(e.target.value)} required />
        </div>

        <Input type="text" placeholder="Location" value={hotelLocation} onChange={(e) => setHotelLocation(e.target.value)} required />

        <div className="border-2 border-dashed border-gray-400 p-4 rounded-lg flex flex-col items-center">
          <label className="cursor-pointer flex flex-col items-center">
            <UploadCloud size={40} className="text-blue-500 mb-2" />
            <span className="text-sm text-gray-400">Click to upload hotel image</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>

          {/* Show Image Previews */}
          <div className="mt-4 flex gap-4">
            {imagePreview ? (
              <div className="text-center">
                <p className="text-xs mb-1">New Preview:</p>
                <img src={imagePreview} alt="New" className="w-32 h-24 object-cover rounded border" />
              </div>
            ) : editing && currentImage && (
              <div className="text-center">
                <p className="text-xs mb-1">Current Image:</p>
                <img src={`${backendUrl}/uploads/${currentImage}`} alt="Current" className="w-32 h-24 object-cover rounded border" />
              </div>
            )}
          </div>
        </div>

        <textarea
          placeholder="Hotel Description"
          value={hotelDes}
          onChange={(e) => setHotelDes(e.target.value)}
          required
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
            isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"
          }`}
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg active:scale-95"
        >
          {editing ? "Save Changes" : "Create Hotel Listing"}
        </button>
      </form>
    </div>
  );
};

export default HotelForm;