
const PROJECT_ID_LSKEY = "dgw_project_id"
const QUEST_ID_LSKEY = "dgw_quest_id"
const QUEST_DESC_LSKEY = "dgw_quest_desc"
const QUEST_SCORE_LSKEY = "dgw_quest_current_score"
const QUEST_LEVEL_LSKEY = "dgw_quest_current_level"
const QUEST_ABILITIES_LSKEY = "dgw_quest_abilities"
const QUEST_WIN_STATUS_LSKEY = "dgw_quest_win_status"


/**
 * Checks if the currentLevel is equal to the SUCCESS_LEVEL
 * 
 * @since 1.0.0
 */
// TODO: Check local or ask server ?!
function runWinCondistions() {
    if (currentLevel === SUCCESS_LEVEL) {
        isDallyGameWon = true
        alert("!!! Dev. Game Win !!!")
    }
}

/**
 * Check current work level
 * 
 * @since 1.0.0
 */
function checkNextLevel() {
    // console.log("Checking level upgrade!");

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

    if (currentScore !== Number(getFromLocal(stats.QUEST_SCORE_LSKEY))) {
        saveToLocal(stats.QUEST_SCORE_LSKEY, currentScore)
    }

    if (currentLevel !== Number(getFromLocal(stats.QUEST_LEVEL_LSKEY))) {
        saveToLocal(stats.QUEST_LEVEL_LSKEY, currentLevel);
       
        // Show award
        Badges.showAward(currentLevel)
    }
} 