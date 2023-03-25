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

mongoose.set("strictQuery", true);
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose
  .connect(process.env.MONGO_URL, {
  })
  .then(console.log("MongoDB is connected"))
  .catch(( err ) => console.log(err));

const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null,"images");
  },
  filename:(req, file, cb) => {
    cb(null,req.body.name);
  }
});

const upload = multer({storage : storage})
app.post("/api/upload", upload.single("file"), (req,res) => {
  res.status(200).json("file has been uploaded");
})

// Enable CORS for all routes
const corsOptions = {
  origin: ['http://localhost:3001', 'https://naoto-blog.herokuapp.com/']
};

//when you use localhost
app.use(cors(corsOptions));
  

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);



app.use(express.static(path.join(__dirname, "/client/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});


app.listen(process.env.PORT || 5001, () => {
    console.log("Backend is running.");
  });
  