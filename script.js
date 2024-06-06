const holders = document.querySelectorAll(".box");
const turn = document.querySelector(".turn");

const positions = {
    "top left box": [1, 1],
    "top box": [1, 2],
    "top right box": [1, 3],
    "left box": [2, 1],
    "box": [2, 2],
    "right box": [2, 3],
    "bottom left box": [3, 1],
    "bottom box": [3, 2],
    "bottom right box": [3, 3],
};

let gameOver;
let turnsPlayed;

let player1 = prompt("Enter name of player 1 (O)");
let player2 = prompt("Enter name of player 2 (X)");

document.querySelector(".user-info").innerText = `O is chosen by ${player1}.\nX is chosen by ${player2}.`

let parai;
let paraj;
let parak;

let zero;
let cross;

let insertion;

function resetAll() {
    turnsPlayed = 0;
    gameOver = false;
    zero = [];
    cross = [];
    insertion = "O";
    if (parai !== undefined) {
        parai.classList.remove("game-over");
        paraj.classList.remove("game-over");
        parak.classList.remove("game-over");
    }
    holders.forEach(holder => {
        holder.querySelector("p").innerText = "";
    });
    turn.innerText = `${player1}'s turn.`;
}

function checkWinner(arr) {
    const len = arr.length;
    for (let i = 0; i < len - 2; ++i) {
        for (let j = i + 1; j < len - 1; ++j) {
            for (let k = j + 1; k < len; ++k) {
                if ((positions[arr[k]][0] - positions[arr[i]][0]) * (positions[arr[j]][1] - positions[arr[i]][1]) === (positions[arr[j]][0] - positions[arr[i]][0]) * (positions[arr[k]][1] - positions[arr[i]][1])) {
                    parai = document.querySelector(`[class="${arr[i]}"]`);
                    paraj = document.querySelector(`[class="${arr[j]}"]`);
                    parak = document.querySelector(`[class="${arr[k]}"]`);
                    parai.classList.add("game-over");
                    paraj.classList.add("game-over");
                    parak.classList.add("game-over");
                    return true;
                }
            }
        }
    }

    return false;
}

function append(box) {
    if (!gameOver) {
        const p = box.querySelector("p");
        if (p.innerHTML === "") {
            p.innerHTML = insertion;
            ++turnsPlayed;
            if (insertion === "O") {
                zero.push(box.getAttribute("class"));
                if (checkWinner(zero)) {
                    turn.innerText = `${player1} won.`;
                    gameOver = true;
                } else {
                    if (turnsPlayed === 9) {
                        turn.innerText = `Draw. Please press reset button.`;
                    } else {
                        turn.innerText = `${player2}'s turn.`;
                        insertion = "X";
                    }
                }
            } else {
                cross.push(box.getAttribute("class"));
                if (checkWinner(cross)) {
                    turn.innerText = `${player2} won.`;
                    gameOver = true;
                } else {
                    turn.innerText = `${player1}'s turn.`;
                    insertion = "O";
                }
            }
        }
    }
}

holders.forEach(holder => {
    holder.setAttribute("onclick", "append(this)")
});

resetAll();