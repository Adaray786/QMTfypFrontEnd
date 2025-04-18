import { Request, Response } from "express";
import axios from "axios";

export class SurahController {
    public static async getSurahs(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.session.user?.userId;
            const token = req.session.token;

            if (!userId) {
                res.redirect("/login");
                return;
            }

             // Fetch Surahs and User Progress
             const surahsResponse = await axios.get(process.env.BACK_URL + `/api/surahs`);
             const progressResponse = await axios.get(process.env.BACK_URL + `/api/surahProgress/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
             });
             const scoreResponse = await axios.get(process.env.BACK_URL + `/api/scores/userScore`, {
                headers: { Authorization: `Bearer ${token}` }
             });

            const surahs = surahsResponse.data;
            const progressData = progressResponse.data;
            const userScore = scoreResponse.data;

            // Convert progress data into an array of memorized Surah IDs
            const memorizedSurahs = progressData
                .filter((progress: any) => progress.memorized)
                .map((progress: any) => progress.surahId); // Convert Set → Array

            // Render the page with Surahs and progress
            res.render("surahs.html", { 
                surahs, 
                memorizedSurahs, 
                user: req.session.user,
                userScore 
            });
        } catch (e) {
            console.error("Error fetching Surahs or progress:", e);
            res.render("error", { 
                message: "Failed to fetch Surahs", 
                user: req.session.user,
                userScore: "Error loading score"
            });
        }
    }
}
