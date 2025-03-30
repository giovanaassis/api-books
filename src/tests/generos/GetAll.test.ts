import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Gêneros - Get All", () => {
  let acessToken = "";
  beforeAll(async () => {
    const email = "genero_getall@email.com";
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
    const result = await testServer.get("/genero");

    expect(result.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(result.body).toHaveProperty("errors");
  });

  it("should return an array of genres", async () => {
    const result = await testServer
      .get("/genero")
      .set({ authorization: `Bearer ${acessToken}` });

    expect(result.status).toBe(StatusCodes.OK);
    expect(Array.isArray(result.body)).toBe(true);
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("nome");
  });

  it("should return a filtered genre", async () => {
    const result = await testServer
      .get("/genero?filter=fantasia")
      .set({ authorization: `Bearer ${acessToken}` });

    expect(result.status).toBe(StatusCodes.OK);
    result.body.forEach((book: { nome: string }) => {
      expect(book.nome).toEqual("Fantasia");
    });
  });
});
