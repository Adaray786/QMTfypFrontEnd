import { Request, Response } from "express";
import axios from "axios";

export class SurahDetailsController {
    public static async getSurahDetails(req: Request, res: Response): Promise<void> {
        const surahId = req.params.id;
        const userId = req.session.user?.userId;

        try {
            const surahResponse = await axios.get(process.env.BACK_URL + `/api/surahs/${surahId}`);

            const ayahResponse = await axios.get(process.env.BACK_URL + `/api/ayahs/surah/${surahId}`);

            let memorizedAyahs: number[] = [];

            if (userId) {
                // Fetch user's memorized Ayahs
                const ayahProgressResponse = await axios.get(process.env.BACK_URL + `/api/ayahProgress/${userId}/surah/${surahId}`);

                // Ensure data is an array before filtering
                const progressData = Array.isArray(ayahProgressResponse.data) ? ayahProgressResponse.data : [];

                memorizedAyahs = progressData
                    .filter((progress: any) => progress.memorized)
                    .map((progress: any) => progress.ayahId);
            }

            res.render("surah", { 
                surah: surahResponse.data, 
                ayahs: ayahResponse.data, 
                memorizedAyahs,
                user: req.session.user 
            });
        } catch (e) {
            console.error("Failed to fetch Surah or Ayahs:", e);
            res.render("error", { message: "Failed to fetch Surah details", user: req.session.user });

        }
    }
}