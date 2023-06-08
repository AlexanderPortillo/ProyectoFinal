import { cargarUsuarios } from './_cargarUsuarios.js';
import { crearCuenta } from './_crearCuenta.js';

cargarUsuarios();

const CrearCuenta = document.getElementById('sign__button-submit');

CrearCuenta.addEventListener('click', crearCuenta);
