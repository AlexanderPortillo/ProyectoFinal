export const cambiarFormulario = (e) => {
	e.preventDefault();

	const cambioFormulario = e.target.closest('button');

	const fondoCrearCuenta = document.querySelector('.container__img-sign');
	const fondoIniciarSesion = document.querySelector('.container__img-login');

	const crearCuenta = document.querySelector('.button__sign-in');
	const iniciarSesion = document.querySelector('.button__sign-up');

	const borderCrearCuenta = document.querySelector('.signin__sign-in');
	const borderIniciarSesion = document.querySelector('.signin__sign-up');

	const formularioCrearCuenta = document.querySelector('.sign');
	const formularioIniciarSesion = document.querySelector('.login');

	if (cambioFormulario?.dataset?.accion === 'login') {
		fondoCrearCuenta.classList.remove('container__img-sign--active');
		fondoCrearCuenta.classList.add('container__disabled');

		fondoIniciarSesion.classList.remove('container__disabled');
		fondoIniciarSesion.classList.add('container__img-login--active');

		crearCuenta.classList.remove('button__sign-in--active');
		iniciarSesion.classList.add('button__sign-up--active');

		borderCrearCuenta.classList.remove('signin__sign-in--active');
		borderIniciarSesion.classList.add('signin__sign-up--active');

		formularioCrearCuenta.classList.add('sign--disabled');
		formularioIniciarSesion.classList.remove('login--disabled');
	}

	if (cambioFormulario?.dataset?.accion === 'sign') {
		fondoCrearCuenta.classList.add('container__img-sign--active');
		fondoCrearCuenta.classList.remove('container__disabled');

		fondoIniciarSesion.classList.add('container__disabled');
		fondoIniciarSesion.classList.remove('container__img-login--active');

		crearCuenta.classList.add('button__sign-in--active');
		iniciarSesion.classList.remove('button__sign-up--active');

		borderCrearCuenta.classList.add('signin__sign-in--active');
		borderIniciarSesion.classList.remove('signin__sign-up--active');

		formularioCrearCuenta.classList.remove('sign--disabled');
		formularioIniciarSesion.classList.add('login--disabled');
	}
};
