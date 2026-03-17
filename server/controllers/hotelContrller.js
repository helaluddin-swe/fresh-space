const fs = require("fs");
const path = require("path");
const Hotel = require("../models/hotels");


exports.createHotel=async (req, res) => {
  try {
    const { hotelName, hotelPrice, hotelRating, hotelLocation, hotelDes } =
      req.body;
    const hotelImage = req.file ? req.file.filename : null;

    const newHotel = new Hotel({
      hotelName,
      hotelPrice,
      hotelRating,
      hotelLocation,
      hotelImage,
      hotelDes,
    });
    await newHotel.save();
    res.json(newHotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
exports.editHotel=async (req, res) => {
  try {
    const { id } = req.params;
    const { hotelName, hotelPrice, hotelRating, hotelLocation, hotelDes } =
      req.body;

    const hotel = await Hotel.findById(id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // Remove old image if new image is uploaded
    if (req.file && hotel.hotelImage) {
      const oldImagePath = path.join(__dirname, "../uploads", hotel.hotelImage);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }

    const hotelImage = req.file ? req.file.filename : hotel.hotelImage;

    hotel.hotelName = hotelName;
    hotel.hotelPrice = hotelPrice;
    hotel.hotelRating = hotelRating;
    hotel.hotelLocation = hotelLocation;
    hotel.hotelDes = hotelDes;
    hotel.hotelImage = hotelImage;

    await hotel.save();
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
exports.getAllHotel=async (req, res) => {
  try {
   const page = parseInt(req.query.page) || 1; // current page
    const limit = parseInt(req.query.limit) || 10; // items per page
    const skip = (page - 1) * limit;

    const total = await Hotel.countDocuments();
    const hotels = await Hotel.find().skip(skip).limit(limit);

    res.json({ hotels, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// get hotel by id
exports.getHotelById=async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// delelte hotel by id
exports.deleteHotelById=async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // Remove image from uploads folder
    if (hotel.hotelImage) {
      const imagePath = path.join(__dirname, "../uploads", hotel.hotelImage);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hotel deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}