import { Router } from "express";
import {
  GenerosController,
  LivrosController,
  AutoresController,
  UsuariosController,
} from "../controllers";

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

// rotas para generos de livros
router.get(
  "/genero",
  GenerosController.getAllValidation,
  GenerosController.getAll,
);
router.get(
  "/genero/:id",
  GenerosController.getByIdValidation,
  GenerosController.getById,
);

//rotas para autores de livros
router.get(
  "/autor",
  AutoresController.getAllValidation,
  AutoresController.getAll,
);
router.get(
  "/autor/:id",
  AutoresController.getByIdValidation,
  AutoresController.getById,
);
router.post(
  "/autor",
  AutoresController.createValidation,
  AutoresController.create,
);

// rotas para o login
router.post(
  "/cadastrar",
  UsuariosController.signUpValidation,
  UsuariosController.signUp,
);
router.post(
  "/entrar",
  UsuariosController.signInValidation,
  UsuariosController.signIn,
);

export default router;
