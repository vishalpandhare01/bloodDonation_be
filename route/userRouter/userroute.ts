import { Router, Request, Response } from "express";
import { registerUser } from "../../controller/usercontroller/usercontroll";
const userRoute = Router();

userRoute.post("/userRegister", registerUser);

export default userRoute;
