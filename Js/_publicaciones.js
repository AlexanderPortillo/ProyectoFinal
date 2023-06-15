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

                    <h3 class="publications__title">${element.titulo}</h3>

                    <p class="publications__text">
                        ${element.descripcion}
                    </p>

                    <span class="publications__date">${element.fecha}</span>

                    <hr class="publications__hr">
                </div>
            `;

			contenedor.innerHTML += plantilla;
		});
	}
};
