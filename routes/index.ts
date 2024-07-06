import express from "express";
import userRoutes from "./user/userRoutes";
import balanceRoutes from "./balance/balanceRoutes";
import sportRoutes from "./sports/sportRoutes";
const router = express.Router();

router.use("/users", userRoutes);

router.use("/balance", balanceRoutes);

router.use("/sports", sportRoutes);

export default router;
