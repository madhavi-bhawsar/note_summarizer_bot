const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
// const { MONGO_URL, PORT } = {"mongodb+srv://note_summerizer_1018:note_summerizer_1018@cluster0.0cdsgi1.mongodb.net/?retryWrites=true&w=majority",4000};
const MONGO_URL="mongodb+srv://note_summerizer_1018:note_summerizer_1018@cluster0.0cdsgi1.mongodb.net/?retryWrites=true&w=majority";
const PORT = 4000;
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

