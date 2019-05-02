let colors = ["red", "orange", "yellow", "green", "blue", "purple"]
let tiles = colors.length * 2
let clicks = 0
let solved = 0
let seconds = 60

// Duplicate colors to create pairs
for (let i = 0; i < tiles/2; i++) {
  colors.push(colors[i])
}

// Set up grid
let grid = document.querySelector("#grid")
for (let i = 0; i < tiles; i++) {
  let div = document.createElement("div")
  let randomColor = Math.floor(Math.random() * colors.length)
  div.setAttribute("class", "square hidden")
  div.setAttribute("id", i)
  div.style.backgroundColor = colors[randomColor]
  colors.splice(randomColor, 1)
  grid.appendChild(div)
}

let squares = document.querySelectorAll(".square")
squares = Array.from(squares)

// Variables to store what has been clicked
let firstClick
let secondClick

// Event listener that toggles the squares' visibility and tracks what has been clicked
squares.forEach((square) => {
  square.addEventListener("click", e => {
    clicks++
    if (clicks == 1) {
      square.classList.toggle("hidden")
      firstClick = e.target
    }
    if (clicks == 2) {
      square.classList.toggle("hidden")
      secondClick = e.target
      if (firstClick.style.backgroundColor == secondClick.style.backgroundColor) {
        solved++
        removeSquares(firstClick, secondClick)
        if (solved >= tiles/2) {
          win()
        }
      }
    }
  })
})

// Resets the board with squares still in the array (aka unsolved squares)
const reset = () => {
  if (clicks > 1) {
    squares.forEach((square) => {
      if (!square.classList.contains("hidden")) {
        square.classList.add("hidden")
      }
    })
    clicks = 0
  }
  firstClick = null
  secondClick = null
}

setInterval(reset, 2000)

// Removes squares based on their id by finding their indices in the array
const removeSquares = (first, second) => {
  let index1
  let index2
  for (let i = 0; i < squares.length; i++) {
    let square = squares[i]
    if (square.id == first.id) {
      index1 = i
    }
  }
  squares.splice(index1, 1)
  for (let i = 0; i < squares.length; i++) {
    let square = squares[i]
    if (square.id == second.id) {
      index2 = i
    }
  }
  squares.splice(index2, 1)
}

const countdown = () => {
  let counter = document.querySelector("#secs")
  seconds--
  counter.innerHTML = seconds
  if (seconds < 10) {
    counter.style.color = "red"
  }
  if (seconds == 0) {
    alert("Time's up!")
    clearInterval(countdownInterval)
    grid.style.opacity = 0;
  }
}

let countdownInterval = setInterval(countdown, 1000)

const win = () => {
  clearInterval(countdownInterval)
  document.querySelector("h2").innerHTML = "You win!"
  alert("You win!")
}
