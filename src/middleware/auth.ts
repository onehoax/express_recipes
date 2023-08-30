import * as t from "../types.js";
import * as myError from "../utils/error.js";
import passport from "passport";
import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import * as userAuth from "../service/user.js";

const strategy = new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: userAuth.JWT_SECRET
    },
    async (jwtPayload, done: VerifiedCallback) => {
        try {
            const user: t.User | undefined = await userAuth.find(parseInt(jwtPayload.id), "");

            if (user === undefined) {
                const msg: string = `IN STRATEGY: USER WITH ID ${jwtPayload.id} NOT FOUND`;
                throw new myError.CustomError(404, msg);
            }

            done(null, user);
        } catch (error: unknown) {
            done(error);
        }
    }
);

passport.use(strategy);

function initialize() {
    return passport.initialize();
}

function authenticate() {
    return passport.authenticate("jwt", { session: false });
}

export { initialize, authenticate };
