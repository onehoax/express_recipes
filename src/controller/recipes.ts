import * as t from "../types.js";
import * as service from "../service/recipes.js";

const getAll: t.PromiseVoid = async (
    req: t.Req,
    res: t.Res,
    next: t.Next
): Promise<void> => {
    try {
        const data: string = await service.getAll();
        // console.log(data);

        if (req !== undefined) console.log(req.url);
        else throw new Error("Req is undefined");

        if (res !== undefined) res.json(data);
        else throw new Error("Req is undefined");
    } catch (error: unknown) {
        console.error(error);
        if (next !== undefined) next(error);
    }
};

// getAll();

export { getAll };
