import express from "express";
import * as t from "../types.js";
import * as controller from "../controller/user.js";

const router: t.Router = express.Router();

router.post("/signup", controller.handleSignup);
router.post("/login", controller.handleLogin);

export { router };
