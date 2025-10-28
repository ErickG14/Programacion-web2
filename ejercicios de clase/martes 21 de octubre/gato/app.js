const tablero = document.getElementById("tablero");
const mensaje = document.getElementById("mensaje");
const reiniciarBtn = document.getElementById("reiniciar");

let turno = "X";
let celdas = Array(9).fill("");

function crearTablero() {
  tablero.innerHTML = "";
  celdas.forEach((valor, i) => {
    const celda = document.createElement("div");
    celda.classList.add("celda");
    celda.dataset.index = i;
    celda.textContent = valor;
    celda.addEventListener("click", jugar);
    tablero.appendChild(celda);
  });
}

function jugar(e) {
  const index = e.target.dataset.index;
  if (celdas[index] !== "" || verificarGanador()) return;

  celdas[index] = turno;
  e.target.textContent = turno;

  if (verificarGanador()) {
    mensaje.textContent = `¡Ganó ${turno}! `;
  } else if (celdas.every(c => c !== "")) {
    mensaje.textContent = "¡Empate! ";
  } else {
    turno = turno === "X" ? "O" : "X";
    mensaje.textContent = `Turno de ${turno}`;
  }
}

function verificarGanador() {
  const combinaciones = [
    [0,1,2], [3,4,5], [6,7,8], // filas
    [0,3,6], [1,4,7], [2,5,8], // columnas
    [0,4,8], [2,4,6]           // diagonales
  ];
  return combinaciones.some(comb => {
    const [a,b,c] = comb;
    return celdas[a] && celdas[a] === celdas[b] && celdas[a] === celdas[c];
  });
}

reiniciarBtn.addEventListener("click", () => {
  celdas = Array(9).fill("");
  turno = "X";
  mensaje.textContent = `Turno de ${turno}`;
  crearTablero();
});

crearTablero();
mensaje.textContent = `Turno de ${turno}`;
