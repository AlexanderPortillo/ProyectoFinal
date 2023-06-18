const buscar = document.getElementById('user__btn-search');
buscar.addEventListener('click', buscarPost);

function buscarPost() {
	const buscar = document.getElementById('search');
	const verificarPost = buscar.value;

	let elementos = JSON.parse(localStorage.getItem('post')) || [];
	let encontrado = false;

	for (let i = 0; i < elementos.length; i++) {
		const elemento = elementos[i];

		if (elemento.titulo === verificarPost) {
			mostrarPost(elemento);
			buscar.value = '';
			encontrado = true;
			break;
		}

		if (!encontrado) {
			alert('No se encontro la publicacion');
			buscar.value = '';
		}
	}
}

function mostrarPost(elemento) {
	let contenedor = document.querySelector('.publication');
	contenedor.innerHTML = '';

	const plantilla = `
        <div class="publications__card">
            <div class="publications__img">
                <img src="${elemento.url}" alt="img">
            </div>

            <h3 class="publications__title">${elemento.titulo}</h3>

            <p class="publications__text">
                ${elemento.descripcion}
            </p>

            <span class="publications__date">${elemento.fecha}</span>

            <hr class="publications__hr">

			<div class="publications__creator">
				<span class="publications__span">
					<span class="publications__logo">logo</span>
					<span class="publications__text">AlexPor</span>
				</span>
				<span class="publications__time">102728</span>
			</div>
        </div>
            `;

	contenedor.innerHTML = plantilla;
}

// export const cargarPost = () => {
// 	const contenedor = document.querySelector('.publications');
// 	const mensaje = document.querySelector('.publications__content');

// 	const cargar = JSON.parse(localStorage.getItem('post')) || [];

// 	cargar.reverse();

// 	if (localStorage.getItem('post') === null) {
// 		mensaje.classList.remove('publications--disabled');
// 	} else {
// 		cargar.forEach((element) => {
// 			const plantilla = `
//           <div class="publications__card">
//             <div class="publications__img">
//               <img src="${element.url}" alt="img">
//             </div>
//             <h3 class="publications__title">${element.titulo}</h3>
//             <p class="publications__text">${element.descripcion}</p>
//             <span class="publications__date">${element.fecha}</span>
//             <hr class="publications__hr">
//           </div>
//         `;

// 			const CajaComentario = `
//           <div class="publications__box">
//             <h2>Comentarios</h2>
//             <div class="content">
//               <div class="comments-list-approved"></div>
//             </div>

//             <div class="comentarios__form">
//               <textarea class="comentarios__text" placeholder="Escribe tu comentario"></textarea>
//               <button class="comentarios__submit">Enviar Comentario</button>
//               <p class="comentarios-message"></p>
//             </div>
//           </div>
//         `;

// 			contenedor.innerHTML += plantilla;
// 			contenedor.innerHTML += CajaComentario;
// 		});
// 	}
// };

// document.getElementById('btnBuscar').addEventListener('click', buscarPublicaciones);

// function buscarPublicaciones() {
// 	const inputBuscarPublicacion = document.getElementById('inputBuscarPublicacion');
// 	const filtro = inputBuscarPublicacion.value.toLowerCase();

// 	const cards = document.querySelectorAll('.publications__card');

// 	cards.forEach((card) => {
// 		const titulo = card.querySelector('.publications__title').textContent.toLowerCase();
// 		if (titulo.includes(filtro)) {
// 			card.style.display = 'block';
// 		} else {
// 			card.style.display = 'none';
// 		}
// 	});
// }
