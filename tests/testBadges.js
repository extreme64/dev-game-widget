const TestBadges = (() => {

    const badgesChecksList = "#badges"

    function checkShowBadges(currentLevel) {

        let testStatustext

        const badgeLevels = document.querySelector("#badges-levels")

        Badges.showAward(currentLevel)

        if (badgeLevels !== null && badgeLevels.style.display === 'flex') {
            testStatustext = 'PASSED'
        } else {
            testStatustext = 'FAILED'
        }
        RunAllTests.addTestDone()

        const testResultElement = document.createElement('li');
        testResultElement.textContent = `Show on new level : ${testStatustext}.`
        
        // FIXME: querySelector from RunAllTests as element
        document.querySelector(badgesChecksList).appendChild(testResultElement)
        
        console.log(testStatustext);
    }

    return {
        checkShowBadges: checkShowBadges
    }

})()