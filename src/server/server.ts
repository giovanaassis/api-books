import express from "express";
import "./shared/services/TranslationsYup";
import router from "./routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.ENABLED_CORS?.split(";") || [],
  }),
);

app.use(express.json());

app.use(router);

export default app;
