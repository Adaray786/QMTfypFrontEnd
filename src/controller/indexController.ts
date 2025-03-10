import type { Request, Response } from "express";
import axios from "axios";

export namespace Index {
    
    export async function getIndex(req: Request, res: Response): Promise<void> {
        try {
            const token = req.session.token;
            let userScore = 0; // Default score

            if (token) {
                const response = await axios.get(process.env.BACK_URL + `/api/scores/userScore`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                userScore = response.data;
            }

            res.render("index", { 
                user: req.session.user, 
                userScore,
            });
        } catch (error) {
            console.error("Error fetching user score:", error);
            res.render("index", { user: req.session.user, userScore: "Error loading score" });
        }
    }
}