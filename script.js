"use strict";

// Seleccionando elementos
const jugador0El = document.querySelector(".jugador--0");
const jugador1El = document.querySelector(".jugador--1");
const puntuacion0El = document.querySelector("#puntuacion--0");
const puntuacion1El = document.getElementById("puntuacion--1");
const actual0El = document.getElementById("actual--0");
const actual1El = document.getElementById("actual--1");

const dadoEl = document.querySelector(".dado");
const btnNuevo = document.querySelector(".btn--nuevo");
const btnTirar = document.querySelector(".btn--tirar");
const btnMantener = document.querySelector(".btn--mantener");

let puntuaciones, puntuacionActual, jugadorActivo, jugando;

// Empezando condiciones
const init = function () {
  puntuaciones = [0, 0];
  puntuacionActual = 0;
  jugadorActivo = 0;
  jugando = true;

  puntuacion0El.textContent = 0;
  puntuacion1El.textContent = 0;
  actual0El.textContent = 0;
  actual1El.textContent = 0;

  dadoEl.classList.add("oculto");
  jugador0El.classList.remove("jugador--ganador");
  jugador1El.classList.remove("jugador--ganador");
  jugador0El.classList.add("jugador--activo");
  jugador1El.classList.remove("jugador--activo");
};
init();

const cambiarJugador = function () {
  document.getElementById(`actual--${jugadorActivo}`).textContent = 0;
  puntuacionActual = 0;
  jugadorActivo = jugadorActivo === 0 ? 1 : 0;
  jugador0El.classList.toggle("jugador--activo");
  jugador1El.classList.toggle("jugador--activo");
};

// Funcionalidad girando dados
btnTirar.addEventListener("click", function () {
  if (jugando) {
    // 1. Generando tirada de dados aleatoria
    const dado = Math.trunc(Math.random() * 6) + 1;

    // 2. Desplegar dado
    dadoEl.classList.remove("oculto");
    dadoEl.src = `dado-${dado}.png`;

    // 3. Comprobar si es 1
    if (dado !== 1) {
      // Añadir dado a la puntuación actual
      puntuacionActual += dado;
      document.getElementById(`actual--${jugadorActivo}`).textContent =
        puntuacionActual;
    } else {
      // Cambiar al siguiente jugador
      cambiarJugador();
    }
  }
});

btnMantener.addEventListener("click", function () {
  if (jugando) {
    // 1. Añadir puntuación actual a la puntuación del jugador activo
    puntuaciones[jugadorActivo] += puntuacionActual;
    // puntuaciones[1] = puntuaciones[1] + puntuacionActual

    document.getElementById(`puntuacion--${jugadorActivo}`).textContent =
      puntuaciones[jugadorActivo];

    // 2. Comprobar si la puntuación del jugador es mayor o igual que 100
    if (puntuaciones[jugadorActivo] >= 100) {
      // Acabar el juego
      jugando = false;
      dadoEl.classList.add("oculto");

      document
        .querySelector(`.jugador--${jugadorActivo}`)
        .classList.add("jugador--ganador");
      document
        .querySelector(`.jugador--${jugadorActivo}`)
        .classList.remove("jugador--activo");
    } else {
      // Cambiar al siguiente jugador
      cambiarJugador();
    }
  }
});

btnNuevo.addEventListener("click", init);
