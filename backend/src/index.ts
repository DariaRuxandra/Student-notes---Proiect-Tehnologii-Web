import express from "express";
import env from "dotenv";
import cors from "cors";
import masterRouter from "./routes/masterRouter";
import db_init from "./entities/db_init";
import userRouter from "./routes/userRouter";
import editingRouter from "./routes/editingRouter";
import userFileRouter from "./routes/userFileRouter";
import viewFileRouter from "./routes/viewFileRouter";

env.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,PUT,PATCH,POST,DELETE",
  };
  
app.use(cors(corsOptions));

db_init();

app.use("/api", masterRouter);
app.use("/api", userRouter);
app.use("/api", editingRouter);
app.use("/api", userFileRouter);
app.use("/api", viewFileRouter);

const port = process.env.PORT || 8001;
app.listen(port);
console.log("API is runnning at " + port);