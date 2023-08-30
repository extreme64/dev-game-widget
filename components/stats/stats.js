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
            <h3 class="widget__work-desciption widget__stats-item">Some work task info text.</h3>
            <p class="widget__work-level widget__stats-item">4</p>
            <p class="widget__work-score widget__stats-item">4000</p>
        </div>
        <button id="reset-btn" class="widget__stats-button widget__stats-button-reset">Reset</button>
    </div>`

    const QUEST_INFO_EL_SELECT = ".widget__work"
    const QUEST_DESC_EL_SELECT = ".widget__work-desciption"
    const QUEST_SCORE_EL_SELECT = ".widget__work-score"
    const QUEST_LEVEL_EL_SELECT = ".widget__work-level"


    const updateNodeInnerText = (nodeSElectore, textValue) => {
        const node = document.querySelector(`${nodeSElectore}`)
        if (!node) return false
        node.innerHTML = textValue
        return true
    }

    const showNewQuestForm = (shouldShow) => {
        
        const workForm = document.getElementById('new-work-form');
        const workInfo = document.querySelector(QUEST_INFO_EL_SELECT)

        if (shouldShow) {
            workForm.style.display = 'none';
            workInfo.style.display = 'grid';
        }else {
            workForm.style.display = 'flex';
            workInfo.style.display = 'none';
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
        updateNodeInnerText,
        showNewQuestForm,
    }
    
})()