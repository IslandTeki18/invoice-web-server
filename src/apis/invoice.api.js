import express from "express";
const router = express.Router();

import {
  getAllInvoices,
  getSingleInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../services/invoice.service.js";
import { protect } from "../middleware/auth.middleware.js";

router.route("/").get(protect, getAllInvoices).post(protect, createInvoice);
router
  .route("/:id")
  .get(protect, getSingleInvoice)
  .put(protect, updateInvoice)
  .delete(protect, deleteInvoice);

export default router;
