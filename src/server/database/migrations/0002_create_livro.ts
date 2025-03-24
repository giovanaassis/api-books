import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.livro, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("titulo", 150).checkLength("<=", 150).notNullable();
      table.text("descricao");
      table
        .integer("genero_id")
        .index()
        .notNullable()
        .unsigned()
        .references("id")
        .inTable(ETableNames.genero)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      table
        .integer("autor_id")
        .index()
        .notNullable()
        .unsigned()
        .references("id")
        .inTable(ETableNames.autor)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    })
    .then(() => console.log(`# Created table ${ETableNames.livro} `));
}

export async function down(knex: Knex) {
  return knex.schema
    .dropTable(ETableNames.livro)
    .then(() => console.log(`# Dropped table ${ETableNames.livro}`));
}
