const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
const ATTACK_MODE = "attack";
const STRONG_ATTACK_MODE = "strong attack"

const userChosenHealth = prompt("Enter a maximun life value for you and the monster", "100");
let chosenMaxLife = +userChosenHealth;

if(isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

// Establecer los valores máximos de las barras de salud
adjustHealthBars(chosenMaxLife);

// Definir funcionalidad de reseteo del juego
function reset() {
    currentPlayerHealth = chosenMaxLife;
    currentMonsterHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

// Definir la funcionalidad para la salud del jugador, el final de cada ronda y la vida extra
function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if(currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert("Bonus life!");
    }

    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You win!!!");
    } else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("You loose :(");
    } else if(currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert("You have a draw");
    }

    if(currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
        reset();
    }
}

// Definir la funcionalidad para el modo de ataque y la salud del monstruo
function attackMonster(mode) {
    let maxDamage;
    if(mode === ATTACK_MODE) {
        maxDamage = ATTACK_VALUE;
    } else if(mode === STRONG_ATTACK_MODE) {
        maxDamage = STRONG_ATTACK_VALUE;
    }
    
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;

    endRound();
}

function attackHandler() {
    attackMonster(ATTACK_MODE);
}

function strongAttackHandler() {
    attackMonster(STRONG_ATTACK_MODE);
}

// Definir función para el botón de curarse
function healPlayerHandler() {
    let healValue;
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        healValue = chosenMaxLife - currentPlayerHealth;
        alert("You can't heal more than your maximun initial health")
    } else if(currentPlayerHealth < chosenMaxLife - HEAL_VALUE) {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);