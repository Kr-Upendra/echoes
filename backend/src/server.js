import app from "./app.js";
import mongoose from "mongoose";
import { port, dbPassword, mongoUri } from "./utils/helper/constants.js";

const dbUri = mongoUri.replace("<db_password>", dbPassword);

mongoose
  .connect(dbUri)
  .then(() => console.log("mongo db connected."))
  .catch((err) => console.log("mongo connection failed. \n", err));

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
