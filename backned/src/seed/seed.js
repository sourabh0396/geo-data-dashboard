import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import GeoData from "../models/geodata.model.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  try {
    console.log("🌱 Seed script started");

    // 1️⃣ Mongo URI check
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ MONGODB_URI not found in .env");
    }

    // 2️⃣ Connect DB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");

    // 3️⃣ Read JSON file
    const filePath = path.join(__dirname, "dummyData.json");
    console.log("📄 Reading:", filePath);

    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    console.log(`📦 Records loaded: ${data.length}`);

    // 4️⃣ Clear old data
    await GeoData.deleteMany({});
    console.log("🧹 Old records deleted");

    // 5️⃣ Transform data
    const docs = data.map((item) => ({
      projectName: item.projectName,
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
      status: item.status,
      lastUpdated: new Date(item.lastUpdated),
    }));

    // 6️⃣ Insert
    await GeoData.insertMany(docs);
    console.log("🚀 Data inserted successfully");

    process.exit(0);
  } catch (err) {
    console.error("❌ SEED FAILED:", err);
    process.exit(1);
  }
}

seed();
