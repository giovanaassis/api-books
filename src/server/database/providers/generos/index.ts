import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as count from "./Count";

export const GenerosProvider = {
  ...getAll,
  ...getById,
  ...count,
};
