import * as t from "../types.js";
import * as myError from "../utils/error.js";
import * as userAuth from "../service/user.js";

async function handleSignup(req: t.Req, res: t.Res, next: t.Next): Promise<void> {
    try {
        const reqUser: t.User = req.body;
        const user: t.User | undefined = await userAuth.find(-1, reqUser.email);

        if (user !== undefined) {
            const msg: string = `HANDLESIGNUP: USER WITH ID ${user.id} ALREADY EXISTS`;
            throw new myError.CustomError(404, msg);
        }

        const token: t.Token = await userAuth.create(reqUser);

        res.json(token);
    } catch (error: unknown) {
        next(error);
    }
}

async function handleLogin(req: t.Req, res: t.Res, next: t.Next): Promise<void> {
    try {
        const reqUser: t.User = req.body;
        const user: t.User | undefined = await userAuth.find(-1, reqUser.email);

        if (user === undefined) {
            const msg: string = `HANDLELOGIN: USER WITH ID ${reqUser.id} NOT FOUND`;
            throw new myError.CustomError(404, msg);
        }

        const token: t.Token = await userAuth.authenticate(reqUser);

        res.json(token);
    } catch (error: unknown) {
        next(error);
    }
}

export { handleSignup, handleLogin };
