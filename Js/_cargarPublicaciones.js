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

// function mostrarAlertaActualizacion() {
// 	const nuevosDatos = {};
// 	nuevosDatos.url = prompt('Ingrese una nueva Url: ');
// 	nuevosDatos.titulo = prompt('Ingrese un nuevo titulo: ');
// 	nuevosDatos.descripcion = prompt('Ingrese una nueva descripcion: ');
// 	nuevosDatos.fecha = prompt('Ingrese una nueva fecha: ');
// 	return nuevosDatos;
// }

function mostrarAlertaActualizacion() {
	const nuevosDatos = {};
  
	// Validación de la URL
	nuevosDatos.url = prompt('Ingrese una nueva URL (deje vacío para mantener la actual): ');
	while (nuevosDatos.url && !/^https:\/\/github\.com\/[^\s/]+\/[^\s/]+\/blob\/main\/[^/?]+\.(jpg|jpeg|png|gif|bmp|svg)\?raw=true$/.test(nuevosDatos.url)) {
	  nuevosDatos.url = prompt('URL inválida. Ingrese una nueva URL válida o deje vacío para mantener la actual: ');
	}
  
	// Validación del título
	nuevosDatos.titulo = prompt('Ingrese un nuevo título (deje vacío para mantener el actual): ');
	while (nuevosDatos.titulo && !/^(?!.*\s\s)[A-Za-z0-9#"$@!*%-_:;¿?={}¡ÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-z0-9#"$@!*%-_:;¿?={}¡ÁÉÍÓÚáéíóúÑñ]+)*$/.test(nuevosDatos.titulo)) {
	  nuevosDatos.titulo = prompt('Título inválido. Ingrese un nuevo título válido o deje vacío para mantener el actual: ');
	}
  
	// Validación de la descripción
	nuevosDatos.descripcion = prompt('Ingrese una nueva descripción (deje vacío para mantener la actual): ');
	while (nuevosDatos.descripcion && !/^(?!.*\s\s)[A-Za-z0-9#"$@!*%-_:;¿?={}¡ÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-z0-9#"$@!*%-_:;¿?={}¡ÁÉÍÓÚáéíóúÑñ]+)*$/.test(nuevosDatos.descripcion)) {
	  nuevosDatos.descripcion = prompt('Descripción inválida. Ingrese una nueva descripción válida o deje vacío para mantener la actual: ');
	}
  
	// Validación de la fecha
	nuevosDatos.fecha = prompt('Ingrese una nueva fecha (deje vacío para mantener la actual): ');
	while (nuevosDatos.fecha && !/^\d{4}-\d{2}-\d{2}$/.test(nuevosDatos.fecha)) {
	  nuevosDatos.fecha = prompt('Fecha inválida. Ingrese una nueva fecha válida (formato: AAAA-MM-DD) o deje vacío para mantener la actual: ');
	}
  
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
