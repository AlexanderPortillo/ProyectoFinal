export const cargarUsuarios = () => {
	const contenedor = document.querySelector('.user__table');
	const cargar = JSON.parse(localStorage.getItem('usuario')) || [];

	cargar.reverse();

	if (localStorage.getItem('usuario') === null) {
		alert('No hay usuarios');
	} else {
		cargar.forEach((element) => {
			const platilla = `
            <tbody>
                <tr>
                    <td>${element.nombreUsuario}</td>
                    <td>${element.nombreCompleto}</td>
                    <td>${element.correoElectronico}</td>
                    <td><button>Eliminar</button></td>
                    <td><button>Actualizar</button></td>
                </tr>
            </tbody>
        `;

			contenedor.innerHTML += platilla;
		});
	}
};
