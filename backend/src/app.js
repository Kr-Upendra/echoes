import express from "express";
import cors from "cors";
import {
  authRouter,
  userRouter,
  categoryRouter,
  noteRouter,
  journalRouter,
  testRouter,
} from "./routes/index.js";

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
app.use("/api/v1/notes", noteRouter);
app.use("/api/v1/journals", journalRouter);
app.use("/api/v1/test", testRouter);

export default app;
