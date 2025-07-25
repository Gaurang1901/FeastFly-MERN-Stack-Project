
const Category = require("../models/Category.model");

exports.createCategory = async ({ name, description, image, CategoryType }) => {
  if (!name || !description || !image || !CategoryType) {
    throw { status: 400, message: "All fields are required." };
  }
  const newCategory = new Category({ name, description, image, CategoryType });
  await newCategory.save();
  return newCategory;
};

exports.getAllCategories = async () => {
  return await Category.find();
};

exports.getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    throw { status: 404, message: "Category not found" };
  }
  return category;
};

exports.updateCategory = async (id, updateData) => {
  const category = await Category.findByIdAndUpdate(id, updateData, { new: true });
  if (!category) {
    throw { status: 404, message: "Category not found" };
  }
  return category;
};

exports.deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw { status: 404, message: "Category not found" };
  }
  return category;
};
