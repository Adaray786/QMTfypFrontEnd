import { Request, Response } from "express";
import axios from "axios";

export class SurahDetailsController {
    public static async getSurahDetails(req: Request, res: Response): Promise<void> {
        const surahId = req.params.id;
        const userId = req.session.user?.userId;
        const token = req.session.token;

        try {
            const surahResponse = await axios.get(process.env.BACK_URL + `/api/surahs/${surahId}`);
            const ayahResponse = await axios.get(process.env.BACK_URL + `/api/ayahs/surah/${surahId}`);
            const scoreResponse = await axios.get(process.env.BACK_URL + `/api/scores/userScore`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            let memorizedAyahs: number[] = [];
            let memorizedSurahs: number[] = [];
            let userScore = scoreResponse.data;

            if (userId) {
                // Fetch user's memorized Ayahs
                const ayahProgressResponse = await axios.get(process.env.BACK_URL + `/api/ayahProgress/${userId}/surah/${surahId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Fetch user's memorized Surahs
                const surahProgressResponse = await axios.get(process.env.BACK_URL + `/api/surahProgress/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Ensure data is an array before filtering
                const ayahProgressData = Array.isArray(ayahProgressResponse.data) ? ayahProgressResponse.data : [];
                const surahProgressData = Array.isArray(surahProgressResponse.data) ? surahProgressResponse.data : [];

                memorizedAyahs = ayahProgressData
                    .filter((progress: any) => progress.memorized)
                    .map((progress: any) => progress.ayahId);

                memorizedSurahs = surahProgressData
                    .filter((progress: any) => progress.memorized)
                    .map((progress: any) => progress.surahId);
            }

            res.render("surah", { 
                surah: surahResponse.data, 
                ayahs: ayahResponse.data, 
                memorizedAyahs,
                memorizedSurahs,
                user: req.session.user,
                userScore
            });
        } catch (e) {
            console.error("Failed to fetch Surah or Ayahs:", e);
            res.render("error", { 
                message: "Failed to fetch Surah details", 
                user: req.session.user,
                userScore: "Error loading score"
            });
        }
    }
}