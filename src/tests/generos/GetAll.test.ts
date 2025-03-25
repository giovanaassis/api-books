import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Gêneros - Get All", () => {
  it("should return an array of genres", async () => {
    const result = await testServer.get("/genero");

    expect(result.status).toBe(StatusCodes.OK);
    expect(Array.isArray(result.body)).toBe(true);
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("nome");
  });

  it("should return a filtered genre", async () => {
    const result = await testServer.get("/genero?filter=fantasia");

    expect(result.status).toBe(StatusCodes.OK);
    result.body.forEach((book: { nome: string }) => {
      expect(book.nome).toEqual("Fantasia");
    });
  });
});
