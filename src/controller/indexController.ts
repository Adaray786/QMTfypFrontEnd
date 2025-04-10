import type { Request, Response } from "express";
import axios from "axios";

interface ScoreEntry {
    username: string;
    score: number;
    isCurrentUser: boolean;
}

interface Friend {
    friendId: number;
    friendName: string;
}

export namespace Index {
    
    export async function getIndex(req: Request, res: Response): Promise<void> {
        try {
            const token = req.session.token;
            let userScore = 0; // Default score
            let surahProgress = [];
            let leaderboardEntries: ScoreEntry[] = [];

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

                // Fetch friends' scores
                const friendsScoresResponse = await axios.get(process.env.BACK_URL + `/api/scores/friends`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Fetch friends' names
                const friendsResponse = await axios.get(process.env.BACK_URL + `/api/friends/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const friendsMap = new Map(friendsResponse.data.map((friend: Friend) => [friend.friendId.toString(), friend.friendName.split('@')[0]]));
                
                // Transform the scores data into an array of entries
                const scoresData = friendsScoresResponse.data;
                leaderboardEntries = Object.entries(scoresData)
                    .map(([userId, score]) => {
                        const friendName = friendsMap.get(userId);
                        return {
                            username: typeof friendName === 'string' ? friendName : `User${userId}`,
                            score: score as number,
                            isCurrentUser: false
                        };
                    });

                // Add current user's score
                if (req.session.user?.userId) {
                    leaderboardEntries.push({
                        username: req.session.user.userId.toString(),
                        score: userScore,
                        isCurrentUser: true
                    });
                }

                // Sort by score in descending order
                leaderboardEntries.sort((a, b) => b.score - a.score);
            }

            res.render("index", { 
                user: req.session.user, 
                userScore,
                surahProgress,
                leaderboardEntries
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.render("index", { 
                user: req.session.user, 
                userScore: "Error loading score",
                surahProgress: [],
                leaderboardEntries: []
            });
        }
    }
}