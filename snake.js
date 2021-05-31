function Snake() {
    this.direction = { x: 1, y: 0 };
    this.color = { r: 12, g: 160, b: 3 };
    this.speed = 1;
    this.length = grid_size;

    // this.body[0] is the head
    this.body = [{ x: 0, y: 0 }];

    // holds the coordinates of dead parts of the snake
    this.dead_body = []

    this.move = function () {

        for (var i = this.body.length - 1; i > 0; --i) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        this.body[0].x += this.direction.x * this.speed * grid_size;
        this.body[0].y += this.direction.y * this.speed * grid_size;

        this.body[0].x = ((this.body[0].x % canvas_size) + canvas_size) % (canvas_size);
        this.body[0].y = ((this.body[0].y % canvas_size) + canvas_size) % (canvas_size);
    }

    this.show = function () {
        noStroke();
        fill(this.color.r, this.color.g, this.color.b);
        for (var i = 0; i < this.body.length; ++i) {
            square(this.body[i].x, this.body[i].y, this.length);
        }
    }

    this.movedOn = function (pos) {
        return dist(this.body[0].x, this.body[0].y, pos.x, pos.y) < grid_size;
    }

    this.grow = function (value) {
        for (var i = 0; i < value; ++i) {
            var new_segment = {
                x: this.body[this.body.length - 1].x,
                y: this.body[this.body.length - 1].y
            };
            this.body.push(new_segment);
        }
    }

    this.showDeadBody = function() {
        noStroke();
        for(var i = 0; i < this.dead_body.length; ++i){
            if(this.dead_body[i].death_time >= 255){
                this.dead_body.splice(i, 1);
                continue;
            }
            fill(this.color.r, this.color.g, this.color.b, 255 - this.dead_body[i].death_time);
            square(this.dead_body[i].x, this.dead_body[i].y, this.length);
            this.dead_body[i].death_time += 40;
        }
    }
}