import express from "express";
import { addedSports } from "../../controllers/sports/sportsController";
const router = express.Router();

router.post("/create", addedSports);
export default router;
