import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./src/config/database.js";
import { notFound, errorHandler } from "./src/middleware/error.middleware.js";
import invoiceApi from "./src/apis/invoice.api";
import estimateApi from "./src/apis/estimate.api";
import clientApi from "./src/apis/client.api";

dotenv.config();
connectDatabase();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/invoices", invoiceApi);
app.use("/api/estimates", estimateApi);
app.use("/api/clients", clientApi);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
