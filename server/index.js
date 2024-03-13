// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");
// // const app = express();
// // require("dotenv").config();
// // const { MONGO_URL, PORT } = process.env;
// // // const MONGO_URL = "mongodb+srv://note_summerizer_1018:note_summerizer_1018@cluster0.0cdsgi1.mongodb.net/?retryWrites=true&w=majority";
// // // const PORT = 4000;
// // mongoose
// //   .connect(MONGO_URL, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then(() => console.log("MongoDB is  connected successfully"))
// //   .catch((err) => console.error(err));

// // app.listen(PORT, () => {
// //   console.log(`Server is listening on port ${PORT}`);
// // });

// // app.use(
// //   cors({
// //     origin: ["http://localhost:4000"],
// //     methods: ["GET", "POST", "PUT", "DELETE"],
// //     credentials: true,
// //   })
// // );

// // app.use(express.json());

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();
// require("dotenv").config();
// const cookieParser = require("cookie-parser");
// const authRoute = require("./Routes/AuthRoute");
// const { MONGO_URL, PORT } = process.env;


// app.use("/files", express.static("files"));//

// mongoose
//   .connect(MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB is  connected successfully"))
//   .catch((err) => console.error(err));






// //multer------------------------------------------------------------
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./files");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// require("./pdfDetails");
// const PdfSchema = mongoose.model("PdfDetails");
// const upload = multer({ storage: storage });

// app.post("/upload-files", upload.single("file"), async (req, res) => {
//   console.log(req.file);
//   const title = req.body.title;
//   const fileName = req.file.filename;
//   try {
//     await PdfSchema.create({ title: title, pdf: fileName });
//     res.send({ status: "ok" });
//   } catch (error) {
//     res.json({ status: error });
//   }
// });

// app.get("/get-files", async (req, res) => {
//   try {
//     PdfSchema.find({}).then((data) => {
//       res.send({ status: "ok", data: data });
//     });
//   } catch (error) {}
// });

// //apis----------------------------------------------------------------
// app.get("/", async (req, res) => {
//   res.send("Success!!!!!!");
// });









// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
// app.use(cookieParser());

// app.use(express.json());

// app.use("/", authRoute);


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const app = express();
require("dotenv").config();
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

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

app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

app.use("/", authRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

