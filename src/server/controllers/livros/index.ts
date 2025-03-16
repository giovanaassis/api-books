import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as update from "./Update";
import * as deleteById from "./DeleteById";

export const LivrosController = {
  ...create,
  ...getAll,
  ...getById,
  ...update,
  ...deleteById,
};
