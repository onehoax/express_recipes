import * as t from "../types.js";
import * as service from "../service/recipes.js";
import * as myError from "../utils/error.js";

async function recipeExists(req: t.Req): Promise<t.Recipe> {
    const param: string | undefined = req.params["id"];
    const id: number = param !== undefined ? parseInt(param) : -1;
    const recipe: t.Recipe | undefined = await service.get(id);

    if (recipe === undefined) {
        const customError: myError.CustomError = new myError.CustomError(
            404,
            `RECIPE WITH ID ${id} NOT FOUND IN ${req.method}`
        );

        throw customError;
    } else {
        return recipe;
    }
}

async function getAll(req: t.Req, res: t.Res, next: t.Next): Promise<void> {
    try {
        const data: t.Recipe[] = await service.getAll();
        // console.log(data);

        res.json(data);
    } catch (error: unknown) {
        const customError: myError.CustomError = new myError.CustomError(
            500,
            "INTERNAL SERVER ERROR!"
        );
        next(customError);
    }
}

async function save(req: t.Req, res: t.Res, next: t.Next): Promise<void> {
    console.log(res.status, next.toString);

    try {
        const newRecipe: t.Recipe = {
            id: 0,
            ...req.body
        };

        // console.log(newRecipe);

        const response: t.Recipe = await service.save(newRecipe);

        res.status(201);
        res.json(response);
    } catch (error: unknown) {
        const customError: myError.CustomError = new myError.CustomError(
            500,
            "INTERNAL SERVER ERROR!"
        );
        next(customError);
    }
}

async function get(req: t.Req, res: t.Res, next: t.Next): Promise<void> {
    console.log(req.url);
    try {
        const recipe: t.Recipe = await recipeExists(req);
        res.json(recipe);
    } catch (error: unknown) {
        next(error);
    }
}

async function update(req: t.Req, res: t.Res, next: t.Next): Promise<void> {
    try {
        const recipe: t.Recipe = await recipeExists(req);

        const updatedRecipe: t.Recipe = {
            id: 0,
            ...req.body
        };

        const response: t.Recipe = await service.update(recipe.id, updatedRecipe);

        res.json(response);
    } catch (error: unknown) {
        next(error);
    }
}

async function remove(req: t.Req, res: t.Res, next: t.Next): Promise<void> {
    try {
        const recipe: t.Recipe = await recipeExists(req);

        const response: t.Recipe | undefined = await service.remove(recipe.id);

        // res.status(204);
        res.json(response);
    } catch (error: unknown) {
        next(error);
    }
}

export { getAll, get, save, update, remove };
