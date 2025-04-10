import type { Request, Response } from "express";

export class SendChallengeController {
    public static getSendChallenge(req: Request, res: Response): void {
        res.render('sendChallenge', {
            user: req.session.user,
            BACKURL: process.env.BACK_URL,
            token: req.session.token
        });
    }
} 