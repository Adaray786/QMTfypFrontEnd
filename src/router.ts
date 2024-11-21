import express from "express";
import { LoginController } from "./controller/LoginController";
import { RegisterController } from "./controller/RegisterController";
import { Index } from "./controller/indexController";

import { role, login } from "./middleware/auth";

const router = express.Router();

router.get('/login', LoginController.get);
router.post('/login', LoginController.post);
router.get('/register', RegisterController.get)
router.post('/register', RegisterController.post)
router.get('/index', Index.getIndex)

router.get('/logout', role("User"), LoginController.logOut)

export default router