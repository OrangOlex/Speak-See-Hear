
    document.addEventListener('DOMContentLoaded', () => {
        const mainScreen = document.getElementById('main-screen');
        const instructionsScreen = document.getElementById('instructions-screen');
        const gameContainer = document.getElementById('game-container');
        const gameOutput = document.getElementById('game-output');
        const gameInput = document.getElementById('game-input');
        const startGameButton = document.getElementById('start-game');
        const howToPlayButton = document.getElementById('how-to-play');
        const closeInstructionsButton = document.getElementById('close-instructions');

        const gameState = {
            currentRoom: 'intro',
            inventory: []
        };

        const rooms = {
            intro: {
                description: 'You are a young seventeen-year-old girl, and you are left home alone. You love to play video games with friends but also enjoy playing old-school text-based games alone. You sit down at your computer and receive a popup. POPUP( Hide and Shreik ) Do you want to click on the game?',
                actions: {
                    yes: 'gamestart',
                    no: 'gameplaying'
                }
            },
            gamestart: {
                description: 'You click on the popup and the game loads. The game is about a girl who is left alone and a murderer is on the loose. She must lock doors, close windows, and hide to protect herself from the murderer. Do you want to play the game?',
                actions: {
                    yes: 'gameplaying',
                    no: 'gameplaying'
                }
            },
            end: {
                description: 'Thank you for playing Hide and Shreik!',
                actions: {}
            }
        };

        function displayMessage(message) {
            const p = document.createElement('p');
            p.innerHTML = message;
            gameOutput.appendChild(p);
            gameOutput.scrollTop = gameOutput.scrollHeight;
        }

        function processCommand(command) {
            const currentRoom = rooms[gameState.currentRoom];

            if (command in currentRoom.actions) {
                gameState.currentRoom = currentRoom.actions[command];
                displayMessage(rooms[gameState.currentRoom].description);
            } else {
                displayMessage('Try restating your command.');
            }
        }

        gameInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const command = gameInput.value.trim().toLowerCase();
                gameInput.value = '';
                processCommand(command);
            }
        });

        startGameButton.addEventListener('click', () => {
            mainScreen.classList.add('hidden');
            gameContainer.classList.remove('hidden');
            gameState.currentRoom = 'intro';
            displayMessage(rooms[gameState.currentRoom].description);
        });

        howToPlayButton.addEventListener('click', () => {
            mainScreen.classList.add('hidden');
            instructionsScreen.classList.remove('hidden');
        });

        closeInstructionsButton.addEventListener('click', () => {
            instructionsScreen.classList.add('hidden');
            mainScreen.classList.remove('hidden');
        });
    });
