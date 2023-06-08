export const cargarUsuarios = () => {
	const contenedor = document.querySelector('.userdata__table');
	const cargar = JSON.parse(localStorage.getItem('usuario')) || [];

	// cargar.reverse();

	const mensaje = document.querySelector('.userdata__title');

	if (localStorage.getItem('usuario') === null) {
		mensaje.textContent = 'No hay usuarios registrados';
	} else {
		mensaje.textContent = 'Lista de usuarios';

		cargar.forEach((element) => {
			const platilla = `
            <tbody>
                <tr>
                    <td>${element.nombreUsuario}</td>
                    <td>${element.nombreCompleto}</td>
                    <td>${element.correoElectronico}</td>
                    <td><button class="userdata__delete">Eliminar</button></td>
                    <td><button class="userdata__update">Actualizar</button></td>
                </tr>
            </tbody>
        `;

			contenedor.innerHTML += platilla;
		});
	}
};
