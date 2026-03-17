const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Note: process.env.DATABASE_URL must be defined in your .env file
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      serverSelectionTimeoutMS: 30000, 
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

// Optional: Handle connection loss after initial connect
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected. Attempting to reconnect...");
});

module.exports = connectDB;