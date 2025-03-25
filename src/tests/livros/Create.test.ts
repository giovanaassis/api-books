import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Livros - Create", () => {
  it("should create a new book", async () => {
    const result = await testServer.post("/livros").send({
      titulo: "Testando",
      genero_id: 1,
      autor_id: 2,
    });

    expect(result.status).toBe(StatusCodes.CREATED);
    expect(typeof result.body).toEqual("number");
  });

  it("should reject an already existed book", async () => {
    const result1 = await testServer.post("/livros").send({
      titulo: "Testando",
      genero_id: 1,
      autor_id: 3,
    });
    expect(result1.status).toBe(StatusCodes.CREATED);

    const result2 = await testServer.post("/livros").send({
      titulo: "Testando",
      genero_id: 1,
      autor_id: 3,
    });
    expect(result2.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it("should reject when missing required field", async () => {
    const result = await testServer.post("/livros").send({
      titulo: "Um livro qualquer",
    });

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.genero_id");
    expect(result.body).toHaveProperty("errors.body.autor_id");
  });

  it("should reject genero_id less than 1", async () => {
    const result = await testServer.post("/livros").send({
      titulo: "Depois de Você",
      genero_id: 0,
      autor_id: 0,
    });

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.genero_id");
    expect(result.body).toHaveProperty("errors.body.autor_id");
  });
});
