import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Livros - Delete By Id", () => {
  let acessToken = "";
  beforeAll(async () => {
    const email = "livro_deletebyid@email.com";
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
    const result = await testServer.delete("/livros/1");

    expect(result.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(result.body).toHaveProperty("errors");
  });

  it("should delete a book", async () => {
    const result = await testServer
      .delete("/livros/1")
      .set({ authorization: `Bearer ${acessToken}` });

    expect(result.status).toBe(StatusCodes.NO_CONTENT);
  });

  it("should reject a decimal id", async () => {
    const result = await testServer
      .delete("/livros/1.1")
      .set({ authorization: `Bearer ${acessToken}` });

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors");
  });

  it("should reject a invalid id", async () => {
    const result = await testServer
      .delete("/livros/0")
      .set({ authorization: `Bearer ${acessToken}` });

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors");
  });

  it("should reject a missing id", async () => {
    const result = await testServer
      .delete("/livros/")
      .set({ authorization: `Bearer ${acessToken}` });

    expect(result.status).toBe(StatusCodes.NOT_FOUND);
  });

  it("should try delete a book that doesn't exist", async () => {
    const result = await testServer
      .get("/livros/9999")
      .set({ authorization: `Bearer ${acessToken}` });

    expect(result.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toHaveProperty("errors");
  });
});
