const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const registerAuthRoute = require("./routes/register")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")
const passwordResetRoute = require("./routes/passwordReset")
const multer = require("multer");
const path = require("path");

dotenv.config();

app.use(
    bodyParser.urlencoded({
        extended:true
    })
)

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGO_URL).then(console.log("Connected to MongoDB successfully"))
.catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });
const port = process.env.PORT || 5000
app.use("/api/auth", authRoute);
app.use("/api/register",registerAuthRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/password-reset", passwordResetRoute);

app.listen(port, ()=> {
    console.log("Backend is running on port 5000")
})