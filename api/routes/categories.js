const router = require("express").Router();
const Category = require("../models/Category.js");


// Route for creating categories
router.post("/", async (req, res) => {
  console.log("Received request data in /categories:", req.body);
  const { name } = req.body;
  try {
    const savedCategories = [];

    // Loop through the array of category names
    for (const cat of name) {
      if (!cat || cat.trim() === "") {
        console.log("Category name is empty or invalid. Skipping.");
        continue;
      }

      // Check if the category already exists in the database
      const existingCategory = await Category.findOne({ name: cat });

      // If the category doesn't exist, create and save it
      if (!existingCategory) {
        const newCategory = new Category({ name: cat });
        const savedCategory = await newCategory.save();
        savedCategories.push(savedCategory);
        // console.log('Saved category:', savedCategory);
      } else {
        console.log(`Category "${cat}" already exists.`);
      }
    }

    // Return the saved categories as a response
    res.status(200).json(savedCategories);
  } catch (error) {
    // console.error('Error in /categories route in api:', error);
    res.status(500).json(error);
  }
});

// Route for getting all categories
router.get("/", async (req, res) => {
  try {

    // Fetch all categories from the database
    const cats = await Category.find();

    // Return the fetched categories as a response
    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;


