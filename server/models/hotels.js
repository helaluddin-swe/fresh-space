const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  hotelPrice: { type: Number, required: true },
  hotelRating: { type: Number, required: true },
  hotelLocation: { type: String, required: true },
  hotelImage: { type: String }, // filename or URL
  hotelDes: { type: String, required: true },
});
const Hotel=mongoose.model('Hotel', hotelSchema);
module.exports = Hotel
