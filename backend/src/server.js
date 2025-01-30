import app from "./app.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import {
  nodeEnv,
  port,
  dbPassword,
  mongoUri,
  mongoUriLocal,
} from "./utils/helper/constants.js";

let dbUri;

if (nodeEnv === "development") dbUri = mongoUriLocal;
else dbUri = mongoUri.replace("<db_password>", dbPassword);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

mongoose
  .connect(dbUri)
  .then(() => console.log("mongo db connected."))
  .catch((err) => console.log("mongo connection failed. \n", err));

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
