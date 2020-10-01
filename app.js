document.addEventListener('DOMContentLoaded', () => {
  const SQUARES = document.querySelectorAll('.grid div')
  const SCORE_DISPLAY = document.querySelector('span')
  const START_BTN = document.querySelector('.start')

  const WIDTH = 10
  let currentIndex = 0 // so first div in the grid
  let appleIndex = 0 // so first div in the grid
  let currentSnake = [2,1,0] // so the div in the grid being 2 (or the head), 0 being the end (tail, with all 1's being the body from now on)
  let direction = 1
  let score = 0
  let speed = 0.9
  let intervalTime = 0
  let interval = 0

  // to start, and restart the game
  function startGame() {
    currentSnake.forEach(index => SQUARES[index].classList.remove('snake'))
    SQUARES[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    SCORE_DISPLAY.innerText = score
    intervalTime = 300
    currentSnake = [2,1,0]
    currentIndex = 0
    currentSnake.forEach(index => SQUARES[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
  }

  // function that deals with ALL the outcomes of the snake
  function moveOutcomes() {

    
    // deals with snake hitting border and snake hitting itself
    if (
      (currentSnake[0] + WIDTH >= (WIDTH * WIDTH) && direction === WIDTH) || // if snake hits bottom
      (currentSnake[0] % WIDTH === WIDTH -1 && direction === 1) || // if snake hits right wall
      (currentSnake[0] % WIDTH === 0 && direction === -1) || // if snake hits left wall
      (currentSnake[0] - WIDTH < 0 && direction === -WIDTH) || // if snake hits top
      SQUARES[currentSnake[0] + direction].classList.contains('snake') // if snake goes into itself
    ) {
      return clearInterval(interval) // this will clear the interval if any of the above happen
    }

    const TAIL = currentSnake.pop() // removes last ite of the array and shows it
    SQUARES[TAIL].classList.remove('snake') // removes class of snake from the tail
    currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head of the array
  
    // deals with snake getting apple
    if (SQUARES[currentSnake[0]].classList.contains('apple')) {
      SQUARES[currentSnake[0]].classList.remove('apple')
      SQUARES[TAIL].classList.add('snake')
      currentSnake.push(TAIL)
      randomApple()
      score++
      SCORE_DISPLAY.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcomes, intervalTime)
    }
    SQUARES[currentSnake[0]].classList.add('snake')
  }

  // generate new apple once apple is eaten
  function randomApple() {
    do{
      appleIndex = Math.floor(Math.random() * SQUARES.length)
    } while (SQUARES[appleIndex].classList.contains('snake')) // making sure apples
    SQUARES[appleIndex].classList.add('apple')
  }

  // assign functions to keycodes
  function control(e) {
    SQUARES[currentIndex].classList.remove('snake') // removing the class of snake from ALL the squares

    if (e.keyCode === 39) {
      direction = 1 // if the right arrow is pressed, the snake will go one to the right
    } else if (e.keyCode === 38) {
      direction = -WIDTH // if the up arrow is pressed, the snake will go back ten divs, appearing to go up
    } else if (e.keyCode === 37) {
      direction = -1 // if the left arrow is pressed, the snake will go left one div
    } else if (e.keyCode === 40) {
      direction = +WIDTH // if the down arrow is pressed, the snake will go forward ten divs, appearing to go down
    }
  }

  document.addEventListener('keyup', control)
  START_BTN.addEventListener('click', startGame)
})