const formulario = document.forms['form'];
let tiempo = 2000;
let administrador = '';

export const crearPost = (e) => {
	e.preventDefault();

	const elementos = JSON.parse(localStorage.getItem('post')) || [];

	// Verificar si el elemento ya existe
	const elementosGuardados = elementos;

	const validarUrl =
		/^https:\/\/github\.com\/[^\s/]+\/[^\s/]+\/blob\/main\/[^/?]+\.(jpg|jpeg|png|gif|bmp|svg)\?raw=true$/;
	const validarTitulo =
		/^(?!.*\s\s)[A-Za-z0-9#"$@!*%-_:;¿?={}¡ÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-z0-9#"$@!*%-_:;¿?={}¡ÁÉÍÓÚáéíóúÑñ]+)*$/u;
	const validarDescripcion =
		/^(?!.*\s\s)[A-Za-z0-9#"$@!*%-_:;¿?={}¡ÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-z0-9#"$@!*%-_:;¿?={}¡ÁÉÍÓÚáéíóúÑñ]+)*$/u;

	const datos = {
		id: uuid.v4(),
		url: formulario.url.value,
		titulo: formulario.title.value,
		fecha: formulario.date.value,
		descripcion: formulario.description.value,
		creador: administrador,
		fechaCreacion: fechaDeCreacion(),
	};

	if (!validarUrl.test(datos.url)) {
		const errorUrl = document.querySelector('.post__url--error');
		errorUrl.classList.remove('post--disabled');

		setTimeout(function () {
			errorUrl.classList.add('post--disabled');
		}, tiempo);
		return;
	}

	const ExisteUrl = elementosGuardados.find((elemento) => elemento.url === datos.url);
	if (ExisteUrl) {
		const UrlRepetida = document.querySelector('.post__repeatUrl--error');
		UrlRepetida.classList.remove('post--disabled');

		formulario.url.value = '';
		setTimeout(function () {
			UrlRepetida.classList.add('post--disabled');
		}, tiempo);
		return;
	}

	if (!validarTitulo.test(datos.titulo)) {
		const errorTitulo = document.querySelector('.post__title--error');
		errorTitulo.classList.remove('post--disabled');

		setTimeout(function () {
			errorTitulo.classList.add('post--disabled');
		}, tiempo);
		return;
	}

	const ExisteTitulo = elementosGuardados.find((elemento) => elemento.titulo === datos.titulo);
	if (ExisteTitulo) {
		const tituloRepetido = document.querySelector('.post__repeatTitle--error');
		tituloRepetido.classList.remove('post--disabled');

		formulario.title.value = '';
		setTimeout(function () {
			tituloRepetido.classList.add('post--disabled');
		}, tiempo);
		return;
	}

	if (!formulario.date.value) {
		const errorDate = document.querySelector('.post__date--error');
		errorDate.classList.remove('post--disabled');

		setTimeout(function () {
			errorDate.classList.add('post--disabled');
		}, tiempo);
		return;
	}

	if (!validarDescripcion.test(datos.descripcion)) {
		const errorDescripcion = document.querySelector('.post__description--error');
		errorDescripcion.classList.remove('post--disabled');

		setTimeout(function () {
			errorDescripcion.classList.add('post--disabled');
		}, tiempo);
		return;
	}

	formulario.url.value = '';
	formulario.title.value = '';
	formulario.date.value = '';
	formulario.description.value = '';

	elementos.push(datos);
	localStorage.setItem('post', JSON.stringify(elementos));

	let mensaje = document.getElementById('post__button');
	mensaje.style.color = 'white';
	mensaje.style.fontSize = '1rem';
	mensaje.textContent = 'Se enviaron los datos';

	setTimeout(function () {
		mensaje.style.color = 'white';
		mensaje.style.fontSize = '1rem';
		mensaje.textContent = 'Crear nueva publicacion';
	}, tiempo);
};

function fechaDeCreacion() {
	let fecha = new Date();

	let opciones = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	};

	let horaCreacion = fecha.toLocaleString('es-MX', opciones);
	return horaCreacion;
}
