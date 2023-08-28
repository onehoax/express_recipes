import * as t from "../types.js";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
const recipesFilePath: string = path.join(__dirname, "../../db/recipes.json");

async function getAll(): Promise<t.Recipe[]> {
    try {
        const data: string = await fs.readFile(recipesFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error: unknown) {
        console.error(error);
        throw error;
    }
}

async function get(id: number): Promise<t.Recipe | undefined> {
    try {
        const recipes: t.Recipe[] = await getAll();
        const recipe: t.Recipe | undefined = recipes.find(
            (recipe) => recipe.id === id
        );
        return recipe;
    } catch (error: unknown) {
        console.error(error);
        throw error;
    }
}

async function update(id: number, updated: t.Recipe): Promise<t.Recipe> {
    try {
        updated.id = id;
        const recipes: t.Recipe[] = await getAll();
        const updatedRecipes: t.Recipe[] = recipes.map((recipe) => {
            return recipe.id === id ? updated : recipe;
        });
        await fs.writeFile(recipesFilePath, JSON.stringify(updatedRecipes));
        return updated;
    } catch (error: unknown) {
        console.error(error);
        throw error;
    }
}

async function save(recipe: t.Recipe): Promise<t.Recipe> {
    try {
        const recipes: t.Recipe[] = await getAll();
        recipe.id = recipes.length + 1;
        recipes.push(recipe);
        await fs.writeFile(recipesFilePath, JSON.stringify(recipes));
        return recipe;
    } catch (error: unknown) {
        console.error(error);
        throw error;
    }
}

async function remove(id: number): Promise<t.Recipe | undefined> {
    try {
        const recipes: t.Recipe[] = await getAll();
        const recipe: t.Recipe | undefined = await get(id);
        if (recipe !== undefined) {
            const index: number = recipes.indexOf(recipe);
            const removed: t.Recipe | undefined = recipes.splice(index, 1)[0];
            await fs.writeFile(recipesFilePath, JSON.stringify(recipes));
            return removed;
        } else {
            return undefined;
        }
    } catch (error: unknown) {
        console.error(error);
        throw error;
    }
}

export { getAll, save, get, update, remove };
