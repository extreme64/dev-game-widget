const tracking = (function () {

    const projectId = 1;
    let capturedEvents = [];

    function onReady(document) {
        pageReloaded()

        document.addEventListener('click', (e)=> {
            clicked(e)
        })

        document.addEventListener('mousemove', (e) => {
            mouseMoved(e)
        })

        document.addEventListener('scroll', (e) => {
            scrolled(e)
        })
    }

    function pageReloaded() {
        capturedEvents.push({ type: 'reload', timestamp: Date.now() });
    }

    function clicked(e) {
        capturedEvents.push({ type: 'click', timestamp: Date.now(), target: e });
    }

    function mouseMoved(e) {
        capturedEvents.push({ type: 'mousemove', timestamp: Date.now(), target: e.target });
    }

    function scrolled(e) {
        capturedEvents.push({ type: 'scroll', timestamp: Date.now() });
    }

    // Function to send captured events to the API
    async function sendEventsToAPI() {
        
        if (capturedEvents.length === 0){
            return
        }

        // TODO: Add on quest create, to local trg.
        // TODO: handle net::ERR_CONNECTION_REFUSED
        let questId = localStorage.getItem('dgw_quest_id') 
        let token = localStorage.getItem('rlgin')

        data = {
            metrics: capturedEvents
        };
        
        await fetch(`http://localhost:8000/api/project/${projectId}/quests/id/${questId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Events sent successfully:', data);





            capturedEvents = []
        })
        .catch(error => {
            console.error('Error sending events:', error);
        });
    }

    return {
        onReady,
        sendEventsToAPI
    }
})()