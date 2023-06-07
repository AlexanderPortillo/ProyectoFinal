let tiempo = 2000;
const formulario = document.forms['form'];

export const crearCuenta = (e) => {
	e.preventDefault();

	const expresionRegularUsuario = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
	const expresionRegularNombre = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
	const expresionRegularCorreo = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
	const expresionRegularContraseña = /^(?!.*\s)(?=.*[+*])[\S]{8,}$/;

	const datos = {
		nombreUsuario: formulario.user.value,
		nombreCompleto: formulario.fullName.value,
		correoElectronico: formulario.email.value,
		contraseña: formulario.password.value,
		confirmarContraseña: formulario.repeatPassword.value,
		aceptarCondiciones: formulario['terms-services'].checked,
	};

	if (!expresionRegularUsuario.test(datos.nombreUsuario)) {
		const errorNombreUsuario = document.querySelector('.sign__user--error');

		errorNombreUsuario.classList.remove('sign--disabled');
		formulario.user.classList.add('sign--error');

		setTimeout(function () {
			formulario.user.classList.remove('sign--error');
			errorNombreUsuario.classList.add('sign--disabled');
		}, tiempo);
		return;
	}

	if (!expresionRegularNombre.test(datos.nombreCompleto)) {
		const errorNombre = document.querySelector('.sign__fullName--error');

		errorNombre.classList.remove('sign--disabled');
		formulario.fullName.classList.add('sign--error');

		setTimeout(function () {
			formulario.fullName.classList.remove('sign--error');
			errorNombre.classList.add('sign--disabled');
		}, tiempo);
		return;
	}

	if (!expresionRegularCorreo.test(datos.correoElectronico)) {
		const errorEmail = document.querySelector('.sign__email--error');

		errorEmail.classList.remove('sign--disabled');
		formulario.email.classList.add('sign--error');

		setTimeout(function () {
			formulario.email.classList.remove('sign--error');
			errorEmail.classList.add('sign--disabled');
		}, tiempo);
		return;
	}

	if (!expresionRegularContraseña.test(datos.contraseña)) {
		const errorContraseña = document.querySelector('.sign__password--error');

		errorContraseña.classList.remove('sign--disabled');
		formulario.password.classList.add('sign--error');

		setTimeout(function () {
			formulario.password.classList.remove('sign--error');
			errorContraseña.classList.add('sign--disabled');
		}, tiempo);
		return;
	}

	if (datos.contraseña !== datos.confirmarContraseña) {
		const errorConfirmar = document.querySelector('.sign__repeatPassword--error');

		errorConfirmar.classList.remove('sign--disabled');
		formulario.repeatPassword.classList.add('sign--error');

		setTimeout(function () {
			formulario.repeatPassword.classList.remove('sign--error');
			errorConfirmar.classList.add('sign--disabled');
		}, tiempo);
		return;
	}

	if (!datos.aceptarCondiciones) {
		const errorTerminos = document.querySelector('.sign__checkbox--error');

		errorTerminos.classList.remove('sign--disabled');
		formulario['terms-services'].classList.add('sign--error');

		setTimeout(function () {
			formulario['terms-services'].classList.remove('sign--error');
			errorTerminos.classList.add('sign--disabled');
		}, tiempo);
		return;
	}

	const elementos = JSON.parse(localStorage.getItem('usuario')) || [];

	if (localStorage.getItem('usuario') === null) {
		formulario.user.value = '';
		formulario.fullName.value = '';
		formulario.email.value = '';
		formulario.password.value = '';
		formulario.repeatPassword.value = '';
		formulario['terms-services'].checked = false;

		elementos.push(datos);
		localStorage.setItem('usuario', JSON.stringify(elementos));
	} else {
		elementos.forEach((element) => {
			if (element.nombreUsuario === datos.nombreUsuario) {
				const usuarioEnUso = document.querySelector('.sign__user--reload');

				usuarioEnUso.classList.remove('sign--disabled');

				setTimeout(function () {
					usuarioEnUso.classList.add('sign--disabled');
				}, tiempo);

				formulario.user.value = '';
			} else {
				if (element.correoElectronico === datos.correoElectronico) {
					const correoEnUso = document.querySelector('.sign__email--reload');

					correoEnUso.classList.remove('sign--disabled');

					setTimeout(function () {
						correoEnUso.classList.add('sign--disabled');
					}, tiempo);
					formulario.email.value = '';
				} else {
					formulario.user.value = '';
					formulario.fullName.value = '';
					formulario.email.value = '';
					formulario.password.value = '';
					formulario.repeatPassword.value = '';
					formulario['terms-services'].checked = false;

					elementos.push(datos);
					localStorage.setItem('usuario', JSON.stringify(elementos));
					alert('Se registro exitosamente');
				}
			}
		});
	}
};
