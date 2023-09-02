const AbilitiesModule = (function () {

    // FIXME: Remove all emojies to images, some websites changed them to their verrsions
    // Score update issue.
    const html = `
        <div class="widget__abilities">
            <ul data-abilities class="widget__abilities-list">
                <li class="widget__abilities-item"></li>
                <li class="widget__abilities-item"></li>
                <li class="widget__abilities-item"></li>
                <li class="widget__abilities-item"></li>
                <li class="widget__abilities-item"></li>
                <li class="widget__abilities-item"></li>
                <li class="widget__abilities-item"></li>
            </ul>
        </div>`;

    let abilities = [
        {
            id: 1,
            title: "I had a vision!",
            desc: "Plan before code, thing before write.",
            icon: "🔮",
            score: 60,
            isUsed: false
        },
        {
            id: 2,
            title: "I chat with bud GPT!",
            desc: "It is a good tool use it to a full extent.",
            icon: "🔎",
            score: 110,
            isUsed: false
        },
        {
            id: 3,
            title: "I been monitoring!",
            desc: "Abserve and note, seeing clearly is important.",
            icon: "📈",
            score: 140,
            isUsed: false
        },
        {
            id: 4,
            title: "I removed/fixed big bugs!",
            desc: "It is hard, but there is no way around. Longer they linger, harder they become.",
            icon: "🔫",
            score: 180,
            isUsed: false
        },
        {
            id: 5,
            title: "I have less to worry now!",
            desc: "Less code is beautiful.",
            icon: "✂️",
            score: 200,
            isUsed: false
        },
        {
            id: 6,
            title: "I refactor many!",
            desc: "It is an art form, practise it daily.",
            icon: "💡",
            score: 200,
            isUsed: false
        },
        {
            id: 7,
            title: "I did epic code!",
            desc: "Epic feature are nice milestones to be proud of.",
            icon: "💎",
            score: 300,
            isUsed: false
        }
    ];

    function onReady(abilitesChildren) {
        
        setNodesData(abilitesChildren);
        
        let abilsStr = localStorage.getItem(QUEST_ABILITIES_LSKEY)
        abilsSavedIds = abilsStr.split(';');
        abilsSavedIds.forEach((abil, i) => {
            let item = undefined
            item = document.querySelector(`.widget__abilities [data-id="${abil}"]`)
            if (item !== null && item !== undefined) {
                item.classList.add('used');
            }
        })
        
        Events.setEventListeners("click", abilitesChildren, abilityClick);
    }

    function setNodesData(nodeList) {
        [...nodeList].forEach((node,id) => {
            node.dataset.id = abilities[id].id;
            node.setAttribute("title", abilities[id].title);
            node.innerText = abilities[id].icon;
        })
    }

    async function abilityClick(abilityId, event, listener) {
        if (typeof abilities === 'undefined') return;

        const projectId = 1;

        // If the ability is already used, return
        if (abilities[abilityId].isUsed) return;

        let questId = localStorage.getItem(QUEST_ID_LSKEY)
        let token = localStorage.getItem('rlgin')
        
        await fetch(`http://localhost:8000/api/project/${projectId}/quests/id/${questId}/ability/${abilityId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Events sent successfully:', data);

                // Remove the listener for this ability
                event.target.removeEventListener('click', listener);

                // Style btn. as 'spent'
                event.target.classList.add('used');

                // Update the isUsed status of the ability
                abilities[abilityId].isUsed = true;

                // FIXME: update score centrilized else where
                const abilitiesToUpdateTo = data.message.abilitiesUsed
                const scoreToUpdateTo = data.message.newScore
                const levelToUpdateTo = data.message.newLevel
                localStorage.setItem(QUEST_ABILITIES_LSKEY, abilitiesToUpdateTo)
                localStorage.setItem(QUEST_SCORE_LSKEY, scoreToUpdateTo)
                localStorage.setItem(QUEST_LEVEL_LSKEY, levelToUpdateTo)
            })
            .catch(error => {
                console.error('Error sending events:', error);
            });

        // Update score
        // currentScore += abilities[abilityId].score;

    }

    return {
        abilityClick: abilityClick,
        setNodesData: setNodesData,
        html: html,
        onReady: onReady
    };
    
})();