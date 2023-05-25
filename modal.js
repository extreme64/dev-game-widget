// Modal container tempalte
const modalHtml = `
  <main id="wgw-main" class="wgw-main">
    <!-- Maximize widget -->
    <button id="switch-btn" class="modal__switch">Status</button>
    
    <!-- Widget -->
    <div id="dev-game-modal" class="modal modal--badge">
      <div class="modal__header">
        <h2 class="modal__title">Work Session</h2>
      </div>
      <div id="new-work-form" class="modal__body">
        <p class="modal__text">Enter work description:</p>
        <textarea id="description" class="modal__textarea"></textarea>
        <button id="submit-btn" class="modal__button-save">Save</button>
      </div>
      <div class="modal__work">
        <h3 class="modal__work-desciption">Some work task info text.</h3>
        <p class="modal__work-level">4</p>
        <p class="modal__work-score">4000</p>
      </div>
      <button id="reset-btn" class="modal__button modal__button-reset">Reset</button>
    </div>
    
    <!-- Awards -->
    <div id="awards-badges" class="awards awards--badge">
      <div class="awards__background sprite sprite1">
        <span class="awards__test"></span>
        <span class="awards__download">
          <button class="awards__button">Save award</button>
        </span>  
      </div>
    </div>
    
  </main>
  `;