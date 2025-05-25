import { Router } from "express";
import getUsersList from "../controllers/user/getUsersList.js";
import newUser from "../controllers/user/newUser.js";
import login from "../controllers/user/login.js";
import { errorHandler } from "../middleware/errorHandler.js";
import verifyUser from "../controllers/user/verifyUser.js";
import jwt from "jsonwebtoken";
import isAuthenticated from '../middleware/isAuthenticated.js';


const userRouter = Router();

userRouter.post("/register", errorHandler(newUser));
userRouter.post("/login", errorHandler(login));
userRouter.get("/verify", errorHandler(verifyUser));
userRouter.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

userRouter.get('/me', isAuthenticated, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    }
  });
  res.json({ ok: true, data: user });
});


userRouter.get("/refresh", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }
  try {
    const payload = jwt.verify(token, process.env.JWT);
    const newToken = jwt.sign({ id: payload.id, role: payload.role }, process.env.JWT, { expiresIn: '1h' });
    res.cookie("token", newToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});


// Public routes
userRouter.get('/', errorHandler(getUsersList));

export default userRouter;