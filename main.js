// const Main = (() => {

//     // Private variables
//     const intervalCheckNextLevel = 4000; // 10 seconds
//     const intervalFormModal = 15000;
//     const SUCCESS_LEVEL = 5;
//     let currentScore = 0;
//     let currentLevel = 1;
//     let intervalIdCheckNextLevel;
//     let intervalIdFormModal;
//     let isDailyGameWon = false;
//     let modalContainer;
//     let modal;
//     let workForm;
//     let submitBtn;
//     let resetBtn;
//     let workDescription;
//     let switchBtn;
//     let workInfo;
//     let workDesc;
//     let workLevel;
//     let workScore;
//     let abilities;

//     // Private functions
//     function resetStats() {
//         currentLevel = 1;
//         currentScore = 0;
//         isDailyGameWon = false;
//         saveToLocal('dgw_current_level', currentLevel);
//         saveToLocal('dgw_current_score', currentScore);
//     }

//     function setupModal() {
//         modalContainer = document.createElement('div');
//         modalContainer.innerHTML = widgetHtml;
//         document.body.appendChild(modalContainer);

//         modal = document.getElementById('dev-game-modal');
//         workForm = document.getElementById('new-work-form');
//         submitBtn = document.getElementById('submit-btn');
//         resetBtn = document.getElementById('reset-btn');
//         workDescription = document.getElementById('description');
//         switchBtn = document.getElementById('switch-btn');

//         workInfo = document.querySelector('.widget__work');
//         workDesc = document.querySelector('.widget__work-desciption');
//         workLevel = document.querySelector('.widget__work-level');
//         workScore = document.querySelector('.widget__work-score');

//         abilities = document.querySelector('[data-abilities]');
//     }

//     function setupEventListeners() {

//         resetBtn.addEventListener('click', () => {
//             if (workForm.style.display === 'flex') {
//                 workInfo.style.display = 'grid';
//                 workForm.style.display = 'none';
//                 resetBtn.innerText = 'Reset';
//             } else {
//                 workDescription.value = '';
//                 workInfo.style.display = 'none';
//                 workForm.style.display = 'flex';
//                 resetBtn.innerText = 'Cancel';
//             }
//         });

//         submitBtn.addEventListener('click', () => {
//             const description = workDescription.value;
//             saveToLocal('dgw_desc', description);
//             workForm.style.display = 'none';
//             resetStats();
//         });

//         switchBtn.addEventListener('click', () => {
//             modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
//         });

//         window.addEventListener('mousemove', () => {
//             updateScore(0.25);
//         });

//         // window.onerror = function (message, source, lineno, colno, error) {
//         //     console.info('JavaScript Error:', message);
//         // };

//         // Set abilities
//         AbilitiesModule.init(abilities.children);
//     }



//     function init() {
//         setupModal();
//         setupEventListeners();

//         const savedScore = getFromLocal('dgw_current_score');
//         if (savedScore === null) {
//             saveToLocal('dgw_current_score', currentScore);
//         } else {
//             let local = Number(getFromLocal('dgw_current_score'));
//             updateScore(local + 35);
//             workForm.style.display = 'none';
//             workInfo.style.display = 'grid';
//             workDesc.innerText = getFromLocal('dgw_desc');
//             workLevel.innerText = '🆙 LEVEL ' + getFromLocal('dgw_current_level');
//             workScore.innerText = '🎮 ' + getFromLocal('dgw_current_score');
//         }

//         modal.style.display = 'none';

//         intervalIdFormModal = setTimeout(() => {
//             if (typeof modal === 'undefined') return;
//             modal.style.display = 'none';
//         }, intervalFormModal);

//         intervalIdCheckNextLevel = setInterval(checkNextLevel, intervalCheckNextLevel);

//         RunAllTests.init(modalContainer);
//     }

//     // Public methods
//     function updateScore(amount) {
//         currentScore += amount;
//     }

//     function checkNextLevel() {
//         if (currentLevel === SUCCESS_LEVEL) {
//             // Do something when success level is reached
//         }
//     }

//     // Return the public methods/properties
//     return {
//         init,
//         updateScore,
//         checkNextLevel,
//         modalContainer: modalContainer
//     };

// })(RunAllTests);

// // Call init when DOM is ready
// console.log("sssss");
// Main.init();





