/**
 * Checks if the currentLevel is equal to the SUCCESS_LEVEL
 * 
 * @since 1.0.0
 */

/**
 *
 *
 */
function runWinCondistions() {
    if (currentLevel === SUCCESS_LEVEL) {
        isDallyGameWon = true
        alert("!!! Dev. Game Win !!!")
    }
}

/**
 * Updates the currentScore variable
 *
 * @since 1.0.0
 */
function updateScore(add = 1) {
    currentScore = Number(currentScore + add)
}

/**
 * Check current work level
 * 
 * @since 1.0.0
 */
function checkNextLevel() {
    console.log("Checking level upgrade!");

    const scoreThresholds = [0, 700, 1400, 3900, 9000, 20000, 45000, 100000, 230000, 600000];
    let currentLevel = 1;

    for (let level = 1; level <= 10; level++) {
        if (currentScore >= scoreThresholds[level] && currentLevel < level+1) {
            currentLevel = currentLevel + 1;
        }
    }

    if (currentLevel === 10) {
        runWinConditions();
        if (typeof intervalIdCheckNextLevel !== 'undefined') {
            clearInterval(intervalIdCheckNextLevel);
        }
    }

    if (currentScore !== Number(getFromLocal('dgw_current_score'))) {
        saveToLocal('dgw_current_score', currentScore)
    }

    if (currentLevel !== Number(getFromLocal('dgw_current_level'))) {
        saveToLocal('dgw_current_level', currentLevel);
        console.log("New level:", `${currentLevel}`);

        // Show award
        Badges.showAward(1)
    }
} 