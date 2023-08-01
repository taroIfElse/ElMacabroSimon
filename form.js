document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector("form");
  formulario.addEventListener("submit", function () {
    if (
      !validadorNombre() ||
      !validadorApellido() ||
      !validadorEdad() ||
      !validadorMensaje() ||
      !validadorNivel() ||
      !validadorPuntos()
    ) {
      return false;
    }
    formulario.submit();
  });
});

function validadorNombre() {
  const nombreInput = document.getElementById("nombre");
  const nombre = nombreInput.value.trim();
  if (nombre === "") {
    mostrarModalError("Por favor introduzca un nombre");
    return false;
  }
  return true;
}

function validadorApellido() {
  const apellidoInput = document.getElementById("apellido");
  const apellido = apellidoInput.value.trim();
  if (apellido === "") {
    mostrarModalError("Por favor introduzca un apellido");
    return false;
  }
  return true;
}

function validadorEdad() {
  const edadInput = document.getElementById("edad");
  const edad = parseInt(edadInput.value);
  if (isNaN(edad) || edad <= 0) {
    mostrarModalError("Tiene que ser un numero mayor a 0");
    return false;
  }
  return true;
}

function validadorPuntos() {
  const puntosMaximosInput = document.getElementById("puntos-maximos");
  const puntosMaximos = parseInt(puntosMaximosInput.value);
  if (isNaN(puntosMaximos) || puntosMaximos < 0) {
    mostrarModalError("Tiene que ser un numero mayor a 0");
    return false;
  }
  return true;
}

function validadorNivel() {
  const nivelMaximoInput = document.getElementById("nivel-maximo");
  const nivelMaximo = parseInt(nivelMaximoInput.value);
  if (isNaN(nivelMaximo) || nivelMaximo < 0) {
    mostrarModalError("Tiene que ser un numero mayor a 0");
    return false;
  }
  return true;
}

function validadorMensaje() {
  const mensajeInput = document.getElementById("mensaje");
  const mensaje = mensajeInput.value.trim();
  if (mensaje === "") {
    mostrarModalError("El mensaje es obligatorio");
    return false;
  }
  return true;
}

function mostrarModalError(mensaje) {
  var modal = document.getElementById("modal");
  var mensajeError = document.getElementById("mensajeError");
  mensajeError.textContent = mensaje;
  modal.style.display = "block";
}

function cerrarModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
}
