
const Badges = (function () {

    const level = `<div id="badges-levels" class="badges badges--level">
        <div class="badges__background sprite">
            <span class="badges__test"></span>
            <span class="badges__download">
                <button class="badges__button">Save badge</button>
            </span>
        </div>
    </div>`;

    const suggestion = `<div id="badges-suggestion" class="badges badges--suggestion">
        <div class="badges__background sprite">
            <span class="badges__test"></span>
            <span class="badges__download">
                <button class="badges__button">Save badge</button>
            </span>
        </div>
    </div>`;

    const unlocked = `<div id="badges-unlocked" class="badges badges--unlocked">
        <div class="badges__background sprite">
            <span class="badges__test"></span>
            <span class="badges__download">
                <button class="badges__button">Save badge</button>
            </span>
        </div>
    </div>`;



    const showAward = ((awardID) => {
        const awardWrapEl = document.querySelector("#badges-levels")
        const sprite = document.querySelector("#badges-levels .sprite")

        sprite.classList.add('sprite' + awardID)

        awardWrapEl.style.display = "flex"
        sprite.style.animationPlayState = "running";

        // Self hide
        setTimeout(() => {
            if (typeof awardWrapEl === 'undefined' || typeof sprite === 'undefined') return
            awardWrapEl.style.display = 'none';
            sprite.style.animationPlayState = "paused";
        }, 4000);
    })



    return {
        showAward: showAward,
        level: level,
        suggestion: suggestion,
        unlocked: unlocked
    }
})()