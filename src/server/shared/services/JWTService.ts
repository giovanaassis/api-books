/* eslint-disable @typescript-eslint/no-unused-vars */
import * as jwt from "jsonwebtoken";

interface IJwtData {
  uid: number;
}

const sign = (data: IJwtData): string | "JWT_SECRET_NOT_FOUND" => {
  if (!process.env.JWT_SECRET) return "JWT_SECRET_NOT_FOUND";

  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const verify = (token: string) => {
  if (!process.env.JWT_SECRET) return "JWT_SECRET_NOT_FOUND";

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === "string") {
      return "INVALID TOKEN";
    }

    return decoded;
  } catch (error) {
    return "INVALID TOKEN";
  }
};

export const JWTService = {
  sign,
  verify,
};
