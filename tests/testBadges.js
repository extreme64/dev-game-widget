const TestBadges = (() => {

    function checkShowBadges(currentLevel) {

        let testStatustext

        const badgeLevels = document.querySelector("#badges-levels")

        Badges.showAward(currentLevel)

        if (badgeLevels !== null && badgeLevels.style.display === 'flex') {
            testStatustext = 'PASSED'
        } else {
            testStatustext = 'FAILED'
        }
        RunAllTests.increaseTestTotal()

        const testResultElement = document.createElement('li');
        testResultElement.textContent = `Show on new level : ${testStatustext}.`
        
        document.querySelector(RunAllTests.badgesList).appendChild(testResultElement)
    }

    return {
        checkShowBadges: checkShowBadges
    }

})()