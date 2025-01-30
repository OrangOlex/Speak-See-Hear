
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
                description: '1987 Saturday March 9th 7:30AM  (Press Enter to continue)',
                actions: {
                    '': 'Wakeup'
                }
            },
            Wakeup: {
                description: 'You hear your alarm clock in the background, so you reach your hand over to turn it off. (Press Enter to continue)',
                actions: {
                    '': 'TourRoom'
                }
            },
            TourRoom: {
                description: 'You sit up in your bed, eyes still filled with sleep. You look around at your room as your vision clears. (Press Enter to continue)',
                actions: {
                    '': 'RoomExplore'
                }
            },
            RoomExplore: {
                description: 'You can go into the bathroom, open up the closet or leave your room. ({Bathroom/yes}{Closet/no}{Leave/Press Enter to continue})',
                actions: {
                    yes: 'BathroomEncounter',
                    no: 'ClosetEncounter',
                    '': 'end'
                }
            },
            BathroomEncounter: {
                description: 'You open the door to the bathroom and take care of your buisness. (Press Enter to continue)',
                actions: {
                    '': 'RoomExplore'
                }
            },
            ClosetEncounter: {
                description: 'You open the closet and get dressed. (Press Enter to continue)',
                actions: {
                    '': 'FamilyPic'
                }
            },
            FamilyPic: {
                description: 'A picture is exposed as you grab a shirt from the hanger... Your Wife, daughter, son, and you. (Press Enter to continue)',
                actions: {
                    '': 'FlashBack'
                }
            },
            FlashBack: {
                description: 'You start to remember that awful night. The night of the car crash. (Press Enter to continue)',
                actions: {
                    '': 'ShowFamily'
                }
            },
            //Show the newspaper story story of the car crash
            ShowFamily: {
                description: '(Press Enter to continue)',
                actions: {
                    '': 'RoomExplore'
                }
            },
            end: {
                description: 'Thank you for playing',
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
