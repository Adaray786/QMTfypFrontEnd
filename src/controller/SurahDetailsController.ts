import { Request, Response } from "express";
import axios from "axios";

export class SurahDetailsController {
    public static async getSurahDetails(req: Request, res: Response): Promise<void> {
        const surahId = req.params.id;

        try {
            const surahResponse = await axios.get(process.env.BACK_URL + `/api/surahs/${surahId}`);

            const ayahResponse = await axios.get(process.env.BACK_URL + `/api/ayahs/surah/${surahId}`);

            res.render("surah", { 
                surah: surahResponse.data, 
                ayahs: ayahResponse.data, 
                user: req.session.user 
            });
        } catch (e) {
            console.error("Failed to fetch Surah or Ayahs:", e);
            res.render("error", { message: "Failed to fetch Surah details", user: req.session.user });

        }
    }
}