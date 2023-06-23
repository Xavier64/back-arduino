import express from "express";

import humidityController from "@controllers/humidity.controller";

const router = express.Router();

router.get("/", humidityController.getHumidity);

router.post("/", humidityController.updateHumidity);
router.delete("/:id", humidityController.updateHumidity);

export default router;
