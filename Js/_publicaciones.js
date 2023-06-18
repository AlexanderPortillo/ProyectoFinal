let cargar = JSON.parse(localStorage.getItem('post')) || [];

export const cargarPost = () => {
	const contenedor = document.querySelector('.publications');
	const mensaje = document.querySelector('.publications__content');

	cargar.reverse();

	if (localStorage.getItem('post') === null) {
		mensaje.classList.remove('publications--disabled');
	} else {
		cargar.forEach((element) => {
			const plantilla = `
                <div class="publications__card">
                    <div class="publications__img">
                        <img src="${element.url}" alt="img">
                    </div>

                    <h3 class="publications__title" title="Nombre de la pelicula">${element.titulo}</h3>

                    <p class="publications__text" title="Descripcion de la pelicula">
                        ${element.descripcion}
                    </p>

                    <span class="publications__date" title="fecha de estreno">${element.fecha}</span>

                    <hr class="publications__hr">

					<div class="publications__creator">
						<span class="publications__span">
							<span class="publications__text" title="Publicacion creada por">${element.creador}</span>
						</span>
						<span class="publications__time" title="fecha de creacion de la publicacion">${element.fechaCreacion}</span>
					</div>
                </div>
            `;
			/********************************************************************************************** */
			const CajaComentario = `
            <div class="publications__box">
				<h2>Comentarios</h2>
				<div class="content">
				<div class="comments-list-approved"></div>
				</div>

				<div class="comentarios__form">
    			<textarea class="comentarios__text" placeholder="Escribe tu comentario"></textarea>
    			<button class="comentarios__submit">Enviar Comentario</button>
    			<p class="comentarios-message"></p>
  				</div>
			</div>
            `;
			/********************************************************************************************** */

			contenedor.innerHTML += plantilla;

			/********************************************************************************************** */
			contenedor.innerHTML += CajaComentario;
			/********************************************************************************************** */
		});
	}
};
