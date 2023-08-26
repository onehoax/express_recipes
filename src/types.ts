import * as express from "express";

type App = express.Express;
type Router = express.Router;
type Req = express.Request | undefined;
type Res = express.Response | undefined;
type Next = express.NextFunction | undefined;

type ReqInfo = {
    method: string;
    path: string;
};

type PromiseString = () => Promise<string>;
type PromiseVoid = (req?: Req, res?: Res, next?: Next) => Promise<void>;

export { App, Router, Req, Res, Next, ReqInfo, PromiseString, PromiseVoid };
