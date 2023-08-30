import * as t from "../types.js";
import * as myError from "../utils/error.js";
import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import * as fs from "node:fs/promises";
import jwt from "jsonwebtoken";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const JWT_SECRET = process.env["JWT_SECRET"] === undefined ? "" : process.env["JWT_SECRET"];

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
const userFilePath: string = path.join(__dirname, "../../db/user.json");

async function find(id: number, email: string): Promise<t.User | undefined> {
    const data: string = await fs.readFile(userFilePath, "utf-8");
    const users: t.User[] = JSON.parse(data);
    const user: t.User | undefined = users.find((u) => u.id === id || u.email === email);

    return user;
}

async function create(authUser: t.User): Promise<t.Token> {
    const data: string = await fs.readFile(userFilePath, "utf-8");
    const users: t.User[] = JSON.parse(data);

    const newUser: t.User = {
        id: users.length + 1,
        name: authUser.name,
        email: authUser.email,
        password: await bcrypt.hash(authUser.password, 10)
    };

    const token: string = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: 24 * 60 * 60 });

    users.push(newUser);

    await fs.writeFile(userFilePath, JSON.stringify(users));

    return { token };
}

async function authenticate(authUser: t.User): Promise<t.Token> {
    const user: t.User | undefined = await find(-1, authUser.email);

    if (user === undefined) {
        const msg: string = `AUTH: USER WITH ID ${authUser.id} DOES NOT EXISTS`;
        throw new myError.CustomError(404, msg);
    }

    const isPasswordValid: boolean = await bcrypt.compare(authUser.password, user.password);

    if (isPasswordValid) {
        const token: string = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 24 * 60 * 60 });
        return { token };
    } else {
        const msg: string = "AUTH: INCORRECT PASSWORD";
        throw new myError.CustomError(404, msg);
    }
}

// const user1: t.User = {
//     id: 0,
//     name: "Monica",
//     email: "monica@mail.com",
//     password: "somepassword"
// };

// const user2: t.User = {
//     id: 0,
//     name: "Carlos",
//     email: "carlos@mail.com",
//     password: "mypassforeverything"
// };

// create(user2).then((res) => console.log(res));
// find(-1, user1.email).then((res) => console.log(res));
// authenticate(user1).then((res) => console.log(res));

export { JWT_SECRET, find, create, authenticate };
