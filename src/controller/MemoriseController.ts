import { Request, Response } from "express";
import axios from "axios";

export class MemoriseController {
    public static async getMemorisePage(req: Request, res: Response): Promise<void> {
        const surahId = req.params.id;
        const startAyah = parseInt(req.query.startAyah as string) || 1;
        const token = req.session.token;

        try {
            // Fetch Ayahs for the Surah
            const surahResponse = await axios.get(process.env.BACK_URL + `/api/surahs/${surahId}`);
            const response = await axios.get(process.env.BACK_URL + `/api/ayahs/surah/${surahId}`);
            const scoreResponse = await axios.get(process.env.BACK_URL + `/api/scores/userScore`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userScore = scoreResponse.data;

            // Get all ayahs and find the starting index
            const ayahs = response.data;
            const startIndex = ayahs.findIndex((ayah: any) => ayah.ayahNumber === startAyah);
            
            // If startAyah is not found, start from the beginning
            const adjustedStartIndex = startIndex >= 0 ? startIndex : 0;

            res.render("memorise", { 
                token,
                surahId, 
                surahName: surahResponse.data.surahNameEnglish, 
                ayahs: ayahs.slice(adjustedStartIndex), // Only pass ayahs from the starting point
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