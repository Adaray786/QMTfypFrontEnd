import { Request, Response } from "express";
import { FriendService } from "../service/friendService";

export class FriendController {

    // ✅ Get Friend List
    public static async getFriends(req: Request, res: Response) {
        try {
            const token = req.session.token;
            if (!token) return res.redirect("/login");

            const friends = await FriendService.getFriends(token);
            res.render("friends", { user: req.session.user, friends });
        } catch (error) {
            console.error("Error fetching friends:", error);
            res.status(500).send("Error fetching friends.");
        }
    }

    // ✅ Get Pending Friend Requests
    public static async getFriendRequests(req: Request, res: Response) {
        try {
            const token = req.session.token;
            if (!token) return res.redirect("/login");

            const friendRequests = await FriendService.getFriendRequests(token);
            res.render("friendRequests", { user: req.session.user, friendRequests });
        } catch (error) {
            console.error("Error fetching friend requests:", error);
            res.status(500).send("Error fetching friend requests.");
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
            res.status(500).send("Error sending friend request.");
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
            res.status(500).send("Error accepting friend request.");
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
            res.status(500).send("Error rejecting friend request.");
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
            res.status(500).send("Error removing friend.");
        }
    }

    // ✅ Search for Users (Now on `/friends/find/search`)
    public static async searchUsers(req: Request, res: Response) {
        try {
            const token = req.session.token;
            if (!token) return res.redirect("/login");

            const { query } = req.query;
            const results = await FriendService.searchUsers(token, query as string);

            res.render("findFriends", { user: req.session.user, results });
        } catch (error) {
            console.error("Error searching users:", error);
            res.status(500).send("Error searching users.");
        }
    }
}
