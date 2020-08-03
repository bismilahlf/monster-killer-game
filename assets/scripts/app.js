// Definir variables para el valor de ataque y el valor máximo de vida que más adelante será definido por el usuario
const ATTACK_VALUE = 10;
let chosenMaxLife = 100;

// Establecer los valores máximos de las barras de salud
adjustHealthBars(chosenMaxLife);

// Definir la función de ataque
function onClick() {
    const damage = dealMonsterDamage(ATTACK_VALUE);
}

// Añadir un listener al botón de ataque
attackBtn.addEventListener('click', onClick);
