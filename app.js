
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

let isDailyGameWon = false


let modalContainer

let modal
let userEl
let setupEl
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

let projectAttrs

// ----------------------------------------------------------------------------------

// TODO: Add URL scope to be entered for a tast.
/**
 * Reset stats.
 *
 * @since 1.0.0
 */
function resetStats() {
  currentLevel = 1
  currentScore = 0
  isDailyGameWon = false

  saveToLocal('dgw_quest_current_score', currentScore)
  saveToLocal('dgw_quest_current_level', currentLevel)
}


// ----------------------------------------------------------------------------------

// Page: Ready
document.addEventListener('DOMContentLoaded', function () {
  console.log('Event', 'DOMContentLoaded!');

  modalContainer = document.createElement('div');
  modalContainer.innerHTML = AppView.layout;
  document.body.appendChild(modalContainer);

  /* Quest End Stats Card */
  questEndStatsContainer = document.createElement('div');
  questEndStatsContainer.innerHTML = QuestEndStatsView.layout;
  document.body.appendChild(questEndStatsContainer);
});


// Page: Load
window.addEventListener('load', async function (e) {
  console.log('Event', 'load!');

  /* Widget */
  switchBtn = document.getElementById('switch-btn');
  modal = document.getElementById('dev-game-modal');
  
  userEl = document.querySelector('[data-ui="user"]');
  setupEl = document.querySelector('.widget__setup')
  workInfo = document.querySelector(".widget__work")
  workDesc = document.querySelector(".widget__work-desciption")
  workLevel = document.querySelector(".widget__work-level")
  workScore = document.querySelector(".widget__work-score")
  abilites = document.querySelector("[data-abilities]")
              
  localStorage.setItem('name', 'mastg')
  localStorage.setItem('email', 'adam.gicevic@gmail.com')

  // Init. modal show on loading.
  modal.style.display = 'none';

  // Toggle widget
  switchBtn.addEventListener('click', () => {
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
  });

  // Set graphics for project
  const projectAttrs = await Project.getAttributes();
  user.setBackground(userEl, projectAttrs.avatar_id)
  setup.setBackground(setupEl, projectAttrs.terminal_id)
  AppView.setBackground(modalContainer, projectAttrs.background_id)


  user.onReady(userEl)
  user.handleFormDisplay((localStorage.getItem('rlgin')) ? true : false)

  // Abilities
  Abilities.onReady(abilites.children)
  
  // Badges
  Badges.onReady()

  
  window.onerror = function (message, source, lineno, colno, error) {
    // Log or handle the error here
    console.info('Track Error:', message);

    // You can also send the error information to a server for tracking or analysis
    // sendErrorToServer(message, source, lineno, colno, error);
  };
  
  modal.addEventListener('questReset', function (event) {
    
    // Handle the quest reset event here
    console.log('Quest has been reset!');
    
    let isQuestComplited = runWinCondistions();
    
    if(isQuestComplited) {
      QuestEndStatsView.initCard(isQuestComplited)
    }
  });

  RunAllTests.init(modalContainer)

  // Send actions data
  setInterval(function () {
    Tracking.sendEventsToAPI();
  }, 8000); // Adjust the time period as needed

});
// ----------------------------------------------------------------------------------




// Set up the interval to run the checkNextLevel function
// inetrvalIdCheckNextLevel = setInterval(checkNextLevel, intervalCheckNextLevel);

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