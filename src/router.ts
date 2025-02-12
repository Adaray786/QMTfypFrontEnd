import express from "express";
import { LoginController } from "./controller/LoginController";
import { RegisterController } from "./controller/RegisterController";
import { Index } from "./controller/indexController";
import { SurahController } from "./controller/SurahController";
import { SurahDetailsController } from "./controller/SurahDetailsController";
import { MemoriseController } from "./controller/MemoriseController";

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

router.get('/logout', role("User"), LoginController.logOut)

export default router