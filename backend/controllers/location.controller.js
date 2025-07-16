import reverseGeocode from "../utils/reverseGeocode.js";
import Location from "../models/Location.js";

export const handleReverseGeocode = async (req, res) => {
    const { lat, lng } = req.body;

    if (!lat || !lng) {
        return res.status(400).json({ success: false, message: "Latitude and longitude required" });
    }

    const { city, state } = await reverseGeocode(lat, lng);

    if (!city || !state) {
        return res.status(404).json({ success: false, message: "Could not resolve city/state from coordinates" });
    }

    const matchedLocation = await Location.findOne({ city: city.trim(), isActive: true });

    if (matchedLocation) {
        return res.status(200).json({
        success: true,
        location: {
            id: matchedLocation._id,
            name: matchedLocation.city,
        },
        });
    } else {
        return res.status(404).json({ success: false, message: "Service not available in your city" });
    }
};