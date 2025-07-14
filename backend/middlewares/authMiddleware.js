import jwt from "jsonwebtoken";

import Beautician from "../models/Beautician.js";
export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const adminOnly = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
export const protectBeautician = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token, unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const beautician = await Beautician.findById(decoded.id);

    if (!beautician) return res.status(401).json({ message: "Not a beautician" });

    req.beautician = beautician;
    req.user = beautician; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};