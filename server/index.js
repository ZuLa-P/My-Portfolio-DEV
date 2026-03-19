import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// TODO: import and use your routes here
// import contactRoutes from "./routes/contact.js";
// app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
