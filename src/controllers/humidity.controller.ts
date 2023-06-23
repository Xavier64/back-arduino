import { Request, Response } from "express";
import db from "@config/db";


//methode supabase récupération des données
const getHumidity = async (req: Request, res: Response) => {
  const { data, error } = await db.from("Sensor").select();
  if (error) return res.status(404).json({ error });
  return res.status(200).json({ data });
};
// update des data sur supabase
const updateHumidity = async (req: Request, res: Response) => {
  const { macAddress, humidity } = req.body;
  if (!macAddress || !humidity)
    return res.status(400).json({ error: "Missing queries" });
  console.log(macAddress, humidity);

  const { data, error } = await db
    .from("Sensor")
    .select("macAddress, humidity")
    .eq("macAddress", macAddress)
    .single();

  if (data) {
    const { data, error } = await db
      .from("Sensor")
      .update({ humidity: humidity })
      .match({ macAddress })
      .select();
    if (error) return res.status(400).json({ error });
    return res.status(200).json({ data });
  }

  if (error) {
    const { data, error } = await db
      .from("Sensor")
      .insert({
        macAddress,
        humidity,
      })
      .select();

    if (error) return res.status(400).json({ error });
    return res.status(201).json({ data });
  }
};

export default {
  getHumidity,
  updateHumidity,
};
