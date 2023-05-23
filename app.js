
/**
 * Functions that handle game logic, such as updating the score and 
 * checking if the player has reached a certain level. 
 * 
 * It also includes a function to create and show a modal dialog 
 * to the player for entering a daily task/TODOs description. 
 * 
 * The file initializes the game by setting default values for the 
 * score and level, and starts listening for events that impact the score. 
 * 
 * Overall, the file appears to be responsible for setting up the basic 
 * functionality of the game and managing the game state.
 * 
 * 
 * Following methods:
 * 
 * - showModal(): Creates a modal container element with HTML and appends it 
 * to the document body. It also adds event listeners to the close button 
 * and submit button of the modal to hide it and handle the submitted daily description.
 * 
 * - runWinCondistions(): Checks if the currentLevel is equal to the SUCCESS_LEVEL.
 * 
 * - updateScore(): Updates the currentScore variable.
 * 
 * - checkNextLevel(): Checks the current score and level and upgrades the level 
 * if the score meets certain criteria. It also sets the current level 
 * and score in the local storage.
 * 
 * @author MAST_G
 * @licence GPL 3.0
 * 
 * @since 1.0.0
 */



// Modal container tempalte
const modalHtml = `
  <button id="switch-btn" class="modal__switch">Status</button>
  <div id="dev-game-modal" class="modal modal--badge">
    <div class="modal__header">
      <h2 class="modal__title">Level Update</h2>
    </div>
    <div class="modal__body">
      <p class="modal__text">Enter your daily description:</p>
      <textarea id="description" class="modal__textarea"></textarea>
      <button id="submit-btn" class="modal__button-save">Save</button>
      <button id="reset-btn" class="modal__button modal__button-reset">Reset</button>
    </div>

  </div>
  `;

// ----------------------------------------------------------------------------------

/**
 * The time interval to check for the next level.
 * @since 1.0.0
 * @type {number}
 */
const intervalCheckNextLevel = 8000; // 4 seconds

const inetrvalFormModal = 20000

/**
 * The level that signifies success.
 * 
 * @since 1.0.0
 * @type {number}
 */
const SUCCESS_LEVEL = 5

/**
 * The current score of the game.
 * 
 * @since 1.0.0
 * @type {number}
 */
let currentScore = 0

/**
 * The current level of the game.
 * @since 1.0.0
 * @type {number}
 */
let currentLevel = 1


let inetrvalIdCheckNextLevel

let inetrvalIdFormModal

let isDallyGameWon = false

// ----------------------------------------------------------------------------------


/**
 * Reset stats.
 *
 * @since 1.0.0
 */
function resetStats() {
  currentLevel = 1
  currentScore = 0
  isDallyGameWon = false

  saveToLocal('dgw_current_level', currentLevel)
  saveToLocal('dgw_current_score', currentScore)
}

/**
 * Creates a modal container element with HTML and appends it to the document body. 
 * It also adds event listeners to the close button and submit button of the modal 
 * to hide it and handle the submitted daily description.
 * 
 * @since 1.0.0
 */
function showModal() {
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHtml;
  document.body.appendChild(modalContainer);

  const modal = document.getElementById('dev-game-modal');
  const closeBtn = document.querySelector('.modal__close');
  const submitBtn = document.getElementById('submit-btn');
  const descriptionInput = document.getElementById('description');
  const switchBtn = document.getElementById('switch-btn');

  // Submit button click event
  submitBtn.addEventListener('click', () => {
    const description = descriptionInput.value;
    // Handle the daily description
    saveToLocal('dgw_desc', description)

    modal.style.display = 'none';
    
    // New desc new daily goal. Reset game.
    resetStats()
  });
  
  
  switchBtn.addEventListener('click', () => {
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
  });

  // Init. modal show on loading.
  // TODO: If no var in local show
  modal.style.display = 'none';
}

/**
 * Checks if the currentLevel is equal to the SUCCESS_LEVEL
 * 
 * @since 1.0.0
 */
function runWinCondistions() {
  if (currentLevel === SUCCESS_LEVEL) {
    isDallyGameWon = true
    alert("!!! Dev. Game Win !!!")
  }
}

/**
 * Updates the currentScore variable
 *
 * @since 1.0.0
 */
function updateScore(add=1) {
  currentScore = Number(currentScore + add)
}

function checkNextLevel() {
  console.log("Checking level upgrade!");
  
  if (currentScore >= 700 && currentLevel < 2) {
    currentLevel = 2;
  } else if (currentScore >= 1400 && currentLevel < 3) {
    currentLevel = 3;
  } else if (currentScore >= 3900 && currentLevel < 4) {
    currentLevel = 4;
  } else if (currentScore >= 9000 && currentLevel < 5) {
    currentLevel = 5;
    runWinCondistions()
    if (typeof inetrvalIdCheckNextLevel !== 'undefined') clearInterval(inetrvalIdCheckNextLevel)
  }

  
  if (currentScore !== getFromLocal('dgw_current_score')) {
    saveToLocal('dgw_current_score', currentScore)
  }

  if (currentLevel !== getFromLocal('dgw_current_level')) {
    saveToLocal('dgw_current_level', currentLevel);
    console.log("New level:", `${currentLevel}`);

  }
}

// ----------------------------------------------------------------------------------

// Ready
(function () {
  console.log('Page is ready!');

  const savedScore = getFromLocal('dgw_current_score')
  if (savedScore === null) {
    saveToLocal('dgw_current_score', currentScore)
  }
  else {
    let local = Number(getFromLocal('dgw_current_score'))
    updateScore(local + 10)
  }

  showModal()

})();

// DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM is loaded!');
});

// Fully loaded
window.addEventListener('load', function () {
  console.log('Page is fully loaded!');
});

// ----------------------------------------------------------------------------------

// Update score on mouse move
window.addEventListener('mousemove', () => {
  // For each load reword is 1
  updateScore(1)
})

window.onerror = function (message, source, lineno, colno, error) {
  // Log or handle the error here
  console.error('JavaScript Error:', message);
  updateScore(local + 15)

  // You can also send the error information to a server for tracking or analysis
  // sendErrorToServer(message, source, lineno, colno, error);
};

// Set up the interval to run the checkNextLevel function
inetrvalIdCheckNextLevel = setInterval(checkNextLevel, intervalCheckNextLevel);


// Hide modal after 10 seconds
setTimeout(() => {
  if (typeof modal === 'undefined') return
  modal.style.display = 'none';
}, inetrvalFormModal);



// Listen for the "level update" event
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === 'level-update') {
//     showModal();
//   }
// });

