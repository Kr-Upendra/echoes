import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import mongoose from "mongoose";
const port = Number(process.env.PORT) || 8080;
const dbPassword = process.env.DB_PASSWORD;
const mongoUri = process.env.MONGODB_URI.replace("<db_password>", dbPassword);

mongoose
  .connect(mongoUri)
  .then(() => console.log("mongo db connected."))
  .catch((err) => console.log("mongo connection failed. \n", err));

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
