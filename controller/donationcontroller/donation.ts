import prisma from "../../db/prisma";
import { Request, Response } from "express";

export default function DonationRequiest(req: Request, res: Response) {
  try {
    const {donarId , UserId } = req.body

  } catch (err:any) {
    return res.status(500).send({ status: false, message: err.message });
  }
}
