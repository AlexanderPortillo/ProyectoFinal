import { crearCuenta } from './_crearCuenta.js';
import { crearPost } from './_crearPost.js';

const CrearCuenta = document.getElementById('sign__button-submit');
const crearPublicacion = document.getElementById('post__button');

CrearCuenta.addEventListener('click', crearCuenta);
crearPublicacion.addEventListener('click', crearPost);
