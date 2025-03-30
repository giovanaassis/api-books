import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Autores - Get All", () => {
  let acessToken = "";
  beforeAll(async () => {
    const email = "autor_getall@email.com";
    await testServer.post("/cadastrar").send({
      nome: "teste",
      email,
      senha: "123456",
    });

    const resSignIn = await testServer.post("/entrar").send({
      email,
      senha: "123456",
    });
    acessToken = resSignIn.body.acessToken;
  });

  it("should reject a request without an acess token", async () => {
    const result = await testServer.get("/autor");

    expect(result.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(result.body).toHaveProperty("errors");
  });

  it("should return an array of authors", async () => {
    const result = await testServer
      .get("/autor")
      .set({ authorization: `Bearer ${acessToken}` });

    expect(result.status).toBe(StatusCodes.OK);
    expect(Array.isArray(result.body)).toBe(true);
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("nome");
  });

  it("should return authors within the given page and limit", async () => {
    const result = await testServer
      .get("/autor?page=1&limit=3")
      .set({ authorization: `Bearer ${acessToken}` });

    expect(result.status).toBe(StatusCodes.OK);
    expect(result.body).toHaveLength(3);
  });
});
