// Modal container tempalte
const QuestEndStatsView = (() => {

    // FIXME: Stop apps CSS impact our extension markup, add all declarations that are important to us.
    const QuestEndStatsHtml = `
        <section id="quest-end-stats" class="quest-end-stats hide">
            <div class="end-stats__panels-wrap">
                
                <span class="end-stats__illustration">
                    <img class="illustration_img" 
                        src="" />
                </span>
                <main class="end-stats__card-main">
                    <div class="card-main__avatar">
                        <img class="avatar__img" 
                        src="" />
                    </div>
                        
                    <div class="card-main__level">
                        <b class="level__text">
                            7
                        </b>
                    </div>
    
                    <div class="card-main__status">
                        <i>QUEST COMPLITED</i>
                    </div>
                        
                    <div class="card-main__score">
                        <b class="score__text">
                            12222
                        </b>
                    </div>
                </main>
                        
                <aside class="end-stats__card-details">
                    <div class="card-details__abilities">
                        <ul data-abilities class="abilities__list">
                            <li class="abilities-item">[ + ]</li>
                            <li class="abilities-item">[ + ]</li>
                            <li class="abilities-item">[ + ]</li>
                            <li class="abilities-item">[ + ]</li>
                            <li class="abilities-item">[ + ]</li>
                            <li class="abilities-item">[ + ]</li>
                            <li class="abilities-item">[ + ]</li>
                        </ul>
                    </div>
                </aside>

                <span 
                    data-ui="close-btn" 
                    class="end-stats__ui-close"></span>

            </div>
        </section>`;

        /**
         * Get data and prep it into the card layout
         *
         * @return [type]
         * 
         */
        async function initCard(questWinStatus) {
            let contextEl = document.querySelector('#quest-end-stats')
            // Get quest info
            const projectAttrs = await Project.getAttributes();
            setCard(contextEl, projectAttrs)
            setUser(contextEl, projectAttrs)
            setText(contextEl, { 
                score: currentScore, 
                level: currentLevel, 
                statusText: (questWinStatus) ? '+ QUEST COMPLITED +' : '- QUEST FAILED -' 
            });

            showCard();
        }
        
        /**
         * Display card
         *
         * @return [type]
         * 
         */
        function showCard() {

            let card = document.querySelector('.quest-end-stats')
            
            if(!card){
                console.error('Element with ID "quest-end-stats" not found.');
            }

            card.classList.toggle('hide')
            card.classList.toggle('show')
        }


        // Set graphics for project
        function setCard(contextEl, urls) {
            let illustrationImg = contextEl.querySelector('.illustration_img')
            illustrationImg.src = urls.background_id
        }

        function setUser(contextEl, urls) {
            let avatarImg = contextEl.querySelector('.avatar__img')
            avatarImg.src = urls.avatar_id
        }

        // Set text
        function setText(contextEl, texts) {

            let levelTxt = contextEl.querySelector('.level__text')
            levelTxt.innerHTML = texts.level

            let scoreTxt = contextEl.querySelector('.score__text')
            scoreTxt.innerHTML = texts.score

            let statusTxt = contextEl.querySelector('.card-main__status')
            statusTxt.innerHTML = texts.statusText
        }

    return {
        layout: QuestEndStatsHtml,
        initCard: initCard
    }

})()