let cargar = JSON.parse(localStorage.getItem('usuario')) || [];

export const cargarUsuarios = () => {
	const contenedor = document.querySelector('.userdata__table');

	// cargar.reverse();

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
	nuevosDatos.nombreUsuario = prompt('Ingrese el nuevo nombre de usuario');
	nuevosDatos.nombreCompleto = prompt('Ingrese el nuevo nombre');
	nuevosDatos.correoElectronico = prompt('Ingrese el nuevo correo electronico');
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
