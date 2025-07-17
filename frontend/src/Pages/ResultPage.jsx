import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { recommendations } = location.state || {};
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (!recommendations) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-[#FAA6FF] to-[#E90000] p-4">
                <div className="w-full max-w-xl bg-white/95 rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center gap-6 border border-pink-200">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-700 mb-2 text-center tracking-tight drop-shadow">No recommendations found.</h2>
                    <button
                        className="bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white font-bold py-3 px-8 rounded-full shadow hover:from-pink-700 hover:to-pink-400 transition text-lg mt-4"
                        onClick={() => navigate("/")}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-[#FAA6FF] to-[#E90000] p-4">
            <div className="w-full max-w-4xl bg-white/95 rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center border border-pink-200">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-700 mb-8 text-center tracking-tight drop-shadow">Recommended Services</h2>

                {loading ? (
                    <div className="flex flex-col items-center gap-4 mb-8">
                        <div className="w-12 h-12 border-4 border-pink-200 border-t-[#E90000] rounded-full animate-spin"></div>
                        <p className="text-pink-600 font-semibold">Analyzing your results...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full mb-8">
                        {recommendations.map((service, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-pink-50 via-white to-pink-100 p-6 rounded-2xl shadow-lg border border-pink-200 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl opacity-0 animate-fadeIn"
                                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                            >
                                <h3 className="text-xl font-bold text-pink-700 mb-2">{service.name}</h3>
                                <p className="text-gray-700 mb-4 min-h-[60px]">{service.description || "No description available."}</p>
                                <a
                                    className="inline-block bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white font-semibold py-2 px-6 rounded-full shadow hover:from-pink-700 hover:to-pink-400 transition"
                                    href={service.url || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Service
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    className="bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white font-bold py-3 px-8 rounded-full shadow hover:from-pink-700 hover:to-pink-400 transition text-lg"
                    onClick={() => navigate("/")}
                >
                    Start Over
                </button>
            </div>
            <style>{`
                @keyframes fadeIn {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeIn 0.6s ease forwards;
                }
            `}</style>
        </div>
    );
};

export default ResultPage;
