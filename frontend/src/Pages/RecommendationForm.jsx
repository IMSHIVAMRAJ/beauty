import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const skinConcernsList = [
    "Acne", "Acne Scar", "Blackheads", "Dark Circles", "Dehydrated Skin",
    "Dry Lips", "Dry Skin", "Dull Skin", "Fine Lines", "Oily Skin",
    "Open Pores", "Pigmentation", "Puffy Eyes", "Redness", "Stretch Marks",
    "Sun Damage", "Tanning", "Uneven Skin Tone", "Whiteheads", "Wrinkles"
];

const RecommendationForm = () => {
    const location = useLocation();
    const { imageSrc, gender } = location.state || {};

    const [selectedConcerns, setSelectedConcerns] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleCheckboxChange = (concern) => {
        setSelectedConcerns(prev =>
            prev.includes(concern)
                ? prev.filter(item => item !== concern)
                : [...prev, concern]
        );
    };

    const handleSubmit = async () => {
        if (!selectedConcerns.length) {
            alert("Please select at least one concern.");
            return;
        }

        try {
            await axios.post("https://ai-flask-acit.onrender.com/ai/recommend", {
                name,
                phone,
                gender: gender?.toLowerCase(),
                skin_concerns: selectedConcerns
            });
            setSubmitted(true);
        } catch (err) {
            console.error("Submission error:", err);
            alert("Something went wrong. Try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-[#FAA6FF] to-[#E90000] p-4">
            <div className="w-full max-w-xl bg-white/95 rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center gap-6 border border-pink-200">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-700 mb-2 text-center tracking-tight drop-shadow">Skin Concern Form</h2>

                <div className="mb-2">
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt="Captured Face"
                            className="rounded-xl w-48 h-48 object-cover mx-auto border-2 border-pink-200 shadow"
                        />
                    ) : (
                        <p className="text-red-500 text-center">Image not available.</p>
                    )}
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
                    <label className="block text-gray-700 font-semibold">Detected Gender:</label>
                    <p className="text-pink-600 font-bold text-lg">{gender || "Not available"}</p>
                </div>

                <div className="mb-2 w-full">
                    <label className="block text-gray-700 font-semibold mb-2">Select Skin Concerns:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 max-h-64 overflow-y-scroll p-2 border-2 border-pink-200 rounded-xl bg-pink-50">
                        {skinConcernsList.map((item, idx) => (
                            <label key={idx} className="flex items-center space-x-2 cursor-pointer text-gray-700 font-medium">
                                <input
                                    type="checkbox"
                                    checked={selectedConcerns.includes(item)}
                                    onChange={() => handleCheckboxChange(item)}
                                    className="accent-pink-500 w-5 h-5"
                                />
                                <span>{item}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    className={`w-full py-3 rounded-full font-bold text-lg shadow-md transition-all tracking-wide mt-2
                        ${selectedConcerns.length
                            ? "bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white hover:from-pink-700 hover:to-pink-400"
                            : "bg-gray-300 text-gray-400 cursor-not-allowed"}
                    `}
                    onClick={handleSubmit}
                    disabled={!selectedConcerns.length}
                >
                    Get Recommendation
                </button>

                {submitted && (
                    <p className="text-green-600 mt-4 font-medium text-center">
                        Data sent to admin successfully!
                    </p>
                )}
            </div>
        </div>
    );
};

export default RecommendationForm;
