const formulario = document.forms['form'];

export const iniciarSesion = (e) => {
	e.preventDefault();

	const datos = {
		nombreUsuario: formulario.sendUser.value,
		contraseña: formulario.sendPassword.value,
	};

	const elementos = JSON.parse(localStorage.getItem('usuario')) || [];

	elementos.forEach((element) => {
		if (element.nombreUsuario === datos.nombreUsuario) {
			if (element.contraseña === datos.contraseña) {
				alert('coinciden las credenciales');

				const cadena = datos.nombreUsuario;
				const palabra = 'moderador';

				function buscarPalabra(cadena, palabra) {
					var palabras = cadena.split(' '); // Divide la cadena en palabras separadas

					if (palabras.includes(palabra)) {
						return true;
					} else {
						return false;
					}
				}

				if (buscarPalabra(cadena, palabra)) {
					window.location.href = 'moderador.html';
				} else {
					window.location.href = 'usuario.html';
				}
			} else {
				console.log('La contrasela es incorrecta');
			}
		} else {
			console.log('El correo no coincide');
		}
	});
};
