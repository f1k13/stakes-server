import { Response } from "express";
import { sportService } from "../../services/sports/sportsService";

export const addedSports = async (res: Response) => {
  try {
    const sports = await sportService.generateSports();
    res.status(201).json(sports);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
