import { IAutor, IGenero, ILivro, IUsuario } from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    livro: ILivro;
    genero: IGenero;
    autor: IAutor;
    usuario: IUsuario;
  }
}
