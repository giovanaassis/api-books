import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Autores - Get By Id", () => {
  it("should return an author with the given id", async () => {
    const result = await testServer.get("/autor/1");

    expect(result.status).toBe(StatusCodes.OK);
    expect(typeof result).toEqual("object");
    expect(result.body).toHaveProperty("nome");
    expect(result.body.id).toEqual(1);
  });

  it("should reject a decimal id", async () => {
    const result = await testServer.get("/autor/1.1");

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors");
  });

  it("should reject a invalid id", async () => {
    const result = await testServer.get("/autor/0");

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors");
  });
});
