const btn = document.querySelector('.user__btn');

btn.addEventListener('click', buscarPerfil);

function buscarPerfil() {
	const bloquear = document.querySelector('.user__data');
	const desbloquear = document.querySelector('.user__profile');
	const usuario = document.getElementById('user');
	const verificarUsuario = usuario.value;

	const contraseña = document.getElementById('password');
	const verificarContraseña = contraseña.value;

	let elementos = JSON.parse(localStorage.getItem('usuario')) || [];
	let encontrado = false;

	for (let i = 0; i < elementos.length; i++) {
		const elemento = elementos[i];

		if (
			elemento.nombreUsuario === verificarUsuario &&
			elemento.contraseña === verificarContraseña
		) {
			mostrarUsuario(elemento);
			usuario.value = '';
			contraseña.value = '';
			bloquear.classList.add('disabled');
			desbloquear.classList.remove('disabled');
			encontrado = true;
			break;
		}

		if (!encontrado) {
			alert('No se encontro el elemento en el localstorage');
		}
	}
}

function mostrarUsuario(elemento) {
	let contenedor = document.querySelector('.user__profile');
	contenedor.innerHTML = '';

	const plantilla = `
        <label>Nombre de usuario:</label>
        <span>${elemento.nombreUsuario}</span><br>
        <label>Nombre completo:</label>
        <span>${elemento.nombreCompleto}</span><br>
        <label>Correo electrónico:</label>
        <span>${elemento.correoElectronico}</span><br>
        <label>Contraseña:</label>
        <span>${elemento.contraseña}</span><br>
        <button onclick="actualizarPerfil('${elemento.nombreUsuario}')">Actualizar</button>
    `;

	contenedor.innerHTML = plantilla;
}

function actualizarPerfil(nombreUsuario) {
	let elementos = JSON.parse(localStorage.getItem('usuario')) || [];

	let elemento = elementos.find(function (element) {
		return element.nombreUsuario === nombreUsuario;
	});

	if (elemento) {
		let nuevoNombreCompleto = prompt('Ingrese el nuevo nombre completo:');
		let nuevoCorreoElectronico = prompt('Ingrese el nuevo correo electrónico:');
		let nuevaContraseña = prompt('Ingrese la nueva contraseña:');

		elemento.nombreCompleto = nuevoNombreCompleto || elemento.nombreCompleto;
		elemento.correoElectronico = nuevoCorreoElectronico || elemento.correoElectronico;
		elemento.contraseña = nuevaContraseña || elemento.contraseña;
		elemento.confirmarContraseña = elemento.contraseña || nuevaContraseña;

		localStorage.setItem('usuario', JSON.stringify(elementos));

		mostrarUsuario(elemento);
	}
}
