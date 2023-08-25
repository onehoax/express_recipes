import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectoryPath = path.join(__dirname, "./public");

app.use((req, res, next) => {
    const { method, path } = req;
    console.log(
        `New request to: ${method} ${path} at ${new Date().toISOString()}`
    );
    console.log(res.status);
    next();
});

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
    console.log(req.url);
    res.send("Hello from the server!");
});

app.get("/:name", (req, res) => {
    console.log(req.url);
    res.send(`Welcome to Express Recipes, ${req.params.name}!`);
});

const port: string | number = process.env["PORT"] || 8080;

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
