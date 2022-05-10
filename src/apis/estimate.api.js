import express from "express";
const router = express.Router();

import {
  getAllEstimates,
  getSingleEstimate,
  createEstimate,
  updateEstimate,
  deleteEstimate,
} from "../services/estimate.service";
import { admin, protect } from "../middleware/auth.middleware";

router.route("").get(protect, getAllEstimates).post(protect, createEstimate);
router
  .route("/:id")
  .get(protect, getSingleEstimate)
  .put(protect, updateEstimate)
  .delete(protect, deleteEstimate);

export default router;
