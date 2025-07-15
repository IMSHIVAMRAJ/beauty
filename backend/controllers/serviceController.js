import Service from "../models/Service.js";

export const addService = async (req, res) => {
  const { name, category, subcategory, price, discount, descriptionPoints, precautionsAndAftercare, ingredients } =
    req.body;

  const mainImage = req.files["mainImage"]?.[0]?.path;
  const subImages = req.files["subImages"]?.map((file) => file.path) || [];
  const categoryImage = req.files["categoryImage"]?.[0]?.path; 

  const finalPrice = price - price * (discount / 100);

  const service = await Service.create({
    name,
    category,
    subcategory,
    categoryImage,
    price,
    discount,
  precautionsAndAftercare: JSON.parse(precautionsAndAftercare),
  ingredients: JSON.parse(ingredients),
    finalPrice,
    descriptionPoints: JSON.parse(descriptionPoints),
    mainImage,
    subImages,
  });

  res.status(201).json(service);
};

export const getAllServices = async (req, res) => {
  const services = await Service.find();
  res.status(200).json(services);
};

export const getTrendingServices = async (req, res) => {
  const services = await Service.find().sort({ usageCount: -1 }).limit(5);
  res.status(200).json(services);
};
export const approveService = async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: "Service not found" });

  service.isApproved = true;
  await service.save();

  res.status(200).json({ message: "Service approved", service });
};
export const deleteService = async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ message: "Service not found" });

  res.status(200).json({ message: "Service deleted successfully" });
}