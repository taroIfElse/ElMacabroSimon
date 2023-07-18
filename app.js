var cuadrados = document.querySelectorAll(".cuadrado");
var secuencia = [];
var nivel = 0;
var contador = 0;
var juegoIniciado = false;
var puntuacion = 0;

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
    if (contador === secuencia.length) {
      if (contador === nivel) {
        contador = 0;
        puntuacion++;
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
  reiniciarJuego();
}

function reiniciarJuego() {
  juegoIniciado = false;
  nivel = 0;
  contador = 0;
  puntuacion = 0;
  secuencia = [];
  actualizarContador();
}

function actualizarContador() {
  var contadorElemento = document.getElementById("contador");
  contadorElemento.textContent = "Nivel: " + nivel;
  var puntuacionElemento = document.getElementById("puntuacion");
  puntuacionElemento.textContent = "Puntuación: " + puntuacion;
}

function reiniciarContador() {
  var contadorElemento = document.getElementById("contador");
  contadorElemento.textContent = "Nivel: 0";
}
