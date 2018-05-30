function Bullet(x,y,target,damage) {
    this.objectType = "bullet";
    this.x = x;
    this.y = y;
    this.target = target;
    this.damage = damage;
}

Bullet.r = 10;
Bullet.speed = 20;

Bullet.move = function() {
    var xDist = this.target.x+64-this.x;
    var yDist = this.target.y+64-this.y;
    var dist = Math.sqrt(xDist*xDist+yDist*yDist);
    this.x = this.x+this.speed*xDist/dist;
    this.y = this.y+this.speed*yDist/dist;
};

Bullet.draw = function() {
    context.beginPath();
    context.arc(this.x,this.y,this.r,0,2*Math.PI);
    context.fillStyle='black';
    context.fill();
};

Bullet.prototype.checkCollision = function() {
    if(this.x < this.target.x + 64 &&
        this.x + this.r > this.target.x &&
        this.y < this.target.y + 64 &&
        this.y + this.r > this.target.y) {
        this.target.hp -= this.damage;
        return true;
    }
    return false;
};
