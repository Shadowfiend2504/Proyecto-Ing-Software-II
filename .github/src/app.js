import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import rutasAutenticar from "./routes/autenticar.routes.js";

// Permite usar variables de entorno desde un archivo .env (opcional)
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Usa la variable de entorno CORS_ORIGIN o por defecto localhost:5173
const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", rutasAutenticar);

export default app;
