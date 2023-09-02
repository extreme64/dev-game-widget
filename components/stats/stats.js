const stats = (function () {
    
    const html = `
    <div class="widget__stats">
        <div id="new-work-form" class="widget__stats-inner">
            <p class="widget__stats-text">Enter work description:</p>
            <textarea id="description" class="widget__stats-desc-input"></textarea>
            <button id="submit-btn" class="widget__stats-button-save">Save</button>
        </div>
        <div class="widget__work">
            <div>🔖</div>
            <div>
                <h3 class="widget__work-desciption widget__stats-item">Some work task info text.</h3>
            </div>
            <div>
                <label for="level">LEVEL</lable><p name="score" class="widget__work-level widget__stats-item">4</p>
            </div>
            <div>
                <label for="score">SCORE</lable><p name="level" class="widget__work-score widget__stats-item">4000</p>
            </div>
        </div>
        <button id="reset-btn" class="widget__stats-button widget__stats-button-reset">Reset</button>
    </div>`

    const QUEST_INFO_EL_SELECT = ".widget__work"
    const QUEST_DESC_EL_SELECT = ".widget__work-desciption"
    const QUEST_SCORE_EL_SELECT = ".widget__work-score"
    const QUEST_LEVEL_EL_SELECT = ".widget__work-level"

    const onReady = (() => {
        updateNodeInnerText(QUEST_DESC_EL_SELECT, localStorage.getItem(QUEST_DESC_LSKEY))
        updateNodeInnerText(QUEST_SCORE_EL_SELECT, localStorage.getItem(QUEST_SCORE_LSKEY))
        updateNodeInnerText(QUEST_LEVEL_EL_SELECT, localStorage.getItem(QUEST_LEVEL_LSKEY))
    })

    const updateNodeInnerText = (nodeSElectore, textValue) => {
        const node = document.querySelector(nodeSElectore)
        if (!node) return false
        node.innerHTML = textValue
        return true
    }

    const showNewQuestForm = (shouldShow) => {
        
        const newQuest = document.getElementById('new-work-form');
        const questInfo = document.querySelector(QUEST_INFO_EL_SELECT)

        if (shouldShow) {
            newQuest.style.display = 'grid';
            questInfo.style.display = 'none';
        }else {
            questInfo.style.display = 'flex';
            newQuest.style.display = 'none';
        }
    }

    // const savedScore = getFromLocal('dgw_current_score')
    // if (savedScore === null) {
    //     saveToLocal('dgw_current_score', currentScore)
    // }
    // else {
    //     let local = Number(getFromLocal('dgw_current_score'))
    //     updateScore(local + 35)

    //     // If var in local set hide form
    //     workForm.style.display = 'none';

    //     // Show work info
    //     workInfo.style.display = 'grid';
    //     workDesc.innerText = getFromLocal('dgw_desc');
    //     workLevel.innerText = '🆙 LEVEL ' + getFromLocal('dgw_current_level');
    //     workScore.innerText = '🎮 ' + getFromLocal('dgw_current_score');
    // }


    return {
        html,
        QUEST_INFO_EL_SELECT,
        QUEST_DESC_EL_SELECT,
        QUEST_SCORE_EL_SELECT,
        QUEST_LEVEL_EL_SELECT,
        onReady,
        updateNodeInnerText,
        showNewQuestForm,
    }
    
})()