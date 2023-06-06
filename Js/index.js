import { enviarDatos } from './_crearCuenta.js';
import { iniciarSesion } from './_IniciarSesion.js';

const crearCuenta = document.getElementById('sign__buttons-submit');
const iniciarSesion = document.getElementById('login__buttons-submit');

crearCuenta.addEventListener('click', enviarDatos);
iniciarSesion.addEventListener('click', iniciarSesion);
