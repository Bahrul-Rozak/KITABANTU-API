// app.js - Entry point aplikasi
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./models");
const authRoutes = require("./routes/auth");
const projectRoutes = require('./routes/projects'); 
const categoryRoutes = require('./routes/categories');
const commentRoutes = require('./routes/comments');
const backerRoutes = require('./routes/backers');

const errorHandler = require("./middlewares/errorHandler");

dotenv.config(); // Memuat variabel lingkungan dari .env

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());
app.use(cors());

// Sinkronisasi database
sequelize
  .authenticate()
  .then(() => {
    console.log("Berhasil terhubung ke database.");
    return sequelize.sync(); // Membuat tabel jika belum ada
  })
  .then(() => {
    console.log("Database berhasil disinkronisasi.");
  })
  .catch((error) => {
    console.error("Gagal terhubung ke database:", error);
  });

// Rute dasar
app.get("/", (req, res) => {
  res.json({ message: "Selamat datang di Crowdfunding API" });
});
// API versioning
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/projects", backerRoutes);

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

// Error handler
app.use(errorHandler.errorHandler);
