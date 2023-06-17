// Función para mostrar los comentarios pendientes en la página
function showPendingComments() {
	const commentsList = document.querySelector('.comments-list');
	commentsList.innerHTML = ''; // Limpiar la lista de comentarios

	// Obtener comentarios del localStorage
	const comments = JSON.parse(localStorage.getItem('comments')) || [];

	// Filtrar los comentarios pendientes de aprobación
	const pendingComments = comments.filter((comment) => !comment.approved);

	// Mostrar los comentarios pendientes en la lista
	pendingComments.forEach((comment) => {
		const commentElement = document.createElement('div');
		commentElement.classList.add('comment');
		commentElement.id = comment.id;
		commentElement.textContent = comment.text;

		const approveButton = document.createElement('button');
		approveButton.textContent = 'Aprobar';
		approveButton.classList.add('approve-button');
		approveButton.dataset.commentId = comment.id;

		// Evento del botón de aprobación
		approveButton.addEventListener('click', function () {
			const commentId = approveButton.dataset.commentId;

			// Obtener los comentarios del localStorage
			let comments = JSON.parse(localStorage.getItem('comments')) || [];

			// Encontrar el comentario correspondiente y marcarlo como aprobado
			const comment = comments.find((c) => c.id === commentId);
			if (comment) {
				comment.approved = true;
				localStorage.setItem('comments', JSON.stringify(comments));

				// Eliminar el comentario de la lista de pendientes
				const commentElement = document.getElementById(comment.id);
				if (commentElement) {
					commentElement.remove();
				}

				// Enviar una notificación al archivo "notificaciones.html" a través del localStorage
				localStorage.setItem('deletedCommentId', commentId);
			}
		});

		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'Eliminar';
		deleteButton.classList.add('delete-button');
		deleteButton.dataset.commentId = comment.id;

		// Evento del botón de eliminación
		deleteButton.addEventListener('click', function () {
			const commentId = deleteButton.dataset.commentId;

			// Obtener los comentarios del localStorage
			let comments = JSON.parse(localStorage.getItem('comments')) || [];

			// Encontrar y eliminar el comentario correspondiente
			const commentIndex = comments.findIndex((c) => c.id === commentId);
			if (commentIndex !== -1) {
				comments.splice(commentIndex, 1);
				localStorage.setItem('comments', JSON.stringify(comments));

				// Enviar una notificación al archivo "notificaciones.html" a través del localStorage
				localStorage.setItem('deletedCommentId', commentId);

				// Eliminar el comentario de la lista de pendientes
				const commentElement = document.getElementById(commentId);
				if (commentElement) {
					commentElement.remove();
				}
			}
		});

		commentElement.appendChild(approveButton);
		commentElement.appendChild(deleteButton);
		commentsList.appendChild(commentElement);
	});
}

// Evento 'storage' para escuchar cambios en el localStorage
window.addEventListener('storage', function (event) {
	if (event.key === 'comments') {
		showPendingComments(); // Actualizar la lista de comentarios pendientes
	}
});

// Mostrar los comentarios pendientes al cargar la página
showPendingComments();
