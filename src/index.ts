import express from "express";
import * as t from "./types.js";
import { router } from "./router/recipes.js";

const app: t.App = express();

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

const path: string = "/api/v1/recipes";

app.get("/", (req: t.Req, res: t.Res) => {
    console.log(req.url);
    res.redirect(path);
});

app.use("/api/v1/recipes", router);

const port: string | number = process.env["PORT"] || 8080;

app.listen(port, (): void => {
    console.log(`Server is up on port ${port}`);
});
