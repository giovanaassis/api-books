import { Knex } from "knex";
import path from "path";
import "dotenv/config";

const development: Knex.Config = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "database.sqlite",
    ),
  },
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
  pool: {
    afterCreate: (connection: any, done: Function) => {
      connection.run("PRAGMA foreign_keys = ON");
      done();
    },
  },
};

const test: Knex.Config = {
  ...development,
  connection: ":memory:",
};

const production: Knex.Config = {
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false },
  },
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
};

export default {
  development,
  test,
  production,
};
