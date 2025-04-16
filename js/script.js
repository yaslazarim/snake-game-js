const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")


const audio = new  Audio("../assets/audio.mp3")

const size = 30

let snake = [{x:270, y:240}]

const incrementScore = () =>{
    score.innerText = parseInt(score.innerText) + 10
}

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

const food = {
    x:randomPosition(),
    y:randomPosition(),
    color: "white"
}

let direction

const drawFood = () => {
    const {x, y, color} = food

    ctx.shadowColor = color
    ctx.shadowBlur = 6
    ctx.fillStyle = food.color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

const drawSnake = () => {
    ctx.fillStyle = "white"

    snake.forEach((position, index) => {

        if(index === snake.length -1){
            ctx.fillStyle = "darkmagenta"
        }
        ctx.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () => {
    if (!direction) return

    const head = snake[snake.length -1]

    if (direction === "right"){
        snake.push({x: head.x + size, y: head.y})
    }

    if (direction === "left"){
        snake.push({x: head.x - size, y: head.y})
    }

    if (direction === "down"){
        snake.push({x: head.x, y: head.y + size})
    }

    if (direction === "up"){
        snake.push({x: head.x, y: head.y - size})
    }

    snake.shift()
}

const checkEat = () => {
    const head = snake[snake.length -1]
    if (head.x == food.x && head.y == food.y){
        incrementScore()
        snake.push(head)
        audio.play()

        gameInterval = Math.floor(gameInterval - (gameInterval * 0.05))
        clearInterval(intervalReference)
        intervalReference = setInterval(()=>{
            gameLoop()
        
        }, gameInterval)
        console.log(`Speed snake is: ${gameInterval}`)

        let x = randomPosition()
        let y = randomPosition()
        
        while(snake.find((position) => position.x == x && position.y == y)){
            x = randomPosition()
            y = randomPosition()
        }

        food.x = x
        food.y = y
    }
}

const checkCollision = () => {
    const head = snake[snake.length -1]
    const canvasLimit = canvas.width - size
    const neckIndex = snake.length - 2

    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit

    const selfCollision = snake.find((position, index)=>{
        return index < neckIndex && position.x == head.x && position.y == head.y
    })

    if (wallCollision || selfCollision) {
        gameOver()
    }
}

const gameOver = () => {
    direction = undefined

    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(2px)"
    clearInterval(intervalReference)
    gameInterval=300
    intervalReference = setInterval(()=>{
        gameLoop()
    
    }, gameInterval)
}

const gameLoop = ()=>{
    ctx.clearRect(0, 0, 600, 600)
    drawFood()
    moveSnake()
    drawSnake()
    checkEat()
    checkCollision()
}

let gameInterval = 300

let intervalReference = setInterval(()=>{
    gameLoop()

}, gameInterval)


document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight" && direction != "left"){
        direction = "right"
    }
    if (key == "ArrowLeft" && direction != "right"){
        direction = "left"
    }
    if (key == "ArrowDown" && direction != "up"){
        direction = "down"
    }
    if (key == "ArrowUp" && direction != "down"){
        direction = "up"
    }
})

buttonPlay.addEventListener("click", () =>{
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"
     
    snake = [{x:270, y:240}]
})

