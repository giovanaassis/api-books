import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Livros - Delete By Id", () => {
  it("should delete a book", async () => {
    const result = await testServer.delete("/livros/1");

    expect(result.status).toBe(StatusCodes.NO_CONTENT);
  });

  it("should reject a decimal id", async () => {
    const result = await testServer.delete("/livros/1.1");

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors");
  });

  it("should reject a invalid id", async () => {
    const result = await testServer.delete("/livros/0");

    expect(result.status).toBe(StatusCodes.BAD_REQUEST);
    expect(result.body).toHaveProperty("errors");
  });

  it("should reject a missing id", async () => {
    const result = await testServer.delete("/livros/");

    expect(result.status).toBe(StatusCodes.NOT_FOUND);
  });

  it("should try delete a book that doesn't exist", async () => {
    const result = await testServer.get("/livros/9999");

    expect(result.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toHaveProperty("errors");
  });
});
