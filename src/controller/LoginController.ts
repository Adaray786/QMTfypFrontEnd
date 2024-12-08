import type { Request, Response } from "express"
import { Credentials } from "../model/auth";
import { login, whoami } from "../service/authService";
import { user } from "../middleware/auth";


export class LoginController {

    public static get(req:Request, res:Response): void {
        res.render('login', req.session.user)
    }

    public static async post(req:Request, res:Response): Promise<void> {
        const data: Credentials = req.body;

        try {
            req.session.token = await login(data);
            req.session.user = await whoami(req.session.token);
            
            res.redirect('/index');
        } catch (e) {
            console.error(e);

            res.locals.errormessage = (e as Error).message;

            res.render('login', {body: req.body, user: req.session.user});
        }
    }

    public static logOut(req:Request, res:Response): void{
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
}