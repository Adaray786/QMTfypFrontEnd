import { Request, Response } from "express";
import axios from "axios";

export class SurahController {
    public static async getSurahs(req: Request, res: Response): Promise<void> {
        try {
            const response = await axios.get(process.env.BACK_URL + `/api/surahs`);
            res.render("viewSurahs.html", { surahs: response.data, user: req.session.user });
        } catch (e) {
            console.error(e)
            res.render("error", { message: "Failed to fetch Surahs", user: req.session.user });
        }
    }
}