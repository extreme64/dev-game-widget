const Stats = (function () {
    
    let resetBtn
    let submitBtn
    let workDescription

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
                <label for="level">LEVEL: </lable><p name="score" class="widget__work-level widget__stats-item">4</p>
            </div>
            <div>
                <label for="score">SCORE: </lable><p name="level" class="widget__work-score widget__stats-item">4000</p>
            </div>
        </div>
        <button id="reset-btn" class="widget__stats-button widget__stats-button-reset">Reset</button>
    </div>`

    const QUEST_INFO_EL_SELECT = ".widget__work"
    const QUEST_DESC_EL_SELECT = ".widget__work-desciption"
    const QUEST_SCORE_EL_SELECT = ".widget__work-score"
    const QUEST_LEVEL_EL_SELECT = ".widget__work-level"

    const onReady = function() {

        let score = localStorage.getItem(QUEST_SCORE_LSKEY)
        let level = localStorage.getItem(QUEST_LEVEL_LSKEY)

        updateNodeInnerText(QUEST_DESC_EL_SELECT, localStorage.getItem(QUEST_DESC_LSKEY))
        updateNodeInnerText(QUEST_SCORE_EL_SELECT, score)
        updateNodeInnerText(QUEST_LEVEL_EL_SELECT, level)

        currentScore = score
        currentLevel = level

        workDescription = document.getElementById('description');

        resetBtn = document.getElementById('reset-btn');
        resetBtn.addEventListener('click', resetButtonClick)

        submitBtn = document.getElementById('submit-btn');
        submitBtn.addEventListener('click', (e) => {
            submitButtonClick(e)})
    }

    
    /**
     * Show new work form
     *
     * @param mixed e
     * 
     * @return [type]
     * 
     */
    function resetButtonClick(e) {

        const workForm = document.getElementById('new-work-form');

        if (workForm.style.display === 'none') {
            e.target.innerText = "Reset"
            Stats.showNewQuestForm(true)
            Abilities.toggleShow(false)
        } else {
            workDescription.value = ''
            e.target.innerText = "Cancel"
            Stats.showNewQuestForm(false)
            Abilities.toggleShow(true)
        }
    }


    /**
     * Submit new work
     *
     * @param mixed e
     * 
     * @return [type]
     * 
     */
    async function submitButtonClick(e) {

        const projectId = 1;
        const token = localStorage.getItem('rlgin')
        const description = workDescription.value;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        let requestBodydata = {
            description: description
        }

        try {

            let response = await fetch(`http://localhost:8000/api/project/${projectId}/quests`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBodydata)
            });

            const data = await response.json();
            const resp = data.message

            if (response.ok) {

                localStorage.setItem(PROJECT_ID_LSKEY, resp.project.id)
                localStorage.setItem(QUEST_ID_LSKEY, resp.quest.id)
                localStorage.setItem(QUEST_DESC_LSKEY, resp.quest.name)
                localStorage.setItem(QUEST_SCORE_LSKEY, resp.quest.newScore)
                localStorage.setItem(QUEST_LEVEL_LSKEY, resp.quest.newLevel)
                localStorage.setItem(QUEST_WIN_STATUS_LSKEY, resp.quest.winStatus)


                Stats.updateNodeInnerText(Stats.QUEST_DESC_EL_SELECT, localStorage.getItem(QUEST_DESC_LSKEY))
                Stats.updateNodeInnerText(Stats.QUEST_SCORE_EL_SELECT, localStorage.getItem(QUEST_SCORE_LSKEY))
                Stats.updateNodeInnerText(Stats.QUEST_LEVEL_EL_SELECT, localStorage.getItem(QUEST_LEVEL_LSKEY))

                Stats.showNewQuestForm(false)
                AbilitiesModule.toggleShow(true)

                resetStats()

                // Create a custom event
                const resetEvent = new CustomEvent('questReset', {
                    bubbles: true,
                    cancelable: true
                });

                // Dispatch the custom event on the targeted element
                modal.dispatchEvent(resetEvent);

            } else {
                console.error('Error on create quest attempt!', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }



    const updateNodeInnerText = (nodeSElectore, textValue) => {
        const node = document.querySelector(nodeSElectore)
        if (!node) return false
        node.innerHTML = textValue
        return true
    }

    function showNewQuestForm(shouldShow){

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

    /* Page timeline events */
    document.addEventListener('DOMContentLoaded', function () {})

    window.addEventListener('load', function () {
        Stats.showNewQuestForm(false);
        Stats.onReady(this);
    });

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