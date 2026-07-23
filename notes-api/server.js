import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import notesRouter from "./routes/notes.js";
import cors from "cors";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/notes", notesRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Notes api is running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongodb");
    app.listen(port, () => {
      console.log(`server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });
