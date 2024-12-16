import { Request, Response } from "express";

import jwt from "jsonwebtoken";

const UserController = {
    getAllUsers : async (req: Request, res: Response) => {
        res.status(201).send("Test");
    }
}

export default UserController;