
const CategoryService = require("../services/Category.service");


exports.createCategory = async (req, res) => {
  try {
    const { name, description, image, CategoryType } = req.body;
    const newCategory = await CategoryService.createCategory({ name, description, image, CategoryType });
    res.status(201).json({
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryService.getCategoryById(id);
    res.status(200).json({
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const category = await CategoryService.updateCategory(id, updateData);
    res.status(200).json({
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryService.deleteCategory(id);
    res.status(200).json({
      message: "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};
