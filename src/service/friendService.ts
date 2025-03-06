import axios from "axios";

export class FriendService {

    // ✅ Get Friend List
    static async getFriends(token: string) {
        const response = await axios.get(process.env.BACK_URL + `/api/friends/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    // ✅ Get Pending Friend Requests
    static async getFriendRequests(token: string) {
        const response = await axios.get(process.env.BACK_URL + `/api/friends/requests`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    // ✅ Send a Friend Request
    static async sendFriendRequest(token: string, receiverId: number) {
        await axios.post(process.env.BACK_URL +  `/api/friends/${receiverId}/send-request`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    // ✅ Accept Friend Request
    static async acceptFriendRequest(token: string, requestId: number) {
        await axios.post(process.env.BACK_URL +  `/api/friends/${requestId}/accept`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    // ✅ Reject Friend Request
    static async rejectFriendRequest(token: string, requestId: number) {
        await axios.post(process.env.BACK_URL +  `/api/friends/${requestId}/reject`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    // ✅ Remove Friend
    static async removeFriend(token: string, friendId: number) {
        await axios.delete(process.env.BACK_URL + `/api/friends/${friendId}/remove`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    // ✅ Search for Users (Excluding Friends)
    static async searchUsers(token: string, query: string) {
        const response = await axios.get(process.env.BACK_URL + `/api/users/search`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { query }
        });
        return response.data;
    }
}
