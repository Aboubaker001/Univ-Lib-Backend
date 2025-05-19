// src/controllers/user/newUser.js
import validate from "../../utils/validation.js";
import { newUserSchema } from "../../validation/user.js";
import prisma from "../../services/db/prismaClient.js";
import { signJwt } from "../../utils/signJwt.js";
import sendVerificaionEmail from "../../services/email/sendVerificationEmail.js";
import hasher from "../../utils/hasher.js";
import { APP_URI } from "../../config/env.js";
import HttpExeception from "../../utils/HttpExeception.js";
import Exceptions from "../../utils/Exceptions.js";

const newUser = async (req, res) => {
  const validatedData = validate(req.body, newUserSchema);
  if (validatedData.errors) {
    throw new HttpExeception("Validation error", 422, Exceptions.INVALID_DATA, validatedData.errors);
  }
  const user = await prisma.user.findUnique({
    where: {
      email: validatedData.email
    }
  });
  if (user) {
    throw new HttpExeception("Email already in use", 403, Exceptions.ALREADY_EXIST);
  }
  const newUser = await prisma.user.create({
    data: {
      ...validatedData,
      password: await hasher(validatedData.password),
    },
    select: {
      id: true
    }
  });
  const token = signJwt({ email: validatedData.email }, 60 * 60 * 24);
  const isSend = await sendVerificaionEmail(validatedData.email, `${APP_URI}/api/user/verify?token=${token}`);
  setTimeout(async () => {
    const user = await prisma.user.findUnique({
      where: {
        id: newUser.id,
        isVerified: false,
      }
    });
    if (user) {
      await prisma.user.delete({
        where: {
          id: newUser.id,
        }
      });
    }
  }, 1000 * 60 * 60 * 24);
  if (isSend) {
    res.status(200).json({
      ok: true,
      msg: "User created successfully, check your email to verify your account"
    });
  } else {
    throw new HttpExeception("Failed to send email", 500, Exceptions.INTERNAL_ERROR);
  }
};

export default newUser;