

import mifuncion, { HELLO } from "./modules/modulo.js";
import { mostrarUsuarios, agregarListeners, limpiarCampoInput } from "./modules/tasks.js";

console.log(HELLO);
console.log(mifuncion());

//const nuevoArreglo = data.users.filter((user) => user.age > 25);

agregarListeners();
mostrarUsuarios();
