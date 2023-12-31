import express from "express";
import * as t from "./types.js";
import { router } from "./router/recipes.js";
import { router as userRouter } from "./router/user.js";
import cors from "cors";
import { handleError } from "./utils/error.js";
import * as auth from "./middleware/auth.js";

const app: t.App = express();

app.use(cors());

app.use((req: t.Req, res: t.Res, next: t.Next): void => {
    let info: t.ReqInfo;
    if (req !== undefined) {
        info = req;
        console.log(
            `New request to: ${info.method} 
            ${info.path} at ${new Date().toISOString()}`
        );
    }

    if (res !== undefined) console.log(res.status);

    if (next !== undefined) next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(auth.initialize());

const recipesPath: string = "/api/v1/recipes";
const usersPath: string = "/api/v1/users";

app.get("/", (req: t.Req, res: t.Res) => {
    console.log(req.url);
    res.redirect(recipesPath);
});

app.use(recipesPath, router);
app.use(usersPath, userRouter);

app.use(handleError);

const port: string | number = process.env["PORT"] || 8080;

app.listen(port, (): void => {
    console.log(`Server is up on port ${port}`);
});
