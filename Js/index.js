import { cambiarFormulario } from './_cambiarFormulario.js';
import { crearCuenta } from './_crearCuenta.js';
import { iniciarSesion } from './_IniciarSesion.js';

const CrearCuenta = document.getElementById('sign__button-submit');
const IniciarSesion = document.getElementById('login__button-submit');
const CambiarFormulario = document.querySelector('.button');

CrearCuenta.addEventListener('click', crearCuenta);
IniciarSesion.addEventListener('click', iniciarSesion);
CambiarFormulario.addEventListener('click', cambiarFormulario);
