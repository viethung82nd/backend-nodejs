const mongoose = require("mongoose");

module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      bufferCommands: false, // 🔥 QUAN TRỌNG
      serverSelectionTimeoutMS: 10000, // tránh treo vô hạn
    });
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }
};
