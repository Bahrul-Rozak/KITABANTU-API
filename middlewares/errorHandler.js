exports.errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Jika error dari validasi
  if (err.array) {
    return res.status(400).json({
      errors: err.array({ onlyFirstError: true }),
    });
  }

  // Jika error dari JWT
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      error: "Token tidak valid atau tidak ditemukan",
    });
  }

  // Error internal server
  res.status(500).json({
    error: "Terjadi kesalahan pada server",
  });
};
