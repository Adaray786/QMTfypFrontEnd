import { Request, Response } from "express";
import axios from "axios";

export class MemoriseController {
    public static async getMemorisePage(req: Request, res: Response): Promise<void> {
        const surahId = req.params.id;
        const token = req.session.token;

        try {
            // Fetch Ayahs for the Surah
            const surahResponse = await axios.get(process.env.BACK_URL + `/api/surahs/${surahId}`);
            const response = await axios.get(process.env.BACK_URL + `/api/ayahs/surah/${surahId}`);
            const scoreResponse = await axios.get(process.env.BACK_URL + `/api/scores/userScore`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userScore = scoreResponse.data;

            res.render("memorise", { 
                token,
                surahId, 
                surahName: surahResponse.data.surahNameEnglish, 
                ayahs: response.data, 
                user: req.session.user,
                userScore,
                BACKURL: process.env.BACK_URL 
            });
        } catch (e) {
            console.error("Failed to fetch Ayahs for memorisation:", e);
            res.render("error", { 
                message: "Failed to load memorisation page", 
                user: req.session.user,
                userScore: "Error loading score"
            });
        }
    }
}