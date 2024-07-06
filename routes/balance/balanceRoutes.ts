import express from "express";
import {
  getBalance,
  updateBalance,
} from "../../controllers/balance/balanceController";

const router = express.Router();

router.get("/get", getBalance);

router.put("/update", updateBalance);

export default router;
