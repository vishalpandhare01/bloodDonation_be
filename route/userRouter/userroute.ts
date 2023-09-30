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
import authentication from "../../middleware/auth";
const userRoute = Router();

userRoute.post("/userRegister", registerUser);
userRoute.post("/login", login);
userRoute.get("/getAlluser", authentication, getAlluser);
userRoute.put("/updateUser", authentication, updateUser);
userRoute.put("/updatePassword", authentication, updatePassword);
userRoute.put("/sendOTP", authentication, sendOTP);
userRoute.put("/veryfyOTP", authentication, veryfyOTP);

export default userRoute;
