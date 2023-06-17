import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import connect from "./database/database.js";
import { usersRouter, studentsRouter } from "./routes/index.js";
import checkToken from "./authentication/auth.js";
const app = express();
app.use(checkToken);
app.use(express.json());
const port = process.env.PORT || 3000;
//routers
app.use("/users", usersRouter);
app.use("/students", studentsRouter);
app.get("/", (req, res) => {
  res.send("respone from root router hahahaha");
});
app.listen(port, async () => {
  await connect();
  console.log(`listening on port : ${port}`);
});
