import express from "express";
import webPush from "web-push";
import cors from "cors";
import {
  authRouter,
  userRouter,
  categoryRouter,
  noteRouter,
  journalRouter,
} from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(cors());

const vapidKeys = webPush.generateVAPIDKeys();

const vapidPublicKey = vapidKeys.publicKey;
const vapidPrivateKey = vapidKeys.privateKey;

webPush.setVapidDetails(
  "mailto:your-email@example.com",
  vapidPublicKey,
  vapidPrivateKey
);

app.get("/api/v1/push/vapidPublicKey", (req, res) => {
  res
    .status(200)
    .json({
      status: "success",
      message: "Vapid Key",
      data: { vapidPublicKey },
    });
});

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
// app.use("/api/v1/voice-notes", voiceNoteRouter);

export default app;
