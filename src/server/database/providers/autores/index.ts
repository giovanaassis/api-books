import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as count from "./Count";

export const AutoresProvider = {
  ...create,
  ...getAll,
  ...getById,
  ...count,
};
