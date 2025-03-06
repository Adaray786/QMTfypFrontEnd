import express from "express";
import { LoginController } from "./controller/LoginController";
import { RegisterController } from "./controller/RegisterController";
import { Index } from "./controller/indexController";
import { SurahController } from "./controller/SurahController";
import { SurahDetailsController } from "./controller/SurahDetailsController";
import { MemoriseController } from "./controller/MemoriseController";
import { FriendController } from "./controller/FriendController";


import { role, login } from "./middleware/auth";

const router = express.Router();

router.get('/login', LoginController.get);
router.post('/login', LoginController.post);
router.get('/register', RegisterController.get)
router.post('/register', RegisterController.post)
router.get('/index', login, Index.getIndex)
router.get('/surahs', login, SurahController.getSurahs);
router.get('/surah/:id', login, SurahDetailsController.getSurahDetails);
router.get('/memorise/:id', login, MemoriseController.getMemorisePage);

router.get("/friends", login, FriendController.getFriends);
router.get("/requests", login, FriendController.getFriendRequests);
router.get("/find", login, (req, res) => res.render("findFriends", { user: req.session.user, results: [] }));
router.get("/find/search", login, FriendController.searchUsers);
router.post("/send", login, FriendController.sendFriendRequest);
router.post("/accept", login, FriendController.acceptFriendRequest);
router.post("/reject", login, FriendController.rejectFriendRequest);
router.post("/remove", login, FriendController.removeFriend);

router.get('/logout', LoginController.logOut)

export default router