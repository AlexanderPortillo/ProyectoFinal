const formulario = document.forms['form'];

export const enviarDatos = (e) => {
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

	const elementos = JSON.parse(localStorage.getItem('usuario')) || [];

	formulario.user.value = '';
	formulario.fullName.value = '';
	formulario.email.value = '';
	formulario.password.value = '';
	formulario.repeatPassword.value = '';

	elementos.push(datos);

	localStorage.setItem('usuario', JSON.stringify(elementos));
};

