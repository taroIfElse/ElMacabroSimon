var cuadrados = document.querySelectorAll(".cuadrado");
var secuencia = [];
var nivel = 0;
var contador = 0;
var juegoIniciado = false;
var puntuacion = 0;
var jugadorNombre = "";
var tiempoTranscurrido = 0;
var intervaloTiempo;

document.getElementById("nombre").addEventListener("input", function (event) {
  jugadorNombre = event.target.value.trim();
});

function empezarJuego() {
  if (jugadorNombre !== "") {
    juegoIniciado = true;
    mostrarNombre();
    reiniciarJuego();
    siguienteNivel();
    iniciarTemporizador();
  } else {
    alert("Por favor, ingresa tu nombre antes de empezar el juego.");
  }
}

function mostrarNombre() {
  var jugadorElemento = document.getElementById("jugador");
  jugadorElemento.textContent = "Jugador: " + jugadorNombre;
}

function obtenerPuntuacionMaxima() {
  var puntuacionMaxima = localStorage.getItem("puntuacionMaxima");
  return puntuacionMaxima
    ? JSON.parse(puntuacionMaxima)
    : { nombre: "", puntuacion: 0 };
}

function guardarPuntuacionMaxima() {
  var puntuacionMaxima = obtenerPuntuacionMaxima();
  if (puntuacion > puntuacionMaxima.puntuacion) {
    puntuacionMaxima = { nombre: jugadorNombre, puntuacion: puntuacion };
    localStorage.setItem("puntuacionMaxima", JSON.stringify(puntuacionMaxima));
  }
}

cuadrados.forEach(function (cuadrado) {
  cuadrado.addEventListener("click", function () {
    if (juegoIniciado) {
      var cuadradoIndex = Array.from(cuadrados).indexOf(cuadrado);
      validar(cuadradoIndex);
      iluminarCuadrado(cuadradoIndex);
    }
  });
});

function empezar() {
  reiniciarJuego();
  siguienteNivel();
}

function siguienteNivel() {
  nivel++;
  contador = 0;
  actualizarContador();
  var nuevoCuadrado = generarCuadradoAleatorio();
  secuencia.push(nuevoCuadrado);
  iluminarSecuencia();
}

function generarCuadradoAleatorio() {
  var numeroAleatorio = Math.floor(Math.random() * 4);
  return numeroAleatorio;
}

function iluminarSecuencia() {
  var i = 0;
  var interval = setInterval(function () {
    var cuadradoIndex = secuencia[i];
    iluminarCuadrado(cuadradoIndex);
    i++;
    if (i >= nivel) {
      clearInterval(interval);
    }
  }, 1000);
}

function iluminarCuadrado(cuadradoIndex) {
  var cuadrado = cuadrados[cuadradoIndex];
  cuadrado.classList.add("iluminado");
  setTimeout(function () {
    cuadrado.classList.remove("iluminado");
  }, 350);
}

function validar(cuadradoIndex) {
  if (cuadradoIndex === secuencia[contador]) {
    contador++;
    puntuacion++;
    actualizarContador();

    if (contador === secuencia.length) {
      if (contador === nivel) {
        contador = 0;
        setTimeout(function () {
          siguienteNivel();
        }, 1000);
      }
    }
  } else {
    perder();
  }
}
function perder() {
  alert("Perdiste. Inténtalo de nuevo.");
  guardarPuntuacionMaxima();
  reiniciarJuego();
}

function reiniciarJuego() {
  juegoIniciado = false;
  nivel = 0;
  contador = 0;
  puntuacion = 0;
  secuencia = [];
  tiempoTranscurrido = 0;
  actualizarContador();
  actualizarTiempo();
  mostrarNombre();
  reiniciarTemporizador();
}

function actualizarContador() {
  var contadorElemento = document.getElementById("contador");
  contadorElemento.textContent = "Nivel: " + nivel;
  var puntuacionElemento = document.getElementById("puntuacion");
  puntuacionElemento.textContent = "Puntuación: " + puntuacion;
  var puntuacionMaximaElemento = document.getElementById("puntuacionMaxima");
  var puntuacionMaxima = obtenerPuntuacionMaxima();
  puntuacionMaximaElemento.textContent =
    "Puntuación Máxima: " +
    puntuacionMaxima.puntuacion +
    " (" +
    puntuacionMaxima.nombre +
    ")";
}

function reiniciarContador() {
  var contadorElemento = document.getElementById("contador");
  contadorElemento.textContent = "Nivel: 0";
}

function iniciarTemporizador() {
  intervaloTiempo = setInterval(function () {
    tiempoTranscurrido++;
    actualizarTiempo();
  }, 1000);
}

function actualizarTiempo() {
  var tiempoElemento = document.getElementById("tiempo");
  tiempoElemento.textContent = tiempoTranscurrido + " segundos";
}

function reiniciarTemporizador() {
  clearInterval(intervaloTiempo);
  tiempoTranscurrido = 0;
  actualizarTiempo();
}
