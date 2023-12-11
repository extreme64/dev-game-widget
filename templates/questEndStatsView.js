// Modal container tempalte
const QuestEndStatsView = (() => {

    // FIXME: Stop apps CSS impact our extension markup, add all declarations that are important to us.
    const QuestEndStatsHtml = `
        <section id="quest-end-stats" class="quest-end-stats">

            <div>
                <!-- Level -->
            </div>
            
            <div>
                <!-- Avatar -->
            </div>
            
            <div class="end-stats__panels-wrap">

                <div class="end-stats__card">
                    <!-- stats wrap -->
                    <!-- ${stats.html} -->
            
                    <!-- abilities wrap -->
                    <!-- ${AbilitiesModule.html} -->
                    <div class="end-stats__card__abilities widget__abilities">
                        <ul data-abilities class="widget__abilities-list">
                            <li class="widget__abilities-item"></li>
                            <li class="widget__abilities-item"></li>
                            <li class="widget__abilities-item"></li>
                            <li class="widget__abilities-item"></li>
                            <li class="widget__abilities-item"></li>
                            <li class="widget__abilities-item"></li>
                            <li class="widget__abilities-item"></li>
                        </ul>
                    </div>
                </div>

                <div class="end-stats__stat-details">
            
                </div>
            </div>
           
        </section>`;

    return {
        layout: QuestEndStatsHtml
    }

})()