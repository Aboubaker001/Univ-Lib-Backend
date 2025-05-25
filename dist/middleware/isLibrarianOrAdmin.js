// middleware/isLibrarianOrAdmin.js

import { verifyJWT } from "../utils/verifyJWT.js";
import prisma from "../services/db/prismaClient.js";
import HttpExeception from "../utils/HttpExeception.js";
import Exceptions from "../utils/Exceptions.js";

const isLibrarianOrAdmin = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        throw new HttpExeception("Unauthorized", 401, Exceptions.UNAUTHERIZED);
    }

    const payload = verifyJWT(token);
    if (!payload) {
        throw new HttpExeception("Unauthorized", 401, Exceptions.UNAUTHERIZED);
    }

    const user = await prisma.user.findUnique({
        where: {
            id: payload.id,
        },
    });

    if (user && (user.role === "LIBRARIAN" || user.role === "ADMIN")) {
        req.user = user; // Inject user into req
        next();
    } else {
        throw new HttpExeception("Unauthorized", 401, Exceptions.UNAUTHERIZED);
    }
};

export default isLibrarianOrAdmin;