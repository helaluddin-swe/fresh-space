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
const PORT = process.env.PORT ;

// Database Connection
connectDB();

// Middleware
const allowedOrigins = ["http://localhost:5173"];
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// Body Parsing (Replaces body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/hotels", hotelRouter);

// Error Handling (Optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});