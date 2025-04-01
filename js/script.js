const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")


const size = 30

const snake = [{x:270, y:240}]

let direction

const drawSnake = () => {
    ctx.fillStyle = "#ddd"

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

const gameLoop = ()=>{
    ctx.clearRect(0, 0, 600, 600)

    moveSnake();
    drawSnake();
}

setInterval(()=>{
    gameLoop()
}, 300)


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

