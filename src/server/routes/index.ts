import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("Minha API de Livros!");
});

router.post("/teste", (req, res) => {
  console.log(req.body);

  res.status(StatusCodes.CREATED).send();
});

export default router;
