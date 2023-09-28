import prisma from "../../db/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { sentEmail } from "../../utils/sentemail";
import { isValidPassword } from "../../validation/password";
import { IsEmailValid } from "../../validation/email";
import { IsPhoneValid } from "../../validation/phone";

export async function registerUser(req: Request, res: Response) {
  try {
    let { name, email, phone, password, blood_type, address, profile_pic } =
      req.body;

    if (!name) {
      return res
        .status(400)
        .send({ status: false, message: "please enter name" });
    }

    if (!email) {
      return res
        .status(400)
        .send({ status: false, message: "please enter email" });
    }

    if (!phone) {
      return res
        .status(400)
        .send({ status: false, message: "please enter phone" });
    }

    if (!blood_type) {
      return res
        .status(400)
        .send({ status: false, message: "please enter blood type" });
    }

    let bloodGroup = ["A", "B", "AB", "O"];
    if (!bloodGroup.includes(blood_type)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "please enter blood type A, B, AB , O",
        });
    }

    password = await isValidPassword(password);
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "please enter strong password" });

    if ((await IsEmailValid(email)) === "Invalid") {
      return res.status(400).send({ status: false, message: "Invalid Email" });
    }

    if (await IsEmailValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Email already exist please login " });
    }

    if ((await IsPhoneValid(phone)) === "Invalid") {
      return res
        .status(400)
        .send({ status: false, message: "Invalid Phone Number" });
    }

    if (await IsPhoneValid(phone)) {
      return res
        .status(400)
        .send({ status: false, message: "Phone already exist please login" });
    }

    const response = await sentEmail(email, name);
    if (!response)
      return res
        .status(400)
        .send({ status: false, message: "please enter Valid email" });

    const createuser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        password: password,
        blood_type: blood_type,
        address: address,
        profile_pic:
          profile_pic ||
          "https://www.shareicon.net/data/128x128/2017/02/15/878685_user_512x512.png",
      },
    });
    return res.status(201).send({ status: true, message: createuser });
  } catch (err: any) {
    return res.status(500).send({ status: false, message: err.message });
  }
}
