import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    const MONGOURI = String(MONGODB_URI)
      .trim()
      .replace(/^"|"$/g, "")
      .replace(/^'|'$/g, "");

    const redactedUri = MONGOURI.replace(
      /(mongodb(?:\+srv)?:\/\/)([^@/]+)@/i,
      "$1***@",
    );
    console.log("Mongo URI:", redactedUri);

    await mongoose.connect(MONGOURI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error?.message || error);
    process.exit(1);
  }
};
