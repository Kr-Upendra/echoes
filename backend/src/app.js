import express from "express";
import cors from "cors";
import {
  authRouter,
  userRouter,
  noteRouter,
  journalRouter,
  testRouter,
} from "./routes/index.js";
import { ErrorHandler } from "./utils/index.js";
import { globalErrorHandler } from "./controllers/errorController.js";

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://recallmomentsapi.onrender.com/",
];

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (_, res) => {
  return res.status(200).json({
    status: "success",
    message: "This is testing route for memories application.",
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/notes", noteRouter);
app.use("/api/v1/journals", journalRouter);
app.use("/api/v1/test", testRouter);

app.all("*", (req, _res, next) => {
  return next(
    new ErrorHandler(`Can't find ${req.originalUrl} on this server.`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
