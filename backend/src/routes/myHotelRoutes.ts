import express, { Request, Response } from "express";

const Router = express.Router();

// api/v1/myHotels
Router.post("/", async (req: Request, res: Response) => {
  return res.status(200).send("myHotels route");
});

export default Router;
