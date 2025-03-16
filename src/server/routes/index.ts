import { Router } from "express";
import { LivrosController } from "../controllers/livros";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("Minha API de Livros!");
});

// rotas para livros
router.get(
  "/livros",
  LivrosController.getAllValidation,
  LivrosController.getAll,
);
router.get(
  "/livros/:id",
  LivrosController.getByIdValidation,
  LivrosController.getById,
);
router.post(
  "/livros",
  LivrosController.createValidation,
  LivrosController.create,
);
router.put(
  "/livros/:id",
  LivrosController.updateValidation,
  LivrosController.update,
);
router.delete(
  "/livros/:id",
  LivrosController.deleteByIdValidation,
  LivrosController.deleteById,
);

export default router;
