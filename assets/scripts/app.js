// Definir variables para los valores de ataque y el valor máximo de vida que más adelante será definido por el usuario
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
let chosenMaxLife = 100;

// Definir las variables para el valor actual de la vida del monstruo y del jugador
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

// Establecer los valores máximos de las barras de salud
adjustHealthBars(chosenMaxLife);

// Definir la funxión del modo de ataque y del contra-ataque
function attackMonster(mode) {
    let maxDamage;
    if(mode === ATTACK_VALUE) {
        maxDamage = ATTACK_VALUE;
    } else if(mode === STRONG_ATTACK_VALUE) {
        maxDamage = STRONG_ATTACK_VALUE;
    }
    
    const damage = dealMonsterDamage(maxDamage);
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

function attackHandler() {
    attackMonster(ATTACK_VALUE);
}

function strongAttackHandler() {
    attackMonster(STRONG_ATTACK_VALUE);
}

// Añadir un listener al botón de ataque
attackBtn.addEventListener('click', attackHandler);
// Añadir listener al botón de ataque fuerte
strongAttackBtn.addEventListener('click', strongAttackHandler);