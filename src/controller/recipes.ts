import * as t from "../types.js";
import * as service from "../service/recipes.js";

async function getAll(req: t.Req, res: t.Res, next: t.Next): Promise<void> {
    try {
        const data: t.Recipe[] = await service.getAll();
        // console.log(data);

        console.log(req.url);

        res.json(data);
    } catch (error: unknown) {
        next(error);
    }
}

async function get(req: t.Req, res: t.Res, next: t.Next): Promise<void> {
    try {
        const param: string | undefined = req.params["id"];
        const id: number = param !== undefined ? parseInt(param) : -1;
        const recipe: t.Recipe | undefined = await service.get(id);

        if (recipe === undefined) {
            res.statusCode = 404;
            throw new Error("Recipe not found");
        }

        res.json(recipe);
    } catch (error: unknown) {
        next(error);
    }
}

async function update(req: t.Req, res: t.Res, next: t.Next): Promise<void> {
    try {
        const param: string | undefined = req.params["id"];
        const id: number = param !== undefined ? parseInt(param) : -1;
        const recipe: t.Recipe | undefined = await service.get(id);

        if (recipe === undefined) {
            res.statusCode = 404;
            throw new Error("Recipe not found");
        }

        const updatedRecipe: t.Recipe = {
            id: 0,
            ...req.body
        };

        const response: t.Recipe = await service.update(id, updatedRecipe);

        res.json(response);
    } catch (error: unknown) {
        next(error);
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
        next(error);
    }
}

async function remove(req: t.Req, res: t.Res, next: t.Next): Promise<void> {
    try {
        const param: string | undefined = req.params["id"];
        const id: number = param !== undefined ? parseInt(param) : -1;
        const recipe: t.Recipe | undefined = await service.get(id);

        if (recipe === undefined) {
            res.statusCode = 404;
            throw new Error("Recipe not found");
        }

        const response: t.Recipe | undefined = await service.remove(id);

        // res.status(204);
        res.json(response);
    } catch (error: unknown) {
        next(error);
    }
}

export { getAll, save, get, update, remove };
