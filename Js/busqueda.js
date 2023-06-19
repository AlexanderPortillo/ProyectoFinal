const buscar = document.getElementById('user__btn-search');
buscar.addEventListener('click', buscarPost);

function buscarPost(e) {
	e.preventDefault();
	const buscar = document.getElementById('search');
	const verificarPost = buscar.value.toLowerCase(); // Convertir a minúsculas para una comparación no sensible a mayúsculas y minúsculas
	if (buscar.value === '') {
		alert('Coloque el nombre de la pelicula que desea buscar');
	} else {
		let elementos = JSON.parse(localStorage.getItem('post')) || [];
		let encontrados = [];

		for (let i = 0; i < elementos.length; i++) {
			const elemento = elementos[i];

			if (elemento.titulo.toLowerCase().includes(verificarPost)) {
				// Usar includes() para verificar si la palabra buscada está presente en el título
				encontrados.push(elemento);
			}
		}

		if (encontrados.length > 0) {
			mostrarPublicaciones(encontrados);
		} else {
			alert('No se encontraron publicaciones');
		}

		buscar.value = '';
	}
}

function mostrarPublicaciones(publicaciones) {
	let contenedor = document.querySelector('.publication');
	contenedor.innerHTML = '';

	for (let i = 0; i < publicaciones.length; i++) {
		const elemento = publicaciones[i];

		const plantilla = `
			<div class="publications__card">
				<div class="publications__img">
					<img src="${elemento.url}" alt="img">
				</div>

				<h3 class="publications__title" title="Nombre de la pelicula">${elemento.titulo}</h3>

				<p class="publications__text" title="Descripcion de la pelicula">
					${elemento.descripcion}
				</p>

				<span class="publications__date" title="fecha de estreno">${elemento.fecha}</span>

				<hr class="publications__hr">

				<div class="publications__creator">
					<span class="publications__span">
						<span class="publications__text" title="Publicacion creada por">${elemento.creador}</span>
					</span>
					<span class="publications__time" title="fecha de creacion de la publicacion">${elemento.fechaCreacion}</span>
				</div>
			</div>
        `;

		contenedor.innerHTML += plantilla;
	}
}