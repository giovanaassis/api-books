import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Livros - Get All", () => {
  let acessToken = "";
  beforeAll(async () => {
    const email = "livro_getall@email.com";
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
    const result = await testServer.get("/livros");

    expect(result.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(result.body).toHaveProperty("errors");
  });

  it("should return an array of books", async () => {
    const result = await testServer
      .get("/livros")
      .set({ authorization: `Bearer ${acessToken}` });

    expect(result.status).toBe(StatusCodes.OK);
    expect(Array.isArray(result.body)).toBe(true);
    expect(result.body[0]).toHaveProperty("titulo");
    expect(result.body[0]).toHaveProperty("descricao");
    expect(result.body[0]).toHaveProperty("genero_id");
    expect(result.body[0]).toHaveProperty("autor_id");
  });

  it("should return books within the given page and limit", async () => {
    const result = await testServer
      .get("/livros?page=2&limit=5")
      .set({ authorization: `Bearer ${acessToken}` });

    expect(result.status).toBe(StatusCodes.OK);
    expect(result.body).toHaveLength(5);
  });

  it("should return books with the same genre", async () => {
    const result = await testServer
      .get("/livros?genre=1")
      .set({ authorization: `Bearer ${acessToken}` });

    expect(result.status).toBe(StatusCodes.OK);
    if (result.body.length > 0) {
      result.body.forEach((book: { genero_id: number }) => {
        expect(book.genero_id).toEqual(1);
      });
    }
  });

  it("should return books with the same author", async () => {
    const result = await testServer
      .get("/livros?author=1")
      .set({ authorization: `Bearer ${acessToken}` });

    expect(result.status).toBe(StatusCodes.OK);
    if (result.body.length > 0) {
      result.body.forEach((book: { autor_id: number }) => {
        expect(book.autor_id).toEqual(1);
      });
    }
  });
});
