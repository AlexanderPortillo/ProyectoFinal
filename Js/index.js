import { enviarDatos } from './_crearCuenta.js';

const crearCuenta = document.getElementById('sign__buttons-submit');

crearCuenta.addEventListener('click', enviarDatos);
