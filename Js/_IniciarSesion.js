const formulario = document.forms['form'];
const moderador = '';
const contraseña = '';

export const iniciarSesion = (e) => {
	e.preventDefault();

	const datos = {
		nombreUsuario: formulario.sendUser.value,
		contraseña: formulario.sendPassword.value,
	};

	const elementos = JSON.parse(localStorage.getItem('usuario')) || [];

	if (datos.nombreUsuario === moderador && datos.contraseña === contraseña) {
		formulario.sendUser.value = '';
		formulario.sendPassword.value = '';
		window.location.href = '../Html/moderador.html';
	} else {
		elementos.forEach((element) => {
			if (element.nombreUsuario === datos.nombreUsuario) {
				if (element.contraseña === datos.contraseña) {
					alert('coinciden las credenciales');
					formulario.sendUser.value = '';
					formulario.sendPassword.value = '';
					window.location.href = '../Html/usuario.html';
				} else {
					alert('no coinciden las credenciales');
				}
			}
		});
	}
};
