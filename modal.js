// Modal container tempalte
const modalHtml = `
  <button id="switch-btn" class="modal__switch">Status</button>
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
  `;
