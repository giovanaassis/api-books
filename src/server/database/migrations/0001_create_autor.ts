import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.autor, (table) => {
      table.increments("id").primary().index();
      table.string("nome", 100).notNullable().unique();
    })
    .then(() => console.log(`# Created table ${ETableNames.autor}`));
}

export async function down(knex: Knex) {
  return knex.schema
    .dropTable(ETableNames.autor)
    .then(() => console.log(`# Dropped table ${ETableNames.autor}`));
}
