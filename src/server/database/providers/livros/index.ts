import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as update from "./Update";
import * as deleteById from "./DeleteById";
import * as count from "./Count";

export const LivrosProvider = {
  ...create,
  ...getAll,
  ...getById,
  ...update,
  ...deleteById,
  ...count,
};
