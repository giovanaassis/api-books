import { Knex } from "knex";
import { ETableNames } from "../ETableNames";
import livrosToInsert from "../../../data/livros.json";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.livro).count<[{ count: number }]>(
    "* as count",
  );
  if (!Number.isInteger(count) || Number(count) > 0) return;

  await knex(ETableNames.livro).insert(livrosToInsert);
};
