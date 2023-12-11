const TestBadges = (() => {

    function checkShowBadges(currentLevel) {

        let testStatustext

        const badgeLevels = document.querySelector(".sprite" + currentLevel)

        Badges.showAward(currentLevel)

        if (badgeLevels !== undefined) {
            testStatustext = 'PASSED'
        } else {
            testStatustext = 'FAILED'
        }

        RunAllTests.increaseTestTotal()
        const testResultElement = document.createElement('li');
        testResultElement.textContent = `Show on new level [${currentLevel}] : ${testStatustext}.`
        document.querySelector(RunAllTests.badgesList).appendChild(testResultElement)
    }

    return {
        checkShowBadges: checkShowBadges
    }

})()