import { Request, Response } from "express";
import axios from "axios";

export class MemorizeController {
    public static async getMemorizePage(req: Request, res: Response): Promise<void> {
        const surahId = req.params.id;

        try {
            // Fetch Ayahs for the Surah
            const response = await axios.get(process.env.BACK_URL + `/api/ayahs/surah/${surahId}`);
            res.render("memorise", { surahId, ayahs: response.data, user: req.session.user });
        } catch (e) {
            console.error("Failed to fetch Ayahs for memorization:", e);
            res.render("error", { message: "Failed to load memorization page", user: req.session.user });
        }
    }
}