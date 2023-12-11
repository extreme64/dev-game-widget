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
    let abilitiesFromServer = []

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
        const heroType = 1 //TODO: Replace with select dropdown on quest create.
        acquireAbilitiesInfo(heroType);
    }

    function setNodesData(nodeList) {
        [...nodeList].forEach((node,id) => {
            node.dataset.id = abilities[id].id;
            node.setAttribute("title", abilities[id].title);
            node.innerText = abilities[id].icon;
        })
    }

    function setAbilitiesDataServer(nodeList) {
        [...nodeList].forEach((node, id) => {
            node.dataset.id = abilitiesFromServer[id].id;
            node.setAttribute("title", abilities[id].title);
            // node.innerText = abilitiesFromServer[id].icon;
            node.innerHTML = '<img src="' + abilitiesFromServer[id].img + '" class="widget__abilities-item__img" alt="ability image" />';
        })
    }

    /**
     * Get abilities from server for selected quest.
     *
     * @param Number questHeroType
     * 
     * @return boolean
     * 
     */
    async function acquireAbilitiesInfo(questHeroType) {
        const projectId = 1; 
        const questId = localStorage.getItem(QUEST_ID_LSKEY)
        const token = localStorage.getItem('rlgin')

        // TODO: Hero type select
        // let data = {
        //     questHeroType: questHeroType
        // }
        await fetch(`http://localhost:8000/api/project/${projectId}/quest/${questId}/abilities`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {

                abilitiesFromServer = data.message.abilitiesObj
                if (typeof abilitiesFromServer === 'undefined') return false;

                let abilitesChildren = document.querySelectorAll("[data-abilities] > .widget__abilities-item")
                setAbilitiesDataServer(abilitesChildren)

                let abilsStr = localStorage.getItem(QUEST_ABILITIES_LSKEY)
                abilsSavedIds = abilsStr.split(';');
                abilsSavedIds.forEach((abil, i) => {
                    let item = undefined
                    item = document.querySelector(`.widget__abilities [data-id="${abil}"]`)
                    if (item !== null && item !== undefined) {
                        // item.classList.add('used');

                        setUsed(item, true)
                    }
                })

                Events.setEventListeners("click", abilitesChildren, abilityClick);

                return true
            })
            .catch(error => {
                console.error('Error getting abilities info:', error);
                return false
            });
    }

    /**
     * [Description for abilityClick]
     *
     * @param mixed abilityId
     * @param mixed event
     * @param mixed listener
     * 
     * @return [type]
     * 
     */
    async function abilityClick(abilityId, event, listener) {
        if (typeof abilities === 'undefined') return;

        setUsed(event.target, true)

        const projectId = 1; 
        const abilFoundAt = abilities.findIndex((element) => Number(element.id) === Number(abilityId));


        const questId = localStorage.getItem(QUEST_ID_LSKEY)
        const token = localStorage.getItem('rlgin')
        
        const urlAbilityIdVal = Number(abilityId)

        await fetch(`http://localhost:8000/api/project/${projectId}/quest/${questId}/abilities/${urlAbilityIdVal}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {

                event.target.removeEventListener('click', listener);

                setUsed(event.target, true)

                console.log(event.target.nodeName);
                // Update the isUsed status of the ability
                abilities[abilFoundAt].isUsed = true;

                localStorage.setItem(QUEST_ABILITIES_LSKEY, data.message.abilitiesUsed)
                localStorage.setItem(QUEST_SCORE_LSKEY, data.message.newScore)
                localStorage.setItem(QUEST_LEVEL_LSKEY, data.message.newLevel)
            })
            .catch(error => {
                console.error('Error sending events:', error);
            });

    }


    /**
     * updateAbilityButtons
     *
     * @var [type]
     */
    const updateAbilityButtons = ((data) => {
        
        let abilsStr = data
        let all = []

        all = document.querySelectorAll(`.widget__abilities > ul > li[data-id]`)
        if (typeof all === 'undefined') { return false }
        
        resetAbilities(all)
        
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
                    setUsed(ab, true)
                    // ab.classList.add('used');
                }
            })
        }

    })

    /**
     * [Description for setUsed]
     *
     * @param mixed el
     * @param mixed isUSed
     * 
     * @return [type]
     * 
     */
    function setUsed(el, isUSed) {

        let reTarget = el

        if(el.nodeName === 'IMG') {
            
            if (!el.parentNode) {
                return false
            }

            reTarget = el.parentNode
        }

        if (isUSed) {
            reTarget.classList.add('used');
        }else {
            reTarget.classList.remove('used');
        }
    }


    /**
     * [Description for toggleShow]
     *
     * @param mixed shouldShow
     * 
     * @return [type]
     * 
     */
    function toggleShow(shouldShow) {

        abilitiesListEl = document.querySelector(`.widget__abilities-list`)
        if (shouldShow === true) { 
            abilitiesListEl.style.contentVisibility = 'initial' 
        } else {
            abilitiesListEl.style.contentVisibility = 'hidden';
        }
    }

    /**
     * [Description for resetAbilities]
     *
     * @param mixed els
     * 
     * @return [type]
     * 
     */
    function resetAbilities(els) {

        els.forEach((ab) => {
            ab.classList.remove('used');
        })
    }


    return {
        html: html,
        onReady: onReady,
        setNodesData: setNodesData,
        abilityClick: abilityClick,
        updateAbilityButtons: updateAbilityButtons,
        setUsed: setUsed,
        toggleShow: toggleShow
    };
    
})();