import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const updates = req.body;
  if (req.file) updates.profileImage = req.file.path;

  const user = await User.findByIdAndUpdate(userId, updates, { new: true });
  res.status(200).json(user);
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json(user);
};
export const deleteProfile = async (req, res) => {
  const userId = req.user.id;
  await User.findByIdAndDelete(userId);
  res.status(200).json({ message: "Profile deleted successfully" });
};

