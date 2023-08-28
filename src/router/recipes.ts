import express from "express";
import * as t from "../types.js";
import * as controller from "../controller/recipes.js";

const router: t.Router = express.Router();

router.get("/", controller.getAll);
router.post("/", controller.save);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export { router };
