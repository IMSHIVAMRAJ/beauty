import express from "express";
import path from "path";
import fs from "fs";
import reverseGeocode from "../utils/reverseGeocode.js";

const router = express.Router();

const LOCATION_FILE = path.resolve("service_locations.json");

router.get("/", (req, res) => {
    const data = JSON.parse(fs.readFileSync(LOCATION_FILE));
    res.json({ success: true, locations: data.locations });
    });

    router.post("/reverse-geocode", async (req, res) => {
    const { lat, lng } = req.body;
    if (!lat || !lng) {
        return res.status(400).json({ success: false, message: "Missing coordinates" });
    }

    const { city, state } = await reverseGeocode(lat, lng);
    if (!city || !state) {
        return res.json({ success: false, message: "Failed to detect location." });
    }

    const data = JSON.parse(fs.readFileSync(LOCATION_FILE));
    const found = data.locations.find(
        (l) =>
        l.city.toLowerCase() === city.toLowerCase() &&
        l.state.toLowerCase() === state.toLowerCase()
    );

    if (found) {
        res.json({ success: true, location: found });
    } else {
        res.json({ success: false, message: `${city}, ${state} not serviceable yet.` });
    }
});

export default router;