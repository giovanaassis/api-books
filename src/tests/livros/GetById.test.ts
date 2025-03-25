import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Livros - Get By Id", () => {
  it("should return a book with the given id", async () => {
    const result = await testServer.get("/livros/1");

    expect(result.status).toBe(StatusCodes.OK);
    expect(typeof result).toEqual("object");
    expect(result.body).toHaveProperty("titulo");
    expect(result.body.id).toEqual(1);
  });

  it("should reject a decimal id", async () => {
    const result = await testServer.get("/livros/1.1");

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors");
  });

  it("should reject a invalid id", async () => {
    const result = await testServer.get("/livros/0");

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors");
  });

  it("should try get a book that doesn't exist", async () => {
    const result = await testServer.get("/livros/9999");

    expect(result.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toHaveProperty("errors");
  });
});
