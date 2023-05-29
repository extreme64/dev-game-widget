const abilitiesHtml = `<ul data-abilities class="widget__abilities-list">
    <li data-id="0" class="widget__abilities-item" title="I had a vision!">🔮</li>
    <li data-id="1" class="widget__abilities-item" title="I chat with bud GPT!">🔎</li>
    <li data-id="2" class="widget__abilities-item" title="I been monitoring!">📈</li>
    <li data-id="3" class="widget__abilities-item" title="I removed/fixed big bugs!">🔫</li>
    <li data-id="4" class="widget__abilities-item" title="I have less to worry now!">✂️</li>
    <li data-id="5" class="widget__abilities-item" title="I refactor many!">💡</li>
    <li data-id="6" class="widget__abilities-item" title="I did epic code!">💎</li>
</ul>`;

function setAbilitesListeners(nodeList, callback) {
    if (typeof nodeList !== 'undefined') {
        [...nodeList].forEach(node => {
            node.addEventListener('click', () => callback(node.dataset.id))
        });
    }
}

function abclick(abilitiId) {
    console.log('[' + abilitiId + '] Curr. score:', Number(currentScore + 300));
    currentScore = currentScore + 300
}