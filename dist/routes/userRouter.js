import { Router } from "express";
import newUser from "../controllers/user/newUser.js";
import login from "../controllers/user/login.js";
import { errorHandler } from "../middleware/errorHandler.js";
import verifyUser from "../controllers/user/verifyUser.js";
import jwt from "jsonwebtoken";

const userRouter = Router();

userRouter.post("/register", errorHandler(newUser));
userRouter.post("/login", errorHandler(login));
userRouter.get("/verify", errorHandler(verifyUser));
userRouter.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

userRouter.get("/refresh", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
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

export default userRouter;