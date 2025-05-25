import { verifyJWT } from "../utils/verifyJWT.js";
import prisma from "../services/db/prismaClient.js";
import HttpExeception from "../utils/HttpExeception.js";
import Exceptions from "../utils/Exceptions.js";

const isAuthenticated = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        console.log('No token provided in Authorization header');
        throw new HttpExeception("Unauthorized: No token provided", 401, Exceptions.UNAUTHERIZED);
    }

    // Remove 'Bearer ' prefix if present
    if (token.startsWith('Bearer ')) {
        token = token.slice(7);
    } else {
        console.log('Invalid Authorization header format:', token);
    }

    console.log('Token being verified:', token);
    const payload = verifyJWT(token);
    if (!payload) {
        console.log('Token verification failed');
        throw new HttpExeception("Unauthorized: Invalid token", 401, Exceptions.UNAUTHERIZED);
    }

    const user = await prisma.user.findUnique({
        where: {
            id: payload.id,
        },
    });

    if (user) {
        req.user = user; // Inject user into req
        next();
    } else {
        console.log('User not found for ID:', payload.id);
        throw new HttpExeception("Unauthorized: User not found", 401, Exceptions.UNAUTHERIZED);
    }
};

export default isAuthenticated;