const formulario = document.forms['form'];
let tiempo = 2000;

export const crearPost = (e) => {
	e.preventDefault();

	const elementos = JSON.parse(localStorage.getItem('post')) || [];

	const validarUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*[^\s\/]$/;
	const validarTitulo = /^(?!.*\s)[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;
	const validarDescripcion = /^(?!.*\s)[A-Za-z0-9#"$@!*%-_:;¿?={}¡]+$/;

	const datos = {
		id: uuid.v4(),
		url: formulario.url.value,
		titulo: formulario.title.value,
		fecha: formulario.date.value,
		descripcion: formulario.description.value,
	};

	if (!validarUrl.test(datos.url)) {
		const errorUrl = document.querySelector('.post__url--error');
		errorUrl.classList.remove('post--disabled');

		setTimeout(function () {
			errorUrl.classList.add('post--disabled');
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

	if (localStorage.getItem('post') === null) {
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
	} else {
		elementos.forEach((element) => {
			if (element.url === datos.url) {
				const UrlRepetida = document.querySelector('.post__repeatUrl--error');
				UrlRepetida.classList.remove('post--disabled');

				formulario.url.value = '';
				setTimeout(function () {
					UrlRepetida.classList.add('post--disabled');
				}, tiempo);
				return;
			} else {
				if (element.titulo === datos.titulo) {
					const tituloRepetido = document.querySelector('.post__repeatTitle--error');
					tituloRepetido.classList.remove('post--disabled');

					formulario.title.value = '';
					setTimeout(function () {
						tituloRepetido.classList.add('post--disabled');
					}, tiempo);
					return;
				} else {
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
						mensaje.style.fontSize = '1rem';
						mensaje.style.color = 'white';
						mensaje.textContent = 'Crear nueva publicacion';
					}, tiempo);
				}
			}
		});
	}
};
