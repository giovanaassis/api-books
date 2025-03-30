import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Autores - Create", () => {
  let acessToken = "";
  beforeAll(async () => {
    const email = "autor_create@email.com";
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
    const result = await testServer.post("/autor").send({
      nome: "Fulano Teste",
    });

    expect(result.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(result.body).toHaveProperty("errors");
  });

  it("should create a new author", async () => {
    const result = await testServer
      .post("/autor")
      .set({ authorization: `Bearer ${acessToken}` })
      .send({
        nome: "Fulano Teste",
      });

    expect(result.status).toBe(StatusCodes.CREATED);
    expect(typeof result.body).toEqual("number");
  });

  it("should reject an already existed author", async () => {
    const result1 = await testServer
      .post("/autor")
      .set({ authorization: `Bearer ${acessToken}` })
      .send({ nome: "teste" });
    expect(result1.status).toBe(StatusCodes.CREATED);

    const result2 = await testServer
      .post("/autor")
      .set({ authorization: `Bearer ${acessToken}` })
      .send({ nome: "teste" });
    expect(result2.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it("should reject when missing required field", async () => {
    const result = await testServer
      .post("/autor")
      .set({ authorization: `Bearer ${acessToken}` })
      .send({
        nome: "",
      });

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors.body.nome");
  });
});
