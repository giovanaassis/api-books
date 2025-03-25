import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.genero, (table) => {
      table.increments("id").primary().index();
      table
        .string("nome", 100)
        .checkLength("<=", 100)
        .notNullable()
        .unique()
        .index();
    })
    .then(() => console.log(`# Created table ${ETableNames.genero}`));
}

export async function down(knex: Knex) {
  return knex.schema
    .dropTable(ETableNames.genero)
    .then(() => console.log(`# Dropped table ${ETableNames.genero}`));
}
