const express = require("express");
const multer = require("multer");


const { createHotel, editHotel, getAllHotel, deleteHotelById, getHotelById } = require("../controllers/hotelContrller");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Create new hotel
router.post("/add-new-hotel", upload.single("hotelImage"), createHotel);

// Edit hotel
router.put("/edit-hotel/:id", upload.single("hotelImage"), editHotel);

// Get all hotels
router.get("/", getAllHotel);

// Get hotel by ID
router.get("/:id",getHotelById );

// Delete hotel by ID
router.delete("/:id", deleteHotelById);

module.exports = router;
