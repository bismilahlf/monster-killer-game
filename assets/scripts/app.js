// Definir variables para el valor de ataque y el valor máximo de vida que más adelante será definido por el usuario
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 15;
let chosenMaxLife = 100;

// Definir las variables para el valor actual de la vida del monstruo y del jugador
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

// Establecer los valores máximos de las barras de salud
adjustHealthBars(chosenMaxLife);

// Definir la función de ataque. Llama a dealMonsterDamage y resta el valor del daño a currentMonsterHealth
// Crear una alerta que salte cuando el usuario haya ganado (la barra de salud del monstruo llegue a 0), otra para cuando el usuario haya perdido y otra para cuando haya un empate
// Definir el contra-ataque del monstruo
function onClick() {
    const damage = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterHealth -= damage;
    
    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You win!!!");
    } else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("You loose :(");
    } else if(currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert("You have a draw");
    }

    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
}

// Añadir un listener al botón de ataque
attackBtn.addEventListener('click', onClick);
