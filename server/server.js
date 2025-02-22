const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");
const router = express.Router();
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Handle API requests here
app.get("/api/test", (req, res) => {
  res.json({ message: "API test successful!" });
});

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
