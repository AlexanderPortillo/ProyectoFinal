import { crearCuenta } from './_crearCuenta.js';
import { iniciarSesion } from './_IniciarSesion.js';

const CrearCuenta = document.getElementById('sign__buttons-submit');
const IniciarSesion = document.getElementById('login__button-submit');

CrearCuenta.addEventListener('click', crearCuenta);
IniciarSesion.addEventListener('click', iniciarSesion);
