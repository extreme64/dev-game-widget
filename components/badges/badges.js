
const Badges = (function () {

    const level = `<div id="badges-levels" class="badges badges--level">
    </div>`;

    const suggestion = `<div id="badges-suggestion" class="badges badges--suggestion">
        <div class="badges__background sprite">
            <span class="badges__test"></span>
            <!-- <span class="badges__download">
                <button class="badges__button">Save badge</button>
            </span> -->
        </div>
    </div>`;

    const unlocked = `<div id="badges-unlocked" class="badges badges--unlocked">
        <div class="badges__background sprite">
            <span class="badges__test"></span>
            <!-- <span class="badges__download">
                <button class="badges__button">Save badge</button>
            </span> -->
        </div>
    </div>`;

    function onReady() {
        let badgesLevels = document.querySelector("#badges-levels");

        badgesLevels.addEventListener('mouseenter', function(){
            toggleAwards(true, badgesLevels)
        })
        badgesLevels.addEventListener('mouseleave', function () {
            toggleAwards(false, badgesLevels)
        })
    }

    const toggleAwards = ((status, el) => {

        const badgesItems = el.querySelectorAll('[data-ui="badge-item"]')

        badgesItems.forEach(item => {
            
            if(item) {
            
                item.classList.add(
                    (status)
                        ? "sprite" : "sprite--compact")
                item.classList.remove(
                    (status)
                        ? "sprite--compact" : "sprite")

            }
        })
    })

    const showAward = ((awardID) => {
        
        const awardWrapEl = document.querySelector("#badges-levels");

        const levelBadge = document.createElement('div');
        levelBadge.dataset.ui = "badge-item" 
        levelBadge.innerHTML = '<span class="sprite__text">' + awardID + '</span>';
        levelBadge.style.zIndex = awardID
        levelBadge.classList.add('badges__background', 'sprite--compact', 'sprite' + awardID);
        awardWrapEl.insertBefore(levelBadge, awardWrapEl.firstChild);

    })


    return {
        showAward: showAward,
        level: level,
        suggestion: suggestion,
        unlocked: unlocked,
        onReady: onReady
    }
})()