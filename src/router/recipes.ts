import express from "express";
import * as t from "../types.js";
import * as controller from "../controller/recipes.js";

const router: t.Router = express.Router();

router.get("/", controller.getAll);
router.post("/", controller.save);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

// We can use router.route() to chain route handlers that share the same route path
// Route GET and POST HTTP requests for "/"
// router.route("/").get(controller.getAll).post(controller.save);
// Route GET, PUT, and DELETE HTTP requests for "api/v1/recipes/:id"
// router.route("/:id").get(controller.get).put(controller.update).delete(controller.remove);

export { router };
