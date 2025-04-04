import knex from "knex";
import config from "./Environment";

function getEnvironment() {
  switch (process.env.NODE_ENV) {
    case "prod":
      return config.production;
    case "test":
      return config.test;
    default:
      return config.development;
  }
}

export const Knex = knex(getEnvironment());
