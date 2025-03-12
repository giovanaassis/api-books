import { Router } from "express";
import { LivrosController } from "../controllers/livros";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("Minha API de Livros!");
});

router.post("/livros", LivrosController.create)

export default router;
