let cargar = JSON.parse(localStorage.getItem('post')) || [];

export const cargarPost = () => {
	const contenedor = document.querySelector('.publications');
	const mensaje = document.querySelector('.publications__content');

	cargar.reverse();

	if (localStorage.getItem('post') === null) {
		mensaje.classList.remove('publications--disabled');
	} else {
		//mensaje.classList.add('publications--disabled');

		cargar.forEach((element, i) => {
			const plantilla = `
                <div class="publications__card">
                    <div class="publications__img">
                        <img src="${element.url}" alt="img">
                    </div>

                    <h3 class="publications__title">${element.titulo}</h3>

                    <p class="publications__text">
                        ${element.descripcion}
                    </p>

                    <span class="publications__date">${element.fecha}</span>

                    <hr class="publications__hr">

                    <div class="publications__buttons">
                        <button class="userdata__delete btn-eliminar" data-index="${i}">Eliminar</button>
                        <button class="userdata__update btn-actualizar" data-index="${i}">Actualizar</button>
                    </div>
                </div>
            `;

			contenedor.innerHTML += plantilla;
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
	localStorage.setItem('post', JSON.stringify(cargar));
}

function actualizarInterfaz() {
	const contenedor = document.querySelector('.publications');
	contenedor.innerHTML = '';
	cargarPost();
}

function mostrarAlertaActualizacion() {
	const nuevosDatos = {};
	nuevosDatos.url = prompt('Ingrese una nueva Url: ');
	nuevosDatos.titulo = prompt('Ingrese un nuevo titulo: ');
	nuevosDatos.descripcion = prompt('Ingrese una nueva descripcion: ');
	nuevosDatos.fecha = prompt('Ingrese una nueva fecha: ');
	return nuevosDatos;
}

function actualizarElemento(i, nuevosDatos) {
	const elemento = cargar[i];
	if (elemento) {
		elemento.url = nuevosDatos.url || elemento.url;
		elemento.titulo = nuevosDatos.titulo || elemento.titulo;
		elemento.descripcion = nuevosDatos.descripcion || elemento.descripcion;
		elemento.fecha = nuevosDatos.fecha || elemento.fecha;
		actualizarlocalStorage();
		actualizarInterfaz();
	}
}
