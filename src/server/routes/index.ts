import { Router } from "express";
import { LivrosController } from "../controllers/livros";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("Minha API de Livros!");
});

router.get(
  "/livros",
  LivrosController.getAllValidation,
  LivrosController.getAll,
);
router.post(
  "/livros",
  LivrosController.createValidation,
  LivrosController.create,
);

export default router;
