import * as t from "../types.js";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
const recipesFilePath: string = path.join(__dirname, "../../db/recipes.json");

const getAll: t.PromiseString = async (): Promise<string> => {
    try {
        const data: string = await fs.readFile(recipesFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error: unknown) {
        return `Error: ${error}`;
    }
};

// getAll().then((result) => console.log(result));

export { getAll };
