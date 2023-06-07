const Events = (()=>{

    const setEventListeners = (eventType, nodeList, callback) => {
        if (typeof nodeList !== 'undefined') {
            [...nodeList].forEach(node => {
                const listener = function (event) {
                    callback(node.dataset.id, event, listener);
                };
                node.addEventListener(eventType, listener);
            });
        }
    }

    return {
        setEventListeners: setEventListeners
    }
})()
