
/**
 * Checks if the currentLevel is equal to the SUCCESS_LEVEL
 * 
 * @since 1.0.0
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

    if (currentScore >= 700 && currentLevel < 2) {
        currentLevel = 2;
    } else if (currentScore >= 1400 && currentLevel < 3) {
        currentLevel = 3;
    } else if (currentScore >= 3900 && currentLevel < 4) {
        currentLevel = 4;
    } else if (currentScore >= 9000 && currentLevel < 5) {
        currentLevel = 5;
        runWinCondistions()
        if (typeof inetrvalIdCheckNextLevel !== 'undefined') clearInterval(inetrvalIdCheckNextLevel)
    }

    if (currentScore !== getFromLocal('dgw_current_score')) {
        saveToLocal('dgw_current_score', currentScore)
    }

    if (currentLevel !== getFromLocal('dgw_current_level')) {
        saveToLocal('dgw_current_level', currentLevel);
        console.log("New level:", `${currentLevel}`);

    }
} 