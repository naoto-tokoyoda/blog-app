const router = require("express").Router();
const Category = require("../models/Category.js");

// router.post("/", async (req, res) => {
//     const newCat = new Category(req.body.categories);
//     console.log(newCat);
//     try {
//         const savedCat = await newCat.save();
//         res.status(200).json(savedCat);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

// router.get("/", async (req, res) => {
//     try {
//         const cats = await Category.find();
//         res.status(200).json(cats);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });





// module.exports = router;


// test
router.post("/", async (req, res) => {
  console.log("Received request data in /categories:", req.body);
  const { name } = req.body;
  try {
    const savedCategories = [];

    for (const cat of name) {
      if (!cat || cat.trim() === "") {
        console.log("Category name is empty or invalid. Skipping.");
        continue;
      }
      const existingCategory = await Category.findOne({ name: cat });
      if (!existingCategory) {
        const newCategory = new Category({ name: cat });
        const savedCategory = await newCategory.save();
        savedCategories.push(savedCategory);
        console.log('Saved category:', savedCategory);
      } else {
        console.log(`Category "${cat}" already exists.`);
      }
    }

    res.status(200).json(savedCategories);
  } catch (error) {
    console.error('Error in /categories route in api:', error);
    res.status(500).json(error);
  }
});




router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;


