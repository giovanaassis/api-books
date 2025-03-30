import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Livros - Get By Id", () => {
  let acessToken = "";
  beforeAll(async () => {
    const email = "livro_getbyid@email.com";
    await testServer.post("/cadastrar").send({
      nome: "teste",
      email,
      senha: "123456",
    });

    const resSignIn = await testServer.post("/entrar").send({
      email: "livro_getbyid@email.com",
      senha: "123456",
    });
    acessToken = resSignIn.body.acessToken;
  });

  it("should reject a request without an acess token", async () => {
    const result = await testServer.get("/livros/1");

    expect(result.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(result.body).toHaveProperty("errors");
  });

  it("should return a book with the given id", async () => {
    const result = await testServer
      .get("/livros/1")
      .set({ authorization: `Bearer ${acessToken}` });

    expect(result.status).toBe(StatusCodes.OK);
    expect(typeof result).toEqual("object");
    expect(result.body).toHaveProperty("titulo");
    expect(result.body.id).toEqual(1);
  });

  it("should reject a decimal id", async () => {
    const result = await testServer
      .get("/livros/1.1")
      .set({ authorization: `Bearer ${acessToken}` });

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors");
  });

  it("should reject a invalid id", async () => {
    const result = await testServer
      .get("/livros/0")
      .set({ authorization: `Bearer ${acessToken}` });

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors");
  });

  it("should try get a book that doesn't exist", async () => {
    const result = await testServer
      .get("/livros/9999")
      .set({ authorization: `Bearer ${acessToken}` });

    expect(result.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toHaveProperty("errors");
  });
});
