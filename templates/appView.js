// Modal container tempalte
const AppView = (() => {

  // FIXME: Stop apps CSS impact our extension markup, add all declarations that are important to us.
  const widgetHtml = `
    <main id="wgw-main" class="wgw-main">
      
      <!-- Maximize widget -->
      <button id="switch-btn" class="modal__switch">Status</button>

      <div id="dev-game-modal" class="widget">
        <!-- user -->
        ${user.html}

        <!-- Setup -->
        ${setup.html}

        <!-- stats wrap -->
        ${Stats.html}

        <!-- abilities wrap -->
        ${Abilities.html}
      </div>
      
      <!-- Awards -->
      ${Badges.level}
    </main>`;


  function setBackground(contextEl, url) {
    let bgImgEl = contextEl.querySelector('#dev-game-modal')
    bgImgEl.style.backgroundImage = `url(${url})`
  }

    return {
      layout: widgetHtml,
      setBackground
    }

})()