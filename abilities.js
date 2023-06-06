const AbilitiesModule = (function () {

    const abilitiesHtml = `<ul data-abilities class="widget__abilities-list">
        <li data-id="0" class="widget__abilities-item" title=""></li>
        <li data-id="1" class="widget__abilities-item" title=""></li>
        <li data-id="2" class="widget__abilities-item" title=""></li>
        <li data-id="3" class="widget__abilities-item" title=""></li>
        <li data-id="4" class="widget__abilities-item" title=""></li>
        <li data-id="5" class="widget__abilities-item" title=""></li>
        <li data-id="6" class="widget__abilities-item" title=""></li>
    </ul>`;

    const abilities = [
        {
            id: 0,
            title: "I had a vision!",
            desc: "Plan before code, thing before write.",
            icon: "🔮",
            score: 60,
            isUsed: false
        },
        {
            id: 1,
            title: "I chat with bud GPT!",
            desc: "It is a good tool use it to a full extent.",
            icon: "🔎",
            score: 110,
            isUsed: false
        },
        {
            id: 2,
            title: "I been monitoring!",
            desc: "Abserve and note, seeing clearly is important.",
            icon: "📈",
            score: 140,
            isUsed: false
        },
        {
            id: 3,
            title: "I removed/fixed big bugs!",
            desc: "It is hard, but there is no way around. Longer they linger, harder they become.",
            icon: "🔫",
            score: 180,
            isUsed: false
        },
        {
            id: 4,
            title: "I have less to worry now!",
            desc: "Less code is beautiful.",
            icon: "✂️",
            score: 200,
            isUsed: false
        },
        {
            id: 5,
            title: "I refactor many!",
            desc: "It is an art form, practise it daily.",
            icon: "💡",
            score: 200,
            isUsed: false
        },
        {
            id: 6,
            title: "I did epic code!",
            desc: "Epic feature are nice milestones to be proud of.",
            icon: "💎",
            score: 300,
            isUsed: false
        }
    ];

    function setData(node, id) {
        node.dataset.id = abilities[id].id;
        node.setAttribute("title", abilities[id].title);
        node.innerText = abilities[id].icon;
    }

    function setAbilitiesListeners(nodeList, callback) {
        if (typeof nodeList !== 'undefined') {
            [...nodeList].forEach(node => {
                const listener = function (event) {
                    callback(node.dataset.id, event, listener);
                };
                node.addEventListener('click', listener);
                setData(node, Number(node.dataset.id));
            });
        }
    }

    function abclick(abilityId, event, listener) {
        if (typeof abilities === 'undefined') return;

        // If the ability is already used, return
        if (abilities[abilityId].isUsed) return;

        // Remove the listener for this ability
        event.currentTarget.removeEventListener('click', listener);

        // Style btn. as 'spent'
        event.currentTarget.classList.add('disabled');

        // Update the isUsed status of the ability
        abilities[abilityId].isUsed = true;

        // Update score
        currentScore += abilities[abilityId].score;

        // Show the updated score
        console.log(`[${abilityId}] Current score: currentScore + ${abilities[abilityId].score}`);
    }

    return {
        setAbilitiesListeners: setAbilitiesListeners,
        abclick: abclick,
        abilitiesHtml: abilitiesHtml
    };
})();