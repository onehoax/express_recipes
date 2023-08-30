import * as express from "express";

type App = express.Express;
type Router = express.Router;
type Req = express.Request;
type Res = express.Response;
type Next = express.NextFunction;

type ReqInfo = {
    method: string;
    path: string;
};

type Recipe = {
    id: number;
    name: string;
    healthLabels: string[];
    cookTimeMinutes: number;
    prepTimeMinutes: number;
    ingredients: string[];
};

type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};

type Token = {
    token: string;
};

export { App, Router, Req, Res, Next, ReqInfo, Recipe, User, Token };
