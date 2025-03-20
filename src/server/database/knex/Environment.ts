/* eslint-disable @typescript-eslint/no-explicit-any */
import { Knex } from "knex";

export const development: Knex.Config = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "../../../../database.sqlite",
  },
  migrations: {
    directory: "../migrations",
  },
  seeds: {
    directory: "../seeds",
  },
  pool: {
    afterCreate: (connection: any, done: Function) => {
      connection.run("PRAGMA foreign_keys = ON");
      done();
    },
  },
};

export const test: Knex.Config = {
  ...development,
  connection: {
    filename: ":memory:",
  },
};

export const production: Knex.Config = {
  ...development,
};
