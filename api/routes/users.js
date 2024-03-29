const router = require("express").Router();
const User = require("../models/User.js");
const Post = require("../models/Post.js");
const bcrypt = require("bcrypt");

// Route for updating a user
router.put("/:id", async (req,res) => {

    
    if(req.body.userId === req.params.id){
        // If the password needs to be updated, hash it
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        try {
            // Update the user in the database
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, 
                {
                    $set: req.body,
                }, 
                {   new:true,
                }
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json(error);
        }

    } else {
        res.status(401).json("You cannot update only your account")
    }

   
});

// Route for logging in
router.post("/login", async (req, res) => {

    try {
        
        const user = await User.findOne({username: req.body.username});
        !user && res.status(400).json("This is wrong confidential.");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("This is wrong confidential.");

        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        
    }


});

// Route for deleting a user
router.delete("/:id", async (req,res) => {

    if(req.body.userId === req.params.id){
      try {
        const user = await User.findById(req.params.id);

        try {
            await Post.deleteMany({username: user.username});
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted...");
        } catch (error) {
            res.status(500).json(error);
        }
      } catch (error) {
            res.status(404).json("User not found");
      }
    } else {
        res.status(401).json("You cannot delete only your account")
    }

   
});

// Route for getting a user by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;