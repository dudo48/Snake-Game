function Food() {
    this.pos = { x: 0, y: 0 };
    this.color = { r: 200, g: 10, b: 30 };
    this.growth_value = 1;

    this.spawn = function () {
        this.pos = {
            x: int(random(squares_count)) * grid_size,
            y: int(random(squares_count)) * grid_size
        }
    }

    this.show = function () {
        noStroke();
        fill(this.color.r, this.color.g, this.color.b);
        square(this.pos.x, this.pos.y, grid_size);
    }
}