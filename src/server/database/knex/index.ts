import knex from "knex";
import { development, test, production } from "./Environment";

function getEnvironment() {
  switch (process.env.NODE_ENV) {
    case "prod":
      return production;
    case "test":
      return test;
    default:
      return development;
  }
}

export const Knex = knex(getEnvironment());
