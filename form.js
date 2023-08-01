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
    mostrarError(nombreInput, "El nombre es obligatorio");
    return false;
  }
  return true;
}

function validadorApellido() {
  const apellidoInput = document.getElementById("apellido");
  const apellido = apellidoInput.value.trim();
  if (apellido === "") {
    mostrarError(apellidoInput, "El apellido es obligatorio");
    return false;
  }
  return true;
}

function validadorEdad() {
  const edadInput = document.getElementById("edad");
  const edad = parseInt(edadInput.value);
  if (isNaN(edad) || edad <= 0) {
    mostrarError(
      edadInput,
      "La edad debe ser un número válido y mayor que cero"
    );
    return false;
  }
  return true;
}

function validadorPuntos() {
  const puntosMaximosInput = document.getElementById("puntos-maximos");
  const puntosMaximos = parseInt(puntosMaximosInput.value);
  if (isNaN(puntosMaximos) || puntosMaximos < 0) {
    mostrarError(
      puntosMaximosInput,
      "Los puntos máximos deben ser un número válido y mayor o igual a cero"
    );
    return false;
  }
  return true;
}

function validadorNivel() {
  const nivelMaximoInput = document.getElementById("nivel-maximo");
  const nivelMaximo = parseInt(nivelMaximoInput.value);
  if (isNaN(nivelMaximo) || nivelMaximo < 0) {
    mostrarError(
      nivelMaximoInput,
      "El nivel máximo debe ser un número válido y mayor o igual a cero"
    );
    return false;
  }
  return true;
}

function validadorMensaje() {
  const mensajeInput = document.getElementById("mensaje");
  const mensaje = mensajeInput.value.trim();
  if (mensaje === "") {
    mostrarError(mensajeInput, "El mensaje es obligatorio");
    return false;
  }
  return true;
}
