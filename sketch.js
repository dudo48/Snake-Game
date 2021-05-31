const canvas_size = 400


var squares_count = 32
var grid_size = canvas_size  / squares_count;
var snake = new Snake();
var food = new Food();

function setup() {
    createCanvas(canvas_size, canvas_size);
    frameRate(12);
    updateScore();
    food.spawn();
}

function draw() {
    background(50);
    food.show();
    snake.show();
    snake.showDeadBody();
    snake.move();

    // check if ate food
    if(snake.movedOn(food.pos)) {
        food.spawn();
        snake.grow(food.growth_value);
        updateScore();
    }

    // check if died
    for(var i = 2; i < snake.body.length; ++i){
        if(snake.movedOn(snake.body[i])){
            for(var j = i + 1; j < snake.body.length; ++j){
                snake.dead_body.push({x: snake.body[j].x, y: snake.body[j].y, death_time: 0})
            }
            snake.body = snake.body.slice(0, i);
            updateScore();
            break;
        }
    }
    displayGrid();
}

function keyPressed(){
    // left arrow
    if(keyCode === 37){
        if(snake.direction.x === 0){
            snake.direction = {x: -1, y: 0};
        }
    }
    // up arrow
    if(keyCode === 38){
        if(snake.direction.y === 0){
            snake.direction = {x: 0, y: -1};
        }
    }
    // right arrow
    if(keyCode === 39){
        if(snake.direction.x === 0){
            snake.direction = {x: 1, y: 0};
        }
    }
    // down arrow
    if(keyCode === 40){
        if(snake.direction.y === 0){
            snake.direction = {x: 0, y: 1};
        }
    }
}

function displayGrid(){
    stroke(0, 0, 0, 25);
    strokeWeight(2);
    for(var i = 0; i < height; i += grid_size){
        line(0, i, width, i);
    }

    for(var i = 0; i < width; i += grid_size){
        line(i, 0, i, height);
    }
}

function updateScore(){
    document.getElementsByClassName("score")[0].innerHTML = snake.body.length;
}