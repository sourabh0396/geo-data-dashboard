import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

console.log("Mongo URI:", process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error(err));
