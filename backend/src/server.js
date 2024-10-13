import app from "./app.js";
import mongoose from "mongoose";
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

mongoose
  .connect(dbUri)
  .then(() => console.log("mongo db connected."))
  .catch((err) => console.log("mongo connection failed. \n", err));

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
