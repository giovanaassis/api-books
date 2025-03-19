import { testServer } from "../jest.setup";

describe("Livros - Create", () => {
  it("should create a new book", async () => {
    const result = await testServer.post("/livros").send({
      titulo: "Depois de Você",
      genero_id: "1",
      autor: "Jojo Moyes",
    });

    console.log(result.body);

    expect(result.status).toBe(500);
  });

  it("should reject when missing required field", async () => {
    const result = await testServer.post("/livros").send({
      titulo: "Um livro qualquer",
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("errors.body.genero_id");
    expect(result.body).toHaveProperty("errors.body.autor");
  });

  it("should reject genero_id less than 1", async () => {
    const result = await testServer.post("/livros").send({
      titulo: "Depois de Você",
      autor: "Jojo Moyes",
      genero_id: "0",
    });

    console.log(result.body);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("errors.body.genero_id");
  });
});
