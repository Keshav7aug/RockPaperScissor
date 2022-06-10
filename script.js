const choices = ["rock","scissor","paper"]
const images = {"rock":"rock.jfif", 
                "paper":"paper.jfif",
                "scissor":"scissor.jpg"}
const numberOfOptions = 3;
let userScore = 0
let computerScore = 0
const userElement = document.querySelector('#user')
const computerElement = document.querySelector('#computer')
const computerImg = document.querySelector('.computer')
const win = document.querySelector('.winner')
const restartBtn = document.querySelector('#restart')
function updateScore() {
    userElement.textContent = `${userScore}`
    computerElement.textContent = `${computerScore}`
}

function reset() {
    userScore = 0
    computerScore = 0
    updateScore()
    computerImg.setAttribute('src',``)
    restartBtn.textContent = "Restart"
    document.body.style.backgroundImage = ""
    document.body.style.backgroundColor = "black"
}


function computer() {
    const choice = Math.floor(Math.random()*3)
    return choices[choice]
}

function getIndex(choice) {
    choice = choice.toLowerCase();
    for(i=0;i<numberOfOptions;++i) {
        if(choice == choices[i]) {
            return i
        }
    }
    return -1
}

function didUserWin(userChoice, computerChoice) {
    userChoiceIdx = getIndex(userChoice)
    computerChoiceIdx = getIndex(computerChoice)
    if(userChoiceIdx == computerChoiceIdx) {
        return -1
    }
    if((userChoiceIdx+1)%numberOfOptions == computerChoiceIdx) {
        return 0
    }
    return 1
}

function play(e) {
    if(userScore>=5 || computerScore>=5) {
        return
    }
    const userChoice = this.getAttribute("alt")
    const computerChoice = computer()
    let winnerName = ""
    console.log(computerChoice)
    const winner = didUserWin(computerChoice, userChoice)
    if(winner==1) {
        userScore++
        winnerName = "You"
    }
    else if(winner==0) {
        computerScore++
        winnerName = "Computer"
    }
    else {
        winnerName = "No One"
    }
    console.log(userElement)
    computerImg.setAttribute('src',`Images/${images[computerChoice]}`)
    updateScore()
    if(userScore>=5) {
        restartBtn.textContent = "You Won, Play Again?"
        document.body.style.backgroundImage = "url('Images/winner.jpg')"
    }
    else if(computerScore>=5) {
        restartBtn.textContent = "Computer Won, Play Again?"
        document.body.style.backgroundImage = "url('Images/roboWin.jpg')"
    }
    
}
choicesDiv = document.querySelectorAll(".choice")
choicesDiv.forEach(div => div.addEventListener('click', play))
restartBtn.addEventListener('click', reset)