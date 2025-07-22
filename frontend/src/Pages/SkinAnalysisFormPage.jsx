import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const treatmentOptions = ["Face", "Arms", "Back", "Full Body", "Hands", "Legs"];
const skinConcerns = [
    "Acne", "Pigmentation", "Dull Skin", "Open Pores", "Unwanted Facial Hair",
    "Ageing Signs", "Hyperpigmentation", "Dehydrated Skin", "Facial Hair",
    "Eczema", "Dark Spots", "Wrinkles", "Dry Patches", "Sunburn",
    "Tanned Skin", "Blackheads", "Uneven Tone", "Sagging Skin",
    "Body Hair", "Underarm Hair", "Leg Hair", "Arm Hair"
];

const SkinAnalysisFormPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { gender: detectedGender, image: capturedImage } = location.state || {};

    const [formData, setFormData] = useState({
        gender: "",
        skin_concern: [],
        event_type: "",
        treatment_area: [],
    });

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [skinDropdownOpen, setSkinDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const skinDropdownRef = useRef(null);

    useEffect(() => {
        if (detectedGender) {
            setFormData((prev) => ({
                ...prev,
                gender: detectedGender.toLowerCase(),
            }));
        }
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
            if (skinDropdownRef.current && !skinDropdownRef.current.contains(e.target)) {
                setSkinDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [detectedGender]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            const updated = checked
                ? [...prev.treatment_area, value]
                : prev.treatment_area.filter((item) => item !== value);
            return { ...prev, treatment_area: updated };
        });
        setTimeout(() => setDropdownOpen(false), 200);
    };

    const handleSkinConcernChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            const updated = checked
                ? [...prev.skin_concern, value]
                : prev.skin_concern.filter((item) => item !== value);
            return { ...prev, skin_concern: updated };
        });
        setTimeout(() => setSkinDropdownOpen(false), 200);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://ai-flask-acit.onrender.com/ai/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.status === "success") {
                navigate("/ai/result", { state: { recommendations: data.recommended_service } });
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Backend connection failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-[#FAA6FF] to-[#E90000] p-4">
            <div className="w-full max-w-xl bg-white/95 rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center gap-6 border border-pink-200">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-700 mb-2 text-center tracking-tight drop-shadow">Skin Analysis Form</h2>

                {capturedImage && (
                    <div className="mb-2 w-full flex justify-center">
                        <img src={capturedImage} alt="Captured face" className="rounded-xl w-48 h-48 object-cover border-2 border-pink-200 shadow" />
                    </div>
                )}

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Gender:</label>
                        <input
                            type="text"
                            name="gender"
                            value={formData.gender}
                            readOnly
                            disabled
                            className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 bg-gray-100 text-gray-400 font-medium"
                        />
                    </div>

                    {/* Skin Concerns Dropdown */}
                    <div className="relative" ref={skinDropdownRef}>
                        <label className="block font-semibold text-gray-700 mb-1">Skin Concerns (Select multiple):</label>
                        <div
                            className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 cursor-pointer"
                            onClick={() => setSkinDropdownOpen((prev) => !prev)}
                        >
                            {formData.skin_concern.length > 0
                                ? formData.skin_concern.join(", ")
                                : <span className="text-gray-400">Select options</span>}
                        </div>
                        {skinDropdownOpen && (
                            <div className="absolute left-0 mt-2 w-full bg-white border-2 border-pink-200 rounded-xl shadow-lg z-40 p-3 max-h-56 overflow-y-auto">
                                {skinConcerns.map((option) => (
                                    <label key={option} className="flex items-center space-x-2 cursor-pointer text-gray-700 font-medium mb-2">
                                        <input
                                            type="checkbox"
                                            value={option}
                                            checked={formData.skin_concern.includes(option)}
                                            onChange={handleSkinConcernChange}
                                            className="accent-pink-500 w-5 h-5"
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Event Type */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Event Type:</label>
                        <select
                            name="event_type"
                            value={formData.event_type}
                            onChange={handleChange}
                            required
                            className="w-full border-2 border-pink-200 rounded-lg p-2 bg-pink-50 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 font-medium text-gray-700"
                        >
                            <option value="">Select</option>
                            <option value="daily care">Daily Care</option>
                            <option value="festival">Festival</option>
                            <option value="party">Party</option>
                            <option value="photoshoot">Photoshoot</option>
                            <option value="no event">No Event</option>
                            <option value="wedding">Wedding</option>
                        </select>
                    </div>

                    {/* Treatment Area Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <label className="block font-semibold text-gray-700 mb-1">Treatment Area (Select multiple):</label>
                        <div
                            className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 bg-pink-50 cursor-pointer"
                            onClick={() => setDropdownOpen((prev) => !prev)}
                        >
                            {formData.treatment_area.length > 0
                                ? formData.treatment_area.join(", ")
                                : <span className="text-gray-400">Select options</span>}
                        </div>
                        {dropdownOpen && (
                            <div className="absolute left-0 mt-2 w-full bg-white border-2 border-pink-200 rounded-xl shadow-lg z-40 p-3 max-h-56 overflow-y-auto">
                                {treatmentOptions.map((option) => (
                                    <label key={option} className="flex items-center space-x-2 cursor-pointer text-gray-700 font-medium mb-2">
                                        <input
                                            type="checkbox"
                                            value={option}
                                            checked={formData.treatment_area.includes(option)}
                                            onChange={handleCheckboxChange}
                                            className="accent-pink-500 w-5 h-5"
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-full font-bold text-lg shadow-md transition-all tracking-wide mt-2 bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white hover:from-pink-700 hover:to-pink-400"
                    >
                        Get Recommendation
                    </button>
                </form>
            </div>
        </div>
    );
};
export default SkinAnalysisFormPage;
