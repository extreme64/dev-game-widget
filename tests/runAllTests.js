const RunAllTests = (() => {

    let testRunTotal = 0

    const testChecksListBadgesSelector = ".tests__badges"
    const testChecksListSuggestionSelector = ".tests__suggestion"
    const testChecksListUnlockedSelector = ".tests__unlocked"

    let el

    const resultsHtml = `
        <aside class="tests">
            <h3>TESTS RESULTS:</h3>
            <h4>badges</h4>
            <ul class="tests__badges">
            </ul>
            <ul class="tests__suggestion">
            </ul>
            <ul class="tests__unlocked">
            </ul>

            <h4>Total</h4>
            <p>Runned tests <b class="tests_total">${testRunTotal}<b></p>
        </aside>`

    function init(modalContainer) { 
        const urlParams = new URLSearchParams(window.location.search);
        const isTestingMode = urlParams.has('testing') && urlParams.get('testing') == 'true';

        if (isTestingMode) {
            console.log("***TESTING***");
            // Append testing results layout
            const testingResultsLayout = document.createElement('div');
            testingResultsLayout.innerHTML = RunAllTests.resultsHtml

            // Append the layout to the widget container
            modalContainer.append(testingResultsLayout);
            el = testingResultsLayout

            RunAllTests.runAll()
        }
    }

    /**
     * All test run here
     *
     */
    function runAll() {
        TestBadges.checkShowBadges(getFromLocal('dgw_current_level'))
    }

    const getTestRunTotal = (() => { return testRunTotal })
    const setTestRunTotal = (() => { 
        testRunTotal++ 
        el.querySelector(".tests_total").innerHTML = testRunTotal
    })

    return {
        badgesList: testChecksListBadgesSelector,
        suggestionList: testChecksListSuggestionSelector,
        unlockedList: testChecksListUnlockedSelector,
        increaseTestTotal: setTestRunTotal,
        totalTestRun: getTestRunTotal,
        runAll: runAll,
        init: init,
        resultsHtml: resultsHtml
    }
})(TestBadges)