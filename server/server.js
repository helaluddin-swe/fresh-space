const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Local Imports
const connectDB = require("./config/db.js");
const hotelRouter = require("./routes/hotelRoutes.js");

// Configuration
dotenv.config();
const app = express();
// Provide a fallback port (e.g., 5000)
const PORT = process.env.PORT || 5000; 

// Database Connection
connectDB();

// Middleware
const allowedOrigins = ["http://localhost:5173"];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route (Fixed)
app.get("/", (req, res) => {
    res.status(200).send("API is running smoothly 🚀");
});

// Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/hotels", hotelRouter);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});