import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Usuários - SignUp", () => {
  it("should create a new user", async () => {
    const result = await testServer.post("/cadastrar").send({
      nome: "Teste",
      email: "teste@email.com",
      senha: "123teste",
    });

    expect(result.status).toBe(StatusCodes.CREATED);
    expect(typeof result.body).toEqual("number");
  });

  it("should reject a user with duplicate email", async () => {
    const result1 = await testServer.post("/cadastrar").send({
      nome: "teste",
      email: "testando@email.com",
      senha: "123teste",
    });

    expect(result1.status).toBe(StatusCodes.CREATED);

    const result2 = await testServer.post("/cadastrar").send({
      nome: "teste",
      email: "testando@email.com",
      senha: "123teste",
    });

    expect(result2.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it("should reject when missing required field", async () => {
    const result = await testServer.post("/cadastrar").send({
      nome: "teste",
    });

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.email");
    expect(result.body).toHaveProperty("errors.body.senha");
  });

  it("should reject a user name too short", async () => {
    const result = await testServer.post("/cadastrar").send({
      nome: "Te",
      email: "teste@email.com",
      senha: "123teste",
    });

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.nome");
  });

  it("should reject a password too short", async () => {
    const result = await testServer.post("/cadastrar").send({
      nome: "Teste",
      email: "teste@email.com",
      senha: "123",
    });

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.senha");
  });

  it("should reject an invalid email", async () => {
    const result = await testServer.post("/cadastrar").send({
      nome: "Teste",
      email: "t@em",
      senha: "123teste",
    });

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.email");
  });
});
