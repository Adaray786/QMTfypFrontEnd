import type { Request, Response } from "express";

export class ChallengeController {
    public static getChallenges(req: Request, res: Response): void {
        res.render('challenges', {
            user: req.session.user,
            BACKURL: process.env.BACK_URL,
            token: req.session.token
        });
    }
} 