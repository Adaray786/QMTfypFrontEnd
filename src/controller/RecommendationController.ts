import { Request, Response } from "express";
import axios from "axios";

export class RecommendationController {
    public static async getRecommendations(req: Request, res: Response): Promise<void> {
        const userId = req.session.user?.userId;
        const token = req.session.token;

        try {
            // Fetch both revision and new surah recommendations
            const [revisionResponse, newSurahResponse] = await Promise.all([
                axios.get(process.env.BACK_URL + `/api/recommendations/revision`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get(process.env.BACK_URL + `/api/recommendations/new`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            const revisionRecommendations = revisionResponse.data;
            const newSurahRecommendations = newSurahResponse.data;

            res.render("recommendations", {
                revisionRecommendations,
                newSurahRecommendations,
                user: req.session.user,
                BACKURL: process.env.BACK_URL,
                token
            });
        } catch (e) {
            console.error("Failed to fetch recommendations:", e);
            res.render("error", {
                message: "Failed to fetch recommendations",
                user: req.session.user
            });
        }
    }

    public static async markAsRevised(req: Request, res: Response): Promise<void> {
        const userId = req.session.user?.userId;
        const token = req.session.token;
        const surahId = req.params.surahId;

        try {
            await axios.post(
                process.env.BACK_URL + `/api/recommendations/${userId}/mark-revised/${surahId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            res.json({ success: true });
        } catch (e) {
            console.error("Failed to mark surah as revised:", e);
            res.status(500).json({ error: "Failed to mark surah as revised" });
        }
    }
} 