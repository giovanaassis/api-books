import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Usuários - SignIn", () => {
  it("should log in", async () => {
    const result1 = await testServer.post("/cadastrar").send({
      nome: "Teste",
      email: "teste@email.com",
      senha: "123teste",
    });

    expect(result1.status).toBe(StatusCodes.CREATED);

    const result2 = await testServer.post("/entrar").send({
      email: "teste@email.com",
      senha: "123teste",
    });

    expect(result2.status).toBe(StatusCodes.OK);
    expect(result2.body).toHaveProperty("acessToken");
  });

  it("should reject when missing required field", async () => {
    const result = await testServer.post("/entrar").send({
      email: "teste@email.com",
    });

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.senha");
  });

  it("should reject a wrong email", async () => {
    const result = await testServer.post("/entrar").send({
      email: "t@email.com",
      senha: "123teste",
    });

    expect(result.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(result.body).toHaveProperty("errors");
  });

  it("should reject a wrong password", async () => {
    const result = await testServer.post("/entrar").send({
      email: "teste@email.com",
      senha: "123456",
    });

    expect(result.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(result.body).toHaveProperty("errors");
  });
});
