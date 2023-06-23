import express from "express";
import humidity from "./includes/humidity";

const router = express.Router();

router.use("/humidity", humidity);

export default router;


