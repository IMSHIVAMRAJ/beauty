import fetch from "node-fetch";

const reverseGeocode = async (lat, lng) => {
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
        const res = await fetch(url, {
        headers: { "User-Agent": "yesmadam-location-checker" },
        });
        const data = await res.json();
        const city = data.address.city || data.address.town || data.address.village;
        const state = data.address.state;
        return { city, state };
    } catch (err) {
        console.error("Reverse geocode failed:", err);
        return { city: null, state: null };
    }
};

export default reverseGeocode;