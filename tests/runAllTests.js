const RunAllTests = (() => {

    let testRunTotal = 0

    const resultsHtml = `
        <aside class="tests">
            <h3>TESTS RESULTS:</h3>
            <h4>badges</h4>
            <ul id="badges">
            </ul>
        </aside>`

    function init() { 
        const urlParams = new URLSearchParams(window.location.search);
        const isTestingMode = urlParams.has('testing') && urlParams.get('testing') == 'true';

        if (isTestingMode) {
            console.log("***TESTING***");
            // Append testing results layout
            const testingResultsLayout = document.createElement('div');
            testingResultsLayout.innerHTML = RunAllTests.resultsHtml

            // Append the layout to the widget container
            modalContainer.append(testingResultsLayout);

            RunAllTests.runAll()
        }
    }

    /**
     * All test run here
     *
     */
    function runAll() {
        TestBadges.checkShowBadges()
    }

    const getTestRunTotal = (() => { return testRunTotal })
    const setTestRunTotal = (() => { testRunTotal++ })

    return {
        addTestDone: setTestRunTotal,
        totalTestRun: getTestRunTotal,
        runAll: runAll,
        init: init,
        resultsHtml: resultsHtml
    }
})(TestBadges)

RunAllTests.init()