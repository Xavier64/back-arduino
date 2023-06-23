import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "@routes/index";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With, Accept",
  });
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/v1", routes);

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
