const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
const USER_CHOSEN_VALUE = prompt("Enter a maximun life value for you and the monster", "100");

let chosenMaxLife = +USER_CHOSEN_VALUE;

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

// Definir la funcionalidad del final de cada ronda y la vida extra
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

// Definir la función del modo de ataque y del contra-ataque
function attackMonster(mode) {
    let maxDamage;
    if(mode === ATTACK_VALUE) {
        maxDamage = ATTACK_VALUE;
    } else if(mode === STRONG_ATTACK_VALUE) {
        maxDamage = STRONG_ATTACK_VALUE;
    }
    
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;

    endRound();
}

function attackHandler() {
    attackMonster(ATTACK_VALUE);
}

function strongAttackHandler() {
    attackMonster(STRONG_ATTACK_VALUE);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);

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

healBtn.addEventListener('click', healPlayerHandler);

// Definir 