import supertest from "supertest";
import server from "../server/server";

export const testServer = supertest(server);
