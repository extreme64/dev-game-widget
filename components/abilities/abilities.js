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

    // FIXME: ABILITES_DICTIONARY from server. Info on one place, and if changed it can be insta reflected in app.
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
        const abilFoundAt = abilities.findIndex((element) => Number(element.id) === Number(abilityId));


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

                event.target.removeEventListener('click', listener);
                event.target.classList.add('used');

                // Update the isUsed status of the ability
                abilities[abilFoundAt].isUsed = true;

                localStorage.setItem(QUEST_ABILITIES_LSKEY, data.message.abilitiesUsed)
                localStorage.setItem(QUEST_SCORE_LSKEY, data.message.newScore)
                localStorage.setItem(QUEST_LEVEL_LSKEY, data.message.newLevel)
            })
            .catch(error => {
                console.error('Error sending events:', error);
            });

        // Update score
        // currentScore += abilities[abilityId].score;

    }


    const updateAbilityButtons = ((data) => {
        
        let abilsStr = data
        let all = []

        all = document.querySelectorAll(`.widget__abilities li[data-id]`)
        
        if (typeof all === 'undefined') { return false }
        
        all.forEach((ab) => {
            ab.classList.remove('used');
        })
        
        if (abilsStr) {

            const abilsSavedIdsRaw = abilsStr.split(';');
            let abilsSavedIdsClean = []
            abilsSavedIdsRaw.forEach((ab) => {
                if (ab !== '') {
                    abilsSavedIdsClean.push(Number(ab))
                }
            })

            if (!Array.isArray(abilsSavedIdsClean) || abilsSavedIdsClean.length === 0) {
                return false
            }
        
            all.forEach((ab)=>{

                let found = abilsSavedIdsClean.includes(Number(ab.dataset.id));
                if (found){
                    ab.classList.add('used');
                }
            })
        }
     

        // let abilsStr = data
        // abilsSavedIds = abilsStr.split(';');
        // abilsSavedIds.forEach((abil, i) => {
        //     let item = undefined
        //     item = document.querySelector(`.widget__abilities [data-id="${abil}"]`)
        //     if (item !== null && item !== undefined) {
        //         item.classList.add('used');
        //     }
        // })



        // event.target.removeEventListener('click', listener);

        // event.target.classList.add('used');

        // abilities[abilFoundAt].isUsed = true;

    })

    return {
        html: html,
        onReady: onReady,
        setNodesData: setNodesData,
        abilityClick: abilityClick,
        updateAbilityButtons: updateAbilityButtons
    };
    
})();