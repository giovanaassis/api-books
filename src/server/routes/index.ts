import { Router } from "express";
import {
  GenerosController,
  LivrosController,
  AutoresController,
  UsuariosController,
} from "../controllers";
import { ensureAuthenticated } from "../shared/middlewares/EnsureAuthenticated";

import { Knex } from "../database/knex/index";
import { ETableNames } from "../database/ETableNames";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("Minha API de Livros!");
});

router.get("/api", async (req, res) => {
  const result = await Knex(ETableNames.livro).select("*").limit(10);

  res.status(200).json(result);
});

// rotas para livros
router.get(
  "/livros",
  ensureAuthenticated,
  LivrosController.getAllValidation,
  LivrosController.getAll,
);
router.get(
  "/livros/:id",
  ensureAuthenticated,
  LivrosController.getByIdValidation,
  LivrosController.getById,
);
router.post(
  "/livros",
  ensureAuthenticated,
  LivrosController.createValidation,
  LivrosController.create,
);
router.put(
  "/livros/:id",
  ensureAuthenticated,
  LivrosController.updateValidation,
  LivrosController.update,
);
router.delete(
  "/livros/:id",
  ensureAuthenticated,
  LivrosController.deleteByIdValidation,
  LivrosController.deleteById,
);

// rotas para generos de livros
router.get(
  "/genero",
  ensureAuthenticated,
  GenerosController.getAllValidation,
  GenerosController.getAll,
);
router.get(
  "/genero/:id",
  ensureAuthenticated,
  GenerosController.getByIdValidation,
  GenerosController.getById,
);

//rotas para autores de livros
router.get(
  "/autor",
  ensureAuthenticated,
  AutoresController.getAllValidation,
  AutoresController.getAll,
);
router.get(
  "/autor/:id",
  ensureAuthenticated,
  AutoresController.getByIdValidation,
  AutoresController.getById,
);
router.post(
  "/autor",
  ensureAuthenticated,
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
