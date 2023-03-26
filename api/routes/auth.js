const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");


// Route for registering a new user
router.post("/register", async (req,res) => {
    try {
        // Generate a salt and hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user with the hashed password and other user information
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass,
        });

        // Save the new user to the database
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Route for logging in a user
router.post("/login", async (req, res) => {

    try {
        // Find the user by their username
        const user = await User.findOne({username: req.body.username});

        // If the user is not found, return an error
        !user && res.status(400).json("This is wrong confidential.");

        // Compare the provided password with the stored hashed password
        const validated = await bcrypt.compare(req.body.password, user.password);

        // If the passwords do not match, return an error
        !validated && res.status(400).json("This is wrong confidential.");

        // If the passwords match, return the user without the password field
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        // Handle any errors that may occur during the login process
    }


})
module.exports = router;