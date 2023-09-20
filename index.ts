import express from "express";
const app = express();
import dotenv from "dotenv";
import route from "./route/route";
dotenv.config();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(route);

app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
});
