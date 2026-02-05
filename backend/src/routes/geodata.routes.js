import express from "express";
import { getGeoData } from "../controllers/geodata.controller.js";

const router = express.Router();

router.get("/", getGeoData);

export default router;
