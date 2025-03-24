import { Knex } from "knex";
import { ETableNames } from "../ETableNames";
import generosToInsert from "../../../data/generos.json";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.genero).count<[{ count: number }]>(
    "* as count",
  );
  if (!Number.isInteger(count) || Number(count) > 0) return;

  await knex(ETableNames.genero).insert(
    generosToInsert.map((genero) => ({ nome: genero })),
  );
};
