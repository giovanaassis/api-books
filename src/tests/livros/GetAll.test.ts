import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Livros - Get All", () => {
  it("should return an array of books", async () => {
    const result = await testServer.get("/livros");

    expect(result.status).toBe(StatusCodes.OK);
    expect(Array.isArray(result.body)).toBe(true);
    expect(result.body[0]).toHaveProperty("titulo");
    expect(result.body[0]).toHaveProperty("descricao");
    expect(result.body[0]).toHaveProperty("genero_id");
    expect(result.body[0]).toHaveProperty("autor_id");
  });

  it("should return books within the given page and limit", async () => {
    const result = await testServer.get("/livros?page=2&limit=5");

    expect(result.status).toBe(StatusCodes.OK);
    expect(result.body).toHaveLength(5);
  });

  it("should return books with the same genre", async () => {
    const result = await testServer.get("/livros?genre=1");

    expect(result.status).toBe(StatusCodes.OK);
    if (result.body.length > 0) {
      result.body.forEach((book: { genero_id: number }) => {
        expect(book.genero_id).toEqual(1);
      });
    }
  });

  it("should return books with the same author", async () => {
    const result = await testServer.get("/livros?author=1");

    expect(result.status).toBe(StatusCodes.OK);
    if (result.body.length > 0) {
      result.body.forEach((book: { autor_id: number }) => {
        expect(book.autor_id).toEqual(1);
      });
    }
  });
});
