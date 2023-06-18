let cargar = JSON.parse(localStorage.getItem('usuario')) || [];

export const cargarUsuarios = () => {
	const contenedor = document.querySelector('.userdata__table');

	const mensaje = document.querySelector('.userdata__title');

	if (localStorage.getItem('usuario') === null) {
		mensaje.textContent = 'No hay usuarios registrados';
	} else {
		mensaje.textContent = 'Lista de usuarios';

		cargar.forEach((element, i) => {
			const platilla = `
            <tbody class="userdata__body">
                <tr>
                    <td>${element.nombreUsuario}</td>
                    <td>${element.nombreCompleto}</td>
                    <td>${element.correoElectronico}</td>
                    <td><button class="userdata__delete btn-eliminar" data-index="${i}">Eliminar</button></td>
                    <td><button class="userdata__update btn-actualizar" data-index="${i}">Actualizar</button></td>
                </tr>
            </tbody>
        `;

			contenedor.innerHTML += platilla;
		});

		// Agregar evento de escucha a todos los botones de eliminación
		const btnsEliminar = document.querySelectorAll('.btn-eliminar');

		btnsEliminar.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				const index = e.target.dataset.index;
				eliminar(index);
			});
		});

		// Agregar evento de escucha a todos los botones de actualización
		const btnsActualizar = document.querySelectorAll('.btn-actualizar');
		btnsActualizar.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				const index = e.target.dataset.index;
				// Mostrar alerta para obtener los nuevos valores
				const nuevosDatos = mostrarAlertaActualizacion();
				actualizarElemento(index, nuevosDatos);
			});
		});
	}
};

function eliminar(i) {
	cargar.splice(i, 1);
	actualizarlocalStorage();
	actualizarInterfaz();
}

function actualizarlocalStorage() {
	localStorage.setItem('usuario', JSON.stringify(cargar));
}

function actualizarInterfaz() {
	const contenedor = document.querySelector('.userdata__body');
	contenedor.innerHTML = '';
	cargarUsuarios();
}

function mostrarAlertaActualizacion() {
    const nuevosDatos = {};
    const expresionRegularUsuario = /^(?!.*\s\s)(?=.*.{5,})[A-Za-z0-9#"$@!*%\-_:;¿?={}¡]+(?: [A-Za-z0-9#"$@!*%\-_:;¿?={}¡]+)*$/;
    const expresionRegularNombre = /^(?!.*\s\s)(?=.*.{5,})[A-Za-z0-9#"$@!*%\-_:;¿?={}¡]+(?: [A-Za-z0-9#"$@!*%\-_:;¿?={}¡]+)*$/;
    const expresionRegularCorreo = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

    let nombreUsuario = prompt('Ingrese el nuevo nombre de usuario (dejar en blanco para mantener el anterior)');

    while (
        nombreUsuario !== null && nombreUsuario !== '' && !expresionRegularUsuario.test(nombreUsuario)
    ) {
        alert('El nombre de usuario no cumple con el formato requerido');
        nombreUsuario = prompt('Ingrese el nuevo nombre de usuario (dejar en blanco para mantener el anterior)');
    }

    if (nombreUsuario !== null && nombreUsuario !== '') {
        const usuarioExistente = cargar.find((element) => element.nombreUsuario === nombreUsuario);

        if (usuarioExistente) {
            alert('El nombre de usuario ya existe. Ingrese un nombre de usuario diferente.');
            return mostrarAlertaActualizacion();
        }

        nuevosDatos.nombreUsuario = nombreUsuario;
    }

    let nombreCompleto = prompt(
        'Ingrese el nuevo nombre completo (dejar en blanco para mantener el anterior)'
    );

    while (nombreCompleto !== null && nombreCompleto !== '' && !expresionRegularNombre.test(nombreCompleto)) {
        alert('El nombre completo no cumple con el formato requerido');
        nombreCompleto = prompt('Ingrese el nuevo nombre completo (dejar en blanco para mantener el anterior)');
    }

    if (nombreCompleto !== null && nombreCompleto !== '') {
        nuevosDatos.nombreCompleto = nombreCompleto;
    }

    let correoElectronico = prompt('Ingrese el nuevo correo electrónico (dejar en blanco para mantener el anterior)');

while (correoElectronico !== null && correoElectronico !== '' && !expresionRegularCorreo.test(correoElectronico)) {
    alert('El correo electrónico no cumple con el formato requerido');
    correoElectronico = prompt('Ingrese el nuevo correo electrónico (dejar en blanco para mantener el anterior)');
}

if (correoElectronico !== null && correoElectronico !== '') {
    let correoExistente = cargar.find((element) => element.correoElectronico === correoElectronico);

    while (correoExistente) {
        alert('El correo electrónico ya existe. Ingrese un correo electrónico diferente.');
        correoElectronico = prompt('Ingrese un nuevo correo electrónico (dejar en blanco para mantener el anterior)');

        if (correoElectronico === null || correoElectronico === '') {
            break;
        }

        correoExistente = cargar.find((element) => element.correoElectronico === correoElectronico);
    }

    if (correoElectronico !== null && correoElectronico !== '') {
        nuevosDatos.correoElectronico = correoElectronico;
    }
}


    return nuevosDatos;
}

function actualizarElemento(i, nuevosDatos) {
	const elemento = cargar[i];
	if (elemento) {
		elemento.nombreUsuario = nuevosDatos.nombreUsuario || elemento.nombreUsuario;
		elemento.nombreCompleto = nuevosDatos.nombreCompleto || elemento.nombreCompleto;
		elemento.correoElectronico = nuevosDatos.correoElectronico || elemento.correoElectronico;
		actualizarlocalStorage();
		actualizarInterfaz();
	}
}
