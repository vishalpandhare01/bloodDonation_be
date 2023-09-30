import prisma from "../../db/prisma";
import { Request, Response } from "express";
import { sentEmail } from "../../utils/sentemail";
import { isValidPassword } from "../../validation/password";
import { IsEmailValid } from "../../validation/email";
import { IsPhoneValid } from "../../validation/phone";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sentOTPEmail } from "../../utils/sentotpmail";
dotenv.config();

const jwtsing = process.env.JWTSIGNATURE as string;

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

    let bloodGroup = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];
    if (!bloodGroup.includes(blood_type)) {
      return res.status(400).send({
        status: false,
        message: "please enter blood type A+, B+, AB+ , O+ , A- , B-, AB- , O-",
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
export async function login(req: Request, res: Response) {
  const { email, phone, password } = req.body;
  try {
    const isUserExist = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { phone: phone }],
      },
    });

    if (!isUserExist) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid Email or Phone" });
    }

    const checkPassword = await bcrypt.compare(password, isUserExist.password);
    console.log(checkPassword);
    if (!checkPassword) {
      return res
        .status(400)
        .send({ status: false, message: "Password Dose Not match" });
    }

    const token = Jwt.sign({ id: isUserExist.id }, jwtsing, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .send({ status: true, token: token, message: "login successful" });
  } catch (err: any) {
    res.status(500).send({ status: false, message: err.message });
  }
}
export async function getAlluser(req: Request, res: Response) {
  try {
    const getUsers = await prisma.user.findMany();
    return res
      .status(200)
      .send({ statu: true, message: "success", data: getUsers });
  } catch (err: any) {
    return res.status(500).send({ statu: false, message: err.message });
  }
}
export async function updateUser(req: Request, res: Response) {
  try {
    let {
      name,
      email,
      phone,
      password,
      blood_type,
      address,
      profile_pic,
      userId,
    } = req.body;

    if (!userId) {
      return res.status(400).send({
        status: false,
        message: "userId required",
      });
    }

    if (blood_type) {
      let bloodGroup = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];
      if (!bloodGroup.includes(blood_type)) {
        return res.status(400).send({
          status: false,
          message:
            "please enter blood type A+, B+, AB+ , O+ , A- , B-, AB- , O-",
        });
      }
    }

    if (password) {
      password = await isValidPassword(password);
      if (!password)
        return res
          .status(400)
          .send({ status: false, message: "please enter strong password" });
    }

    if (email) {
      if ((await IsEmailValid(email)) === "Invalid") {
        return res
          .status(400)
          .send({ status: false, message: "Invalid Email" });
      }
      if (await IsEmailValid(email)) {
        return res
          .status(400)
          .send({ status: false, message: "Email already exist" });
      }
    }

    if (phone) {
      if ((await IsPhoneValid(phone)) === "Invalid") {
        return res
          .status(400)
          .send({ status: false, message: "Invalid Phone Number" });
      }

      if (await IsPhoneValid(phone)) {
        return res
          .status(400)
          .send({ status: false, message: "Phone already exist" });
      }
    }

    const updateuser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        address: address,
        blood_type: blood_type,
        email: email,
        password: password,
        phone: phone,
        profile_pic: profile_pic,
      },
    });
    return res.status(200).send({ status: true, message: updateuser });
  } catch (err: any) {
    return res.status(500).send({ status: false, message: err.message });
  }
}
export async function updatePassword(req: Request, res: Response) {
  try {
    let { password, userId } = req.body;
    password = await isValidPassword(password);
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "please enter strong password" });

    const updateuser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: password,
      },
    });
    return res.status(200).send({ status: true, message: updateuser });
  } catch (err: any) {
    return res.status(500).send({ status: false, message: err.message });
  }
}
export async function sendOTP(req: Request, res: Response) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(200).send({ status: false, message: "Email require" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    let otpNumber = Math.floor(1000 + Math.random() * 9000);

    const userData = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        otp: otpNumber,
      },
    });

    async function reupdteOTP() {
      const otpReupdate = await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          otp: 0,
        },
      });
    }

    setTimeout(() => {
      reupdteOTP();
    }, 60000);

    //@ts-ignore
    sentOTPEmail(email, user?.name, otpNumber);
    console.log(otpNumber);
    console.log(userData);
    return res.status(200).send({ status: true, message: "otp sent" });
  } catch (err: any) {
    return res.status(500).send({ status: false, message: err.message });
  }
}
export async function veryfyOTP(req: Request, res: Response) {
  try {
    const { otp, userId } = req.body;

    const userData = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    console.log(otp , userData?.otp)
    if (otp === userData?.otp) {
      return res.status(200).send({ status: true, message: "otp veryfied" });
    } else {
      return res
        .status(400)
        .send({ status: true, message: "Please Enter Valid OTP" });
    }

  } catch (err: any) {
    return res.status(500).send({ status: false, message: err.message });
  }
}
