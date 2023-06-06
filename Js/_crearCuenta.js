const formulario = document.forms['form'];

export const crearCuenta = (e) => {
	e.preventDefault();

	const expresionRegularUsuario = /^(?! )(?!.* $)(?!.*  )[\w ]+$/;
	const expresionRegularNombre = /^(?! )(?!.* $)(?!.*  )[\w ]+$/;
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
		console.log('El usuario es invalido');
		return;
	}

	if (!expresionRegularNombre.test(datos.nombreCompleto)) {
		console.log('El nombre es invalido');
		return;
	}

	if (!expresionRegularCorreo.test(datos.correoElectronico)) {
		console.log('El correo es invalido');
		return;
	}

	if (!expresionRegularContraseña.test(datos.contraseña)) {
		console.log('La contraseña es invalida');
		return;
	}

	if (datos.contraseña !== datos.confirmarContraseña) {
		console.log('Las contraseñas no coinciden');
		return;
	}

	if (!datos.aceptarCondiciones) {
		console.log('Acepta los terminos y condiciones');
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
				alert('El nombre de usuario ya se encuentra registrado');
				formulario.user.value = '';
			} else {
				if (element.correoElectronico === datos.correoElectronico) {
					alert('El correo electronico ya se encuentra registrado');
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
				}
			}
		});
	}
};
