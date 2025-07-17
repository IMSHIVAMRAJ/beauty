import React, { useState } from "react";
import axios from "axios";

const hairConcernOptions = [
    "Itchy Scalp", "Product Buildup", "Scalp Redness", "Excess Oil", "Dandruff Flakes",
    "Scalp Dryness", "Rough Texture", "Split Ends", "Frizz", "Hair Breakage", "Hair Fall",
    "Hair Thinning", "Oily Scalp", "Dry Scalp", "White Flakes", "Hair Stiffness",
    "Hard Water Exposure", "Color Fading", "Color Damage", "Hair Greying", "Weak Roots",
    "Stress Hair Loss"
];

export default function HairRecommendationForm() {
    const [gender, setGender] = useState("");
    const [hairConcerns, setHairConcerns] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleCheckboxChange = (concern) => {
        setHairConcerns((prev) =>
            prev.includes(concern)
                ? prev.filter((c) => c !== concern)
                : [...prev, concern]
        );
    };

    const handleSubmit = async () => {
        if (!gender || hairConcerns.length === 0) {
            alert("Please select gender and at least one hair concern.");
            return;
        }

        setLoading(true);
        setSubmitted(false);

        try {
            await axios.post("http://localhost:5001/ai/hair-recommend", {
                name,
                phone,
                gender,
                hair_concerns: hairConcerns,
            });

            setSubmitted(true);
            setGender("");
            setHairConcerns([]);
        } catch (err) {
            console.error("Error submitting form:", err);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-[#FAA6FF] to-[#E90000] p-4">
            <div className="w-full max-w-xl bg-white/95 rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center gap-6 border border-pink-200">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-700 mb-2 text-center tracking-tight drop-shadow">Hair Concern Form</h2>

                <div className="mb-2 w-full">
                    <label className="block font-semibold text-gray-700 mb-1">Select Gender:</label>
                    <select
                        className="w-full border-2 border-pink-200 rounded-lg p-2 bg-pink-50 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 font-medium text-gray-700"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">-- Select Gender --</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="w-full">
                    <label className="block text-gray-700 font-semibold mb-1">Your Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 rounded-lg border border-pink-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                        required
                    />
                </div>

                <div className="w-full">
                    <label className="block text-gray-700 font-semibold mb-1">Phone Number:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-2 rounded-lg border border-pink-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                        required
                    />
                </div>

                <div className="mb-2 w-full">
                    <label className="block font-semibold text-gray-700 mb-2">Select Hair Concerns:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 max-h-64 overflow-y-scroll p-2 border-2 border-pink-200 rounded-xl bg-pink-50">
                        {hairConcernOptions.map((concern, idx) => (
                            <label key={idx} className="flex items-center space-x-2 cursor-pointer text-gray-700 font-medium">
                                <input
                                    type="checkbox"
                                    checked={hairConcerns.includes(concern)}
                                    onChange={() => handleCheckboxChange(concern)}
                                    className="accent-pink-500 w-5 h-5"
                                />
                                <span>{concern}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    className={`w-full py-3 rounded-full font-bold text-lg shadow-md transition-all tracking-wide mt-2
                        ${loading
                            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white hover:from-pink-700 hover:to-pink-400"}
                    `}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Get Recommendation"}
                </button>

                {submitted && (
                    <p className="text-green-600 mt-4 font-medium text-center">
                        Data sent to admin successfully!
                    </p>
                )}
            </div>
        </div>
    );
}
