import type { Request, Response } from "express";
import axios from "axios";

export namespace Index {
    
    export async function getIndex(req: Request, res: Response): Promise<void> {
        try {
            const token = req.session.token;
            let userScore = 0; // Default score
            let surahProgress = [];

            if (token) {
                // Fetch user score
                const scoreResponse = await axios.get(process.env.BACK_URL + `/api/scores/userScore`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                userScore = scoreResponse.data;

                // Fetch surah progress
                const progressResponse = await axios.get(process.env.BACK_URL + `/api/surahProgress/${req.session.user?.userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                surahProgress = progressResponse.data;
            }

            res.render("index", { 
                user: req.session.user, 
                userScore,
                surahProgress
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.render("index", { 
                user: req.session.user, 
                userScore: "Error loading score",
                surahProgress: []
            });
        }
    }
}