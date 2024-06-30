import express from "express";
import userRoutes from "./user/userRoutes";
import balanceRoutes from "./balance/balanceRoutes";
const router = express.Router();

router.use("/users", userRoutes);

router.use("/balance", balanceRoutes);

export default router;
