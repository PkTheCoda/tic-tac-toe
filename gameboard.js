const startbutton = document.querySelector('.startbutton')

const playerMarker = (player, marker) => {
    this.player = player;
    this.marker = marker;
}

const startGame = () => {
    let boardArray = ["","","","","","","","",""]
    const board = document.querySelector('.gameboard')
    const makeBoard = () => {
        for (let i = 0; i < boardArray.length; i++) {
            let boardsquare = document.createElement('div')
            boardsquare.classList.add('boardsquare')
            boardsquare.setAttribute('id', i + 1)
            board.appendChild(boardsquare)
        }
    }

    const clearHeadings = () => {
        document.querySelector('.headers').style.display = 'none';
        document.querySelector('.startbuttons').style.display = 'none';
        document.querySelector('.headertext').style.display = 'block';
        document.querySelector('.gameboard').style.display = 'flex';        
    }

    return {
        makeBoard,
        clearHeadings,
        boardArray
    }
}

const gameLogic = () => {
    const endOfGame = endgame();
    let marker = "X"
    const placeMarker = () => {        
        if (marker === "X") {
            marker = "O"
            return "X"
        } else if (marker === "O") {
            marker = "X"
            return "O"
        }
    }

    let playerSelection = "player2"
    const choosePlayer = (player1, player2) => {
        if (playerSelection === "player1") {
            playerSelection = "player2"
            return `It is ${player1}'s turn:`
        } else if (playerSelection === "player2") {
            playerSelection = "player1"
            return `It is ${player2}'s turn:`
        }
    }


    const winningSolutions = [
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,5,9],
        [3,5,7]
    ]

    const headertext = document.querySelector('.headertext')
    const checkWinner = () => {
        for (let x = 0; x < winningSolutions.length; x++) {
            if (document.getElementById(winningSolutions[x][0]).textContent == "X" && 
                document.getElementById(winningSolutions[x][1]).textContent == "X" && 
                document.getElementById(winningSolutions[x][2]).textContent == "X") {
                headertext.textContent = `${document.querySelector('.player1').value} has won the game!`
                endOfGame.showEndButtons();
                document.querySelector('.backbutton').addEventListener('click', () => {
                    endOfGame.goToHomepage();
                    endOfGame.clearBoard();
                    window.location.reload();
                })

            } else if (document.getElementById(winningSolutions[x][0]).textContent == "O" && 
                       document.getElementById(winningSolutions[x][1]).textContent == "O" && 
                       document.getElementById(winningSolutions[x][2]).textContent == "O") {
                    headertext.textContent = `${document.querySelector('.player2').value} has won the game!`
                    endOfGame.showEndButtons();
                    document.querySelector('.backbutton').addEventListener('click', () => {
                        endOfGame.goToHomepage();
                        endOfGame.clearBoard();
                        window.location.reload();
                    })

            }
        }  
            

    }

    return {
        placeMarker, 
        choosePlayer, 
        checkWinner
    };
}

const endgame = () => {
    const endbuttons = document.querySelector('.endbuttons')
    const showEndButtons = () => {
        endbuttons.style.display = 'flex';
    }

    const goToHomepage = () => {
        document.querySelector('.headers').style.display = 'flex';
        document.querySelector('.startbuttons').style.display = 'flex';
        document.querySelector('.headertext').style.display = 'none';
        document.querySelector('.gameboard').style.display = 'none';
        document.querySelector('.endbuttons').style.display = 'none';
    }

    const clearBoard = () => {
        for (const item of document.querySelectorAll('.boardsquare')) {
            item.removeEventListener('click', () => {
                alert("Removed")
            })
            item.textContent = " ";
        }
    }

    return {showEndButtons, goToHomepage, clearBoard}
}


startbutton.addEventListener('click', () => {
    const display = startGame();
    const gameMechanics = gameLogic();
    const headertext = document.querySelector('.headertext')
    
    display.makeBoard();
    display.clearHeadings();

    const boardtiles = document.querySelectorAll('.boardsquare')
    headertext.textContent = `It is ${document.querySelector('.player1').value}'s turn`

    for (const item of boardtiles) {
        item.addEventListener('click', () => {
            console.log(item.id)
            if (item.textContent === "") {

                item.textContent = gameMechanics.placeMarker();
                headertext.textContent = gameMechanics.choosePlayer(document.querySelector('.player1').value, document.querySelector('.player2').value )
                gameMechanics.checkWinner();         
                
            } else if (item.textContent !== "") {
                alert("Hey! You already played there")
            }            
            
           
        })
    }  
    
})



