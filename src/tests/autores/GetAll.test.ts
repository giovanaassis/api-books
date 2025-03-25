import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Autores - Get All", () => {
  it("should return an array of authors", async () => {
    const result = await testServer.get("/autor");

    expect(result.status).toBe(StatusCodes.OK);
    expect(Array.isArray(result.body)).toBe(true);
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("nome");
  });

  it("should return authors within the given page and limit", async () => {
    const result = await testServer.get("/autor?page=1&limit=3");

    expect(result.status).toBe(StatusCodes.OK);
    expect(result.body).toHaveLength(3);
  });
});
