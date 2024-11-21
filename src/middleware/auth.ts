import type { NextFunction, Request, Response } from "express";

export function login (req: Request, res: Response, next: NextFunction) {
    if (req.session.token) {
        next();
    } else {
        res.redirect('/login');
    }
}

export function role(roleRequired:string){
    return function (req:Request, res:Response, next:NextFunction){
        if (req.session && (req.session.user?.role.role_name == 'Admin' || req.session.user?.role.role_name === roleRequired)) {
            return next();
        }
        if (req.session.user) {
            res.locals.errorMessage = `You are not authorized to view this page.`;
        } else {
            res.locals.errorMessage = `You must be logged in to view this page.`;
        }
        res.render('forbidden', {user: req.session.user});
    }
}

export const user = (req:Request, res:Response, next:NextFunction) => {
    if(req.session && req.session.user){
        res.locals.user = req.session.user;
    }
    next();
}