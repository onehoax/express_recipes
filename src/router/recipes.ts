import express from "express";
import * as t from "../types.js";
import * as controller from "../controller/recipes.js";

const router: t.Router = express.Router();

router.get("/", controller.getAll);

export { router };
