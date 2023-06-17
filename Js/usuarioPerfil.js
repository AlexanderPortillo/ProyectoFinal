const btn = document.querySelector('.user__btn');

btn.addEventListener('click', buscarPerfil);

function buscarPerfil() {
	const bloquear = document.querySelector('.user__data');
	const desbloquear = document.querySelector('.user__profile');
	const usuario = document.getElementById('user');
	const verificarUsuario = usuario.value;

	const contraseña = document.getElementById('password');
	const verificarContraseña = contraseña.value;

	let elementos = JSON.parse(localStorage.getItem('usuario')) || [];
	let encontrado = false;

	for (let i = 0; i < elementos.length; i++) {
		const elemento = elementos[i];

		if (
			elemento.nombreUsuario === verificarUsuario &&
			elemento.contraseña === verificarContraseña
		) {
			mostrarUsuario(elemento);
			usuario.value = '';
			contraseña.value = '';
			bloquear.classList.add('disabled');
			desbloquear.classList.remove('disabled');
			encontrado = true;
			break;
		}

		if (!encontrado) {
			alert('No se encontro el elemento en el localstorage');
		}
	}
}

function mostrarUsuario(elemento) {
	let contenedor = document.querySelector('.user__profile');
	contenedor.innerHTML = '';

	const plantilla = `
		<label class="user__label">
			<h4 class="user__profile--title">Nombre de usuario</h4>
			<span class="user__profile--data">${elemento.nombreUsuario}</span>
		</label>

		<label class="user__label">
			<h4 class="user__profile--title">Nombre completo</h4>
			<span class="user__profile--data">${elemento.nombreCompleto}</span>
		</label>

		<label class="user__label">
			<h4 class="user__profile--title">Correo electronico</h4>
			<span class="user__profile--data">${elemento.correoElectronico}</span>
		</label>

		<label class="user__label">
			<h4 class="user__profile--title">Contraseña</h4>
			<span class="user__profile--data">${elemento.contraseña}</span>
		</label>

		<button onclick="actualizarPerfil('${elemento.nombreUsuario}')" class="user__profile--btn">Actualizar</button>
    `;

	contenedor.innerHTML = plantilla;
}

function actualizarPerfil(nombreUsuario) {
	let elementos = JSON.parse(localStorage.getItem('usuario')) || [];
  
	let elemento = elementos.find(function (element) {
	  return element.nombreUsuario === nombreUsuario;
	});
  
	if (elemento) {
	  const nombreRegex = /^(?!.*\s\s)(?=.*.{5,})[A-Za-z0-9#"$@!*%\-_:;¿?={}¡]+(?: [A-Za-z0-9#"$@!*%\-_:;¿?={}¡]+)*$/;
	  const correoRegex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
	  const contraseñaRegex = /^(?=.*.{8,})[A-Za-z0-9#"$@/!*-]+$/;
  
	  let nuevoNombreCompleto = prompt('Ingrese el nuevo nombre completo:');
	  while (nuevoNombreCompleto && !nombreRegex.test(nuevoNombreCompleto)) {
		nuevoNombreCompleto = prompt('El nombre no cumple con los caracteres requeridos. Ingrese el nuevo nombre completo:');
	  }
	  if (nuevoNombreCompleto) {
		elemento.nombreCompleto = nuevoNombreCompleto;
	  }
  
	  let nuevoCorreoElectronico = prompt('Ingrese el nuevo correo electrónico:');
	  if (nuevoCorreoElectronico && !correoRegex.test(nuevoCorreoElectronico)) {
		nuevoCorreoElectronico = prompt('El correo electrónico no es válido. Ingrese el nuevo correo electrónico:');
	  }
	  if (nuevoCorreoElectronico) {
		elemento.correoElectronico = nuevoCorreoElectronico;
	  }
  
	  let nuevaContraseña = prompt('Ingrese la nueva contraseña:');
	  if (nuevaContraseña && !contraseñaRegex.test(nuevaContraseña)) {
		nuevaContraseña = prompt('La contraseña no cumple con los caracteres requeridos. Ingrese la nueva contraseña:');
	  }
	  if (nuevaContraseña) {
		elemento.contraseña = nuevaContraseña;
	  }
  
	  let confirmarNuevaContraseña = prompt('Repita la contraseña: ');
	  if (confirmarNuevaContraseña !== nuevaContraseña) {
		confirmarNuevaContraseña = prompt('Las contraseñas no coinciden. Repita la contraseña:');
	  }
	  if (confirmarNuevaContraseña) {
		elemento.confirmarContraseña = confirmarNuevaContraseña;
	  }
  
	  localStorage.setItem('usuario', JSON.stringify(elementos));
  
	  mostrarUsuario(elemento);
	}
  }
  
  
  
  
  
  