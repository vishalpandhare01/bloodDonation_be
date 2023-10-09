import { Router, Request, Response } from "express";
import {
  getAlluser,
  login,
  registerUser,
  sendOTP,
  updatePassword,
  updateUser,
  veryfyOTP,
} from "../../controller/usercontroller/usercontroll";
import {authentication, authorization} from "../../middleware/auth";
const userRoute = Router();

userRoute.post("/userRegister", registerUser);
userRoute.post("/login", login);
userRoute.get("/getAlluser", authentication, getAlluser);
userRoute.put("/updateUser/:userId", authentication,authorization, updateUser);
userRoute.put("/updatePassword", updatePassword);
userRoute.put("/sendOTP", sendOTP);
userRoute.put("/veryfyOTP", veryfyOTP);

export default userRoute;
