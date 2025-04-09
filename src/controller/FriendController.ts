import { Request, Response } from "express";
import { FriendService } from "../service/friendService";
import axios from "axios";

export class FriendController {

    // ✅ Get Friend List
    public static async getFriends(req: Request, res: Response) {
        try {
            const token = req.session.token;
            if (!token) return res.redirect("/login");

            const friends = await FriendService.getFriends(token);
            const scoreResponse = await axios.get(process.env.BACK_URL + `/api/scores/userScore`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userScore = scoreResponse.data;

            res.render("friends", { 
                user: req.session.user, 
                friends,
                userScore 
            });
        } catch (error) {
            console.error("Error fetching friends:", error);
            res.status(500).render("error", { 
                message: "Error fetching friends",
                user: req.session.user,
                userScore: "Error loading score"
            });
        }
    }

    // ✅ Get Pending Friend Requests
    public static async getFriendRequests(req: Request, res: Response) {
        try {
            const token = req.session.token;
            if (!token) return res.redirect("/login");

            const friendRequests = await FriendService.getFriendRequests(token);
            const scoreResponse = await axios.get(process.env.BACK_URL + `/api/scores/userScore`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userScore = scoreResponse.data;

            res.render("friendRequests", { 
                user: req.session.user, 
                friendRequests,
                userScore 
            });
        } catch (error) {
            console.error("Error fetching friend requests:", error);
            res.status(500).render("error", { 
                message: "Error fetching friend requests",
                user: req.session.user,
                userScore: "Error loading score"
            });
        }
    }

    // ✅ Send Friend Request
    public static async sendFriendRequest(req: Request, res: Response) {
        try {
            const token = req.session.token;
            if (!token) return res.redirect("/login");

            const { receiverId } = req.body;
            await FriendService.sendFriendRequest(token, receiverId);
            res.redirect("/friends");
        } catch (error) {
            console.error("Error sending friend request:", error);
            res.status(500).render("error", { 
                message: "Error sending friend request",
                user: req.session.user,
                userScore: "Error loading score"
            });
        }
    }

    // ✅ Accept Friend Request
    public static async acceptFriendRequest(req: Request, res: Response) {
        try {
            const token = req.session.token;
            if (!token) return res.redirect("/login");

            const { requestId } = req.body;
            await FriendService.acceptFriendRequest(token, requestId);
            res.redirect("/friends");
        } catch (error) {
            console.error("Error accepting friend request:", error);
            res.status(500).render("error", { 
                message: "Error accepting friend request",
                user: req.session.user,
                userScore: "Error loading score"
            });
        }
    }

    // ✅ Reject Friend Request
    public static async rejectFriendRequest(req: Request, res: Response) {
        try {
            const token = req.session.token;
            if (!token) return res.redirect("/login");

            const { requestId } = req.body;
            await FriendService.rejectFriendRequest(token, requestId);
            res.redirect("/friends");
        } catch (error) {
            console.error("Error rejecting friend request:", error);
            res.status(500).render("error", { 
                message: "Error rejecting friend request",
                user: req.session.user,
                userScore: "Error loading score"
            });
        }
    }

    // ✅ Remove Friend
    public static async removeFriend(req: Request, res: Response) {
        try {
            const token = req.session.token;
            if (!token) return res.redirect("/login");

            const { friendId } = req.body;
            await FriendService.removeFriend(token, friendId);
            res.redirect("/friends");
        } catch (error) {
            console.error("Error removing friend:", error);
            res.status(500).render("error", { 
                message: "Error removing friend",
                user: req.session.user,
                userScore: "Error loading score"
            });
        }
    }

    // ✅ Search for Users (Now on `/friends/find/search`)
    public static async searchUsers(req: Request, res: Response) {
        try {
            const token = req.session.token;
            if (!token) return res.redirect("/login");

            const { query } = req.query;
            const results = await FriendService.searchUsers(token, query as string);
            const scoreResponse = await axios.get(process.env.BACK_URL + `/api/scores/userScore`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userScore = scoreResponse.data;

            res.render("findFriends", { 
                user: req.session.user, 
                results,
                userScore 
            });
        } catch (error) {
            console.error("Error searching users:", error);
            res.status(500).render("error", { 
                message: "Error searching users",
                user: req.session.user,
                userScore: "Error loading score"
            });
        }
    }
}
