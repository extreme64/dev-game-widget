const setup = (function () {
    
    const html = `
        <div class="widget__setup" >
            <a href="https://forwardcreating.com" alt="pc gaming setup" title="If you have time, check gaming parts." target="_blank">
                <img class="widget__setup-img" src="https://www.imgbly.com/ib/ldCd077O5g.png"
                    alt="developer pc setup">
            </a>
        </div>`


    function setBackground(contextEl, url) {
        let bgImgEl = contextEl.querySelector('.widget__setup-img')
        bgImgEl.src = url
    }


    return {
        html,
        setBackground
    }

})()