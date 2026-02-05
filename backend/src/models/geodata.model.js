import mongoose from "mongoose";

const geoDataSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      index: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Completed"],
      required: true,
    },
    lastUpdated: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("GeoData", geoDataSchema);
