import express from "express";
import { LoginController } from "./controller/LoginController";
import { RegisterController } from "./controller/RegisterController";
import { Index } from "./controller/indexController";
import { SurahController } from "./controller/SurahController";
import { SurahDetailsController } from "./controller/SurahDetailsController";
import { MemorizeController } from "./controller/MemoriseController";

import { role, login } from "./middleware/auth";

const router = express.Router();

router.get('/login', LoginController.get);
router.post('/login', LoginController.post);
router.get('/register', RegisterController.get)
router.post('/register', RegisterController.post)
router.get('/index', Index.getIndex)
router.get('/viewSurahs', SurahController.getSurahs);
router.get('/surah/:id', SurahDetailsController.getSurahDetails);
router.get('/memorize/:id', MemorizeController.getMemorizePage);

router.get('/logout', role("User"), LoginController.logOut)

export default router