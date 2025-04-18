import app from "./app.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { nodeEnv, port } from "./utils/helper/constants.js";
import dotenv from "dotenv";
dotenv.config();

let dbUri;

if (nodeEnv === "development") dbUri = process.env.MONGO_URI;
else
  dbUri = process.env.MONGO_URI.replace(
    "<db_password>",
    process.env.DB_PASSWORD
  );

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
