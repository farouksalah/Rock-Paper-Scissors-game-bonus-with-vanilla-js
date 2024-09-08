const ruleBtn = document.getElementById("rules");
const ruleClose = document.getElementById("rules-close");
const ruleList = document.getElementById("rules-list");
const cover = document.getElementById("cover");
const pickBtns = Array.from(document.querySelectorAll("main button"));
const mainContent = document.querySelector("main");
const score = document.getElementById("score");
let scoreSaved = 0

ruleBtn.addEventListener("click", () => {
    ruleList.style.display = "block";
    cover.style.display = "block";
})
ruleClose.addEventListener("click", () => {
    ruleList.style.display = "none";
    cover.style.display = "none";
})

const reset = () => {
    mainContent.className = "start"
    mainContent.innerHTML = `
        <img src="images/bg-pentagon.svg">
    <button class="pick scissors" id="scissors">
        <span>
            <img src="images/icon-scissors.svg">
        </span>
    </button>
    <button class="pick paper" id="paper">
        <span>
            <img src="images/icon-paper.svg">
        </span>
    </button>
    <button class="pick rock" id="rock">
        <span>
            <img src="images/icon-rock.svg">
        </span>
    </button>
    <button class="pick lizard" id="lizard">
        <span>
            <img src="images/icon-lizard.svg">
        </span>
    </button>
    <button class="pick spock" id="spock">
        <span>
            <img src="images/icon-spock.svg">
        </span>
    </button>
    `
    Array.from(document.querySelectorAll("main.start button")).forEach(btn => btn.addEventListener("click", () => {
        updateThePick(btn.id);
        const option = updateAndHousePick(btn.id);
        chooseTheWinner(btn.id, option)
    }))
}

const updateScore = num => {
    setTimeout(() => {
        scoreSaved += num;
        if (scoreSaved < 0) {
            scoreSaved = 0
        }
        score.innerText = scoreSaved
    }, 2000)
}


const houseChoose = () => {
    const chooseList = pickBtns.map(btn => btn.id)
    return chooseList[Math.floor(chooseList.length * Math.random())]
}

const updateThePick = id => {
    mainContent.className = "in-game";
    mainContent.innerHTML = `
    <div class="player-area">
        <p class="tit">YOU PICKED</p>
        <button class="pick ${id} bigger">
            <span>
                <img src="images/icon-${id}.svg">
            </span>
        </button>
    </div>
    <div class="player-area">
        <p class="tit">THE HOUSE PICKED</p>
        <div class="circel-shadow"></div>
    </div>
    `
}
const updateAndHousePick = id => {
    mainContent.className = "in-game";
    const option = houseChoose();
    setTimeout(() => {
        mainContent.innerHTML = `
        <div class="player-area">
            <p class="tit">YOU PICKED</p>
            <button class="pick ${id} bigger">
                <span>
                    <img src="images/icon-${id}.svg">
                </span>
            </button>
            </div>
            <div class="player-area">
            <p class="tit">THE HOUSE PICKED</p>
            <button class="pick ${option} bigger">
                <span>
                    <img src="images/icon-${option}.svg">
                </span>
            </button>
        </div>
        `;
    }, 1000)
    return option
}
const showPlayAgain = (msg, user, house, whoWin) => {
    setTimeout(() => {
        mainContent.innerHTML = `
        <div class="player-area">
            <p class="tit">YOU PICKED</p>
            <button id="1" class="pick ${user} bigger">
                <span>
                    <img src="images/icon-${user}.svg">
                </span>
            </button>
            </div>
            <div class="game-msg">
                <p>${msg}</p>
                <button onclick="reset()">play again</button>
            </div>
            <div class="player-area">
            <p class="tit">THE HOUSE PICKED</p>
            <button id="2" class="pick ${house} bigger">
                <span>
                    <img src="images/icon-${house}.svg">
                </span>
            </button>
        </div>
        `;
        if (whoWin) {
            document.getElementById(`${whoWin}`).classList.add("win-shadow")
        }
    }, 2000)
}
const chooseTheWinner = (user, house) => {
    if (user === house) {
        showPlayAgain("DRAW!", user, house);
        updateScore(0);
        return
    }
    const winCases = [
        user === "scissors" && ["paper", "lizard"].includes(house),
        user === "paper" && ["rock", "spock"].includes(house),
        user === "rock" && ["scissors", "lizard"].includes(house),
        user === "lizard" && ["paper", "spock"].includes(house),
        user === "spock" && ["scissors", "rock"].includes(house),
    ]
    if (winCases.some(cas => cas)) {
        showPlayAgain("YOU WIN", user, house, 1);
        updateScore(1);
    } else {
        showPlayAgain("YOU LOSE", user, house, 2);
        updateScore(-1);
    }
}

pickBtns.forEach(btn => btn.addEventListener("click", () => {
    updateThePick(btn.id);
    const option = updateAndHousePick(btn.id);
    chooseTheWinner(btn.id, option)
}))


