import { compare, genSalt, hash } from "bcryptjs";

const SALT_RANDOMS = 8;

const hashPassword = async (password: string) => {
  const generatedSalt = await genSalt(SALT_RANDOMS);

  return await hash(password, generatedSalt);
};

const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

export const PasswordCrypto = {
  hashPassword,
  verifyPassword,
};
