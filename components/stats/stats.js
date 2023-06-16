const stats = (function () {
    
    const html = `
    <div class="widget__stats">
        <div id="new-work-form" class="widget__stats-inner">
        <p class="widget__stats-text">Enter work description:</p>
        <textarea id="description" class="widget__stats-desc-input"></textarea>
        <button id="submit-btn" class="widget__stats-button-save">Save</button>
        </div>
        <div class="widget__work">
        <div>🔖</div>
        <h3 class="widget__work-desciption widget__stats-item">Some work task info text.</h3>
        <p class="widget__work-level widget__stats-item">4</p>
        <p class="widget__work-score widget__stats-item">4000</p>
        </div>
        <button id="reset-btn" class="widget__stats-button widget__stats-button-reset">Reset</button>
    </div>`

    return {
        html
    }
    
})()