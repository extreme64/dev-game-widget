// Modal container tempalte
const widgetHtml = `
  <main id="wgw-main" class="wgw-main">
  <!-- Maximize widget -->
  <button id="switch-btn" class="modal__switch">Status</button>

  <div id="dev-game-modal" class="widget">
    <!-- avatar -->
    <div class="widget__avatar">
      ✨✨✨
    </div>
    <!-- user wrap -->
    <div class="widget__user">
      <a href="https://github.com/extreme64"  title="Visit profile" target="_blank">
        👦 Mast_G
      </a>
    </div>
    <!-- Setup -->
    <div class="widget__setup">
      <a href="https://forwardcreating.com" alt="pc gaming setup" title="If you have time, check gaming parts." target="_blank">
        <img class="widget__setup-img" src="images/organic-flat-gamer-room-illustration.png"
          alt="developer pc setup">
      </a>
    </div>
    <!-- stats wrap -->
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
    </div>
    <!-- abilities wrap -->
    <div class="widget__abilities">
      ${AbilitiesModule.abilitiesHtml}
    </div>
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

</main>`;