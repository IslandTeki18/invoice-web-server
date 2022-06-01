import express from "express";
const router = express.Router();

import {
  getAllClients,
  getSingleClient,
  createClient,
  deleteClient,
  updateClient,
} from "../services/client.service.js";
import { protect } from "../middleware/auth.middleware.js";

router.route("/").get(protect, getAllClients).post(protect, createClient);
router
  .route("/:id")
  .get(protect, getSingleClient)
  .put(protect, updateClient)
  .delete(protect, deleteClient);

export default router;
