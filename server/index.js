const express = require("express");
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//Configutaion
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

//Routes
const authRoute = require("./routes/authRouter");
const userRoute = require("./routes/userRouter");

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

//Connect to mongodb
const MONGO_URL = process.env.MONGO_URL;
const connect = async () => {
  const mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  mongoose.set("strictQuery", false);
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
};

//Start server only if connected to database
connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
      });
    } catch (error) {
      console.log("Cannot connect to server");
    }
  })
  .catch((error) => console.log("Invalid Database Connection.!!"));
