import express from "express";
const app = express();
import dotenv from "dotenv";
import route from "./route/route";
import multer from 'multer'
import cors from 'cors'
import userRoute from "./route/userRouter/userroute";


dotenv.config();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(multer().any())
//@ts-ignore
app.use(cors("Access-Control-Allow-Origin", "*"));
app.options("*", cors({ origin: 'http://localhost:8000' || "http://192.168.1.10:8080/" , optionsSuccessStatus: 200 }));
app.use(cors({ origin: "http://localhost:8000", optionsSuccessStatus: 200 }));

app.use("/api/v1", route);
app.use("/api/v1", userRoute);

app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
});
