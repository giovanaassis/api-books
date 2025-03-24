import { Knex } from "knex";
import { ETableNames } from "../ETableNames";
import autoresToInsert from "../../../data/autores.json";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.autor).count<[{ count: number }]>(
    "* as count",
  );
  if (!Number.isInteger(count) || Number(count) > 0) return;

  await knex(ETableNames.autor).insert(
    autoresToInsert.map((autor) => ({ nome: autor })),
  );
};
