const Category = require("../models/Category.model");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, image, CategoryType } = req.body;
    if (!name || !description || !image || !CategoryType) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newCategory = new Category({ name, description, image, CategoryType });
    await newCategory.save();
    res.status(201).json({
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const category = await Category.findByIdAndUpdate(id, updateData, { new: true });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      message: "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
