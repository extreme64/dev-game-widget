
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



// ----------------------------------------------------------------------------------

/**
 * The time interval to check for the next level.
 * @since 1.0.0
 * @type {number}
 */
const intervalCheckNextLevel = 4000; // 10 seconds

const inetrvalFormModal = 15000

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


let modalContainer

let modal
let workForm
let submitBtn
let resetBtn
let workDescription
let switchBtn


let workInfo
let workDesc
let workLevel
let workScore

let abilites

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


// ----------------------------------------------------------------------------------

// Ready
(function () {
  console.log('Page is ready!');

  modalContainer = document.createElement('div');
  modalContainer.innerHTML = widgetHtml;
  document.body.appendChild(modalContainer);

  modal = document.getElementById('dev-game-modal');
  workForm = document.getElementById('new-work-form');
  submitBtn = document.getElementById('submit-btn');
  resetBtn = document.getElementById('reset-btn');
  workDescription = document.getElementById('description');
  switchBtn = document.getElementById('switch-btn');

  workInfo = document.querySelector(".widget__work")
  workDesc = document.querySelector(".widget__work-desciption")
  workLevel = document.querySelector(".widget__work-level")
  workScore = document.querySelector(".widget__work-score")

  abilites = document.querySelector("[data-abilities]")

  const savedScore = getFromLocal('dgw_current_score')
  if (savedScore === null) {
    saveToLocal('dgw_current_score', currentScore)
  }
  else {
    let local = Number(getFromLocal('dgw_current_score'))
    updateScore(local + 35)

    // If var in local set hide form
    workForm.style.display = 'none';

    // Show work info
    workInfo.style.display = 'grid';
    workDesc.innerText = getFromLocal('dgw_desc');
    workLevel.innerText = '🆙 LEVEL ' + getFromLocal('dgw_current_level');
    workScore.innerText = '🎮 ' + getFromLocal('dgw_current_score');
  }


  // Show new work form
  resetBtn.addEventListener('click', (e) => {

    if(workForm.style.display === 'flex'){
      workInfo.style.display = 'grid';
      workForm.style.display = 'none';
      e.target.innerText = "Reset"
    } else {
      workDescription.value = ''
      workInfo.style.display = 'none';
      workForm.style.display = 'flex';
      e.target.innerText = "Cancel"
    }
  });

  // Submit new work
  submitBtn.addEventListener('click', () => {
    const description = workDescription.value;
    // Handle the daily description
    saveToLocal('dgw_desc', description)

    workForm.style.display = 'none';

    // New desc new daily goal. Reset game.
    resetStats()
  });

  switchBtn.addEventListener('click', () => {
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
  });

  // Init. modal show on loading.
  modal.style.display = 'none';


  // Update score on mouse move
  window.addEventListener('mousemove', () => {
    // For each load reword is 1
    updateScore(0.25)
  })

  window.onerror = function (message, source, lineno, colno, error) {
    // Log or handle the error here
    console.info('JavaScript Error:', message);
    // FIXME: update on error, local is NULL
    // updateScore(local + 15)

    // You can also send the error information to a server for tracking or analysis
    // sendErrorToServer(message, source, lineno, colno, error);
  };



  // Add click listeners for abilite list btn.
  setAbilitesListeners(abilites.children, abclick)

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

