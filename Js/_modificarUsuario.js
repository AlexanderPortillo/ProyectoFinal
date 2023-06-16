function buscarPerfil() {
	let bloquear = document.querySelector('.user__data');
	let usuario = document.getElementById('user');
	let verificarUsuario = usuario.value;

	let contraseña = document.getElementById('password');
	let verificarContraseña = contraseña.value;

	let elementos = JSON.parse(localStorage.getItem('usuario')) || [];
	let encontrado = false;

	for (let i = 0; i < elementos.length; i++) {
		const elemento = elementos[i];

		if (
			elemento.nombreUsuario === verificarUsuario &&
			elemento.contraseña === verificarContraseña
		) {
			mostrarUsuario(elemento);
			encontrado = true;
			usuario.value = '';
			contraseña.value = '';
			bloquear.classList.add('disabled');
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
        <button onclick="actualizarElemento('${elemento.nombreUsuario}')">Actualizar</button>
    `;

	contenedor.innerHTML = plantilla;
}

// let elementos = JSON.parse(localStorage.getItem('usuario')) || [];

// export const modificarUsuario = (e) => {
// 	e.preventDefault();

// 	const contenedor = document.querySelector('.user__profile');

// 	const usuario = document.getElementById('user');
// 	const contraseña = document.getElementById('password');

// 	const verificarUsuario = usuario.value;
// 	const verificarContraseña = contraseña.value;

// 	for (let i = 0; i < elementos.length; i++) {
// 		const element = elementos[i];

// 		if (
// 			element.nombreUsuario === verificarUsuario &&
// 			element.contraseña === verificarContraseña
// 		) {
// 			usuario.value = '';
// 			contraseña.value = '';

// 			contenedor.innerHTML = '';
// 			const plantilla = `
// 			    <label>Nombre de usuario:</label>
// 			    <span>${element.nombreUsuario}</span><br>
// 			    <label>Nombre completo:</label>
// 			    <span>${element.nombreCompleto}</span><br>
// 			    <label>Correo electrónico:</label>
// 			    <span>${element.correoElectronico}</span><br>
// 			    <label>Contraseña:</label>
// 			    <span>${element.contraseña}</span><br>
// 			    <button onclick="actualizarElemento('${element.nombreUsuario}')">Actualizar</button>
// 			`;
// 			contenedor.innerHTML = plantilla;
// 		} else {
// 		}
// 	}
// };

// function actualizarElemento(nombreUsuario) {
// 	const elemento = elementos.find(function (element) {
// 		return element.nombreUsuario === nombreUsuario;
// 	});

// 	if (elemento) {
// 	}
// }
