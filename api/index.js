const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

// Set strictQuery option for Mongoose to true, which filters out any fields in a query not defined in the schema
mongoose.set("strictQuery", true);
// Load environment variables from the .env file using the dotenv package
dotenv.config();
// Use express.json() middleware to parse incoming JSON data in the request body
app.use(express.json());
// Set up a static file server for the /images directory using express.static() middleware
app.use("/images", express.static(path.join(__dirname, "/images")))

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
  })
  .then(console.log("MongoDB is connected"))
  .catch(( err ) => console.log(err));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null,"images");
  },
  filename:(req, file, cb) => {
    cb(null,req.body.name);
  }
});

// Route for uploading files
const upload = multer({storage : storage})
app.post("/api/upload", upload.single("file"), (req,res) => {
  res.status(200).json("file has been uploaded");
})

// Enable CORS for all routes
const corsOptions = {
  origin: [process.env.NODE_APP_API_URL, process.env.NODE_APP_PROD_API_URL]
};

//when you use localhost
// app.use(cors(corsOptions));


  

// Use route handlers for different API endpoints
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);


// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "/client/build")));
// Catch-all route to serve the React index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

// Start the server on the specified port
app.listen(process.env.PORT || 5001, () => {
    console.log("Backend is running.");
  });
  