// Evento del botón "Enviar comentario"
let submitButton = document.querySelector('.comentarios__submit');
let commentMessage = document.querySelector('.comentarios__message');

submitButton.addEventListener('click', function () {
	const commentText = document.querySelector('.comentarios__text').value;

	// Crear objeto de comentario
	const comment = {
		id: new Date().getTime().toString(), // Generar un ID único para el comentario
		text: commentText,
		approved: false,
	};

	if (comment.text === '') {
		alert('error');
	} else {
		// Obtener comentarios existentes del localStorage (si los hay)
		let comments = JSON.parse(localStorage.getItem('comments')) || [];

		// Agregar el nuevo comentario
		comments.push(comment);

		// Guardar los comentarios en el localStorage
		localStorage.setItem('comments', JSON.stringify(comments));

		// Mostrar mensaje de confirmación dentro del botón
		commentMessage.textContent = 'El comentario ha sido enviado.';

		// Limpiar la caja de comentarioss
		document.querySelector('.comentarios__text').value = '';

		// Ocultar el mensaje después de 3 segundos
		setTimeout(function () {
			commentMessage.textContent = '';
		}, 3000);
	}
});

// Mostrar los comentarios aprobados al cargar la página
function showApprovedComments() {
	const approvedCommentsList = document.querySelector('.comments-list-approved');
	approvedCommentsList.innerHTML = ''; // Limpiar la lista de comentarios

	// Obtener comentarios del localStorage
	const comments = JSON.parse(localStorage.getItem('comments')) || [];

	// Filtrar los comentarios aprobados
	const approvedComments = comments.filter((comment) => comment.approved);

	// Mostrar los comentarios aprobados en la lista
	approvedComments.forEach((comment) => {
		const commentElement = document.createElement('div');
		commentElement.classList.add('comentarios');
		commentElement.textContent = comment.text;
		approvedCommentsList.appendChild(commentElement);
	});
}

// Evento 'storage' para escuchar cambios en el localStorage
window.addEventListener('storage', function (event) {
	if (event.key === 'comments') {
		showApprovedComments(); // Actualizar la lista de comentarios
	} else if (event.key === 'commentDeleted') {
		const deletedCommentId = event.newValue;

		// Mostrar mensaje en el archivo "notificaciones.html"
		localStorage.setItem('deletedCommentId', deletedCommentId);
	}
});

// Mostrar los comentarios aprobados al cargar la página
showApprovedComments();
