//index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const app = express();
const { MONGO_URL, PORT } = process.env;



// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// Serve static files
app.use("/files", express.static("files")); // uncommented this line to serve static files

// MongoDB Connection
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

// Routes
const multer = require("multer");
const PdfSchema = require("./pdfDetails");

const pdfstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: pdfstorage });

app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    await PdfSchema.create({ title: title, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-files", async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// //importing schema
// require("./imageDetails");
// const Images = mongoose.model("ImageDetails");

// const imgstorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../client/src/pages/images/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// const imgupload = multer({ storage: imgstorage });

// app.post("/upload-image", imgupload.single("image"), async (req, res) => {
//   console.log(req.body);
//   const imageName = req.file.filename;

//   try {
//     await Images.create({ image: imageName });
//     res.json({ status: "ok" });
//   } catch (error) {
//     res.json({ status: error });
//   }
// });

// app.get("/get-image", async (req, res) => {
//   try {
//     Images.find({}).then((data) => {
//       res.send({ status: "ok", data: data });
//     });
//   } catch (error) {
//     res.json({ status: error });
//   }
// });





app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

app.use("/", authRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

