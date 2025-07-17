import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";

export default function FaceDetectionPage() {
    const videoRef = useRef(null);
    const [gender, setGender] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = "/models";
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(`${MODEL_URL}/tiny_face_detector_model`),
                faceapi.nets.ageGenderNet.loadFromUri(`${MODEL_URL}/age_gender_model`)
            ]);
            startVideo();
        };
        loadModels();
    }, []);

    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: {} })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch(() => {
                setError("Camera access denied. Please allow webcam permission.");
            });
    };

    const handleVideoPlay = () => {
        const interval = setInterval(async () => {
            const detections = await faceapi
                .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withAgeAndGender();

            if (detections) {
                const detectedGender = detections.gender;
                setGender(detectedGender);
                captureImage();
                setError("");
                clearInterval(interval);
            } else {
                setGender(null);
                setError("Face not detected. Please face the camera.");
            }
        }, 1000);
    };

    const captureImage = () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const image = canvas.toDataURL("image/png");
        setImageData(image);
    };

    const handleNext = () => {
        if (gender && imageData) {
            navigate("/ai/recommend", { state: { gender, imageSrc: imageData } });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-[#FAA6FF] to-[#E90000] p-4">
            <div className="w-full max-w-lg bg-white/95 rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center gap-6 border border-pink-200">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-pink-700 mb-2 text-center tracking-tight drop-shadow">AI Face & Gender Detector</h1>

                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    width="480"
                    height="320"
                    onPlay={handleVideoPlay}
                    className="rounded-xl border-2 border-pink-200 shadow-lg mb-2 bg-gray-100"
                />

                {gender && (
                    <div className="text-lg text-green-600 font-semibold mb-1">
                        Detected Gender: <span className="capitalize">{gender}</span>
                    </div>
                )}

                {error && <div className="text-red-500 font-medium mb-1 text-center">{error}</div>}

                <button
                    onClick={handleNext}
                    disabled={!gender || !imageData}
                    className={`w-full py-3 rounded-full font-bold text-lg shadow-md transition-all tracking-wide mt-2
                        ${gender && imageData
                            ? "bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white hover:from-pink-700 hover:to-pink-400"
                            : "bg-gray-300 text-gray-400 cursor-not-allowed"}
                    `}
                >
                    Analyze
                </button>
            </div>
        </div>
    );
}
