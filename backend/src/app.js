import express from "express";
import cors from "cors";
import { authRouter } from "./routes/authRoute.js";
import { userRouter } from "./routes/userRoute.js";
import { categoryRouter } from "./routes/categoryRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  return res.status(200).json({
    status: "success",
    message: "This is testing route for memories application.",
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);

export default app;
