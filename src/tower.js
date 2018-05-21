var towerImage = new Image();
towerImage.src = "img/tower.png";

var TowerObject = function( pos_x, pos_y, width, height ){
    this.x = pos_x;
    this.y = pos_y;
    this.width = width;
    this.height = height;

    this.range = 200;
    this.rateOfFire = 20;
    this.damage = 50;

    this.max_num_sprites = 1;
    this.image = towerImage;

    // set this flag as true when a tower destroyed.
    this.to_be_removed = false;

    this.get_x = function()
    {
        return this.x;
    };

    this.get_y = function()
    {
        return this.y - this.height;
    };

    this.get_source_x = function()
    {
        return 0;
    };
    this.get_source_y = function()
    {
        return 0;
    };
    this.update = function()
    {
    };
    this.render = function( context )
    {
        context.drawImage( this.image, this.get_source_x(), this.get_source_y(),
            towerImage.width, towerImage.height,
            this.get_x(), this.get_y(), this.width, this.height );
    };
};

objects.findTarget = function() {
    //if no enemies, no target
    if(zombies.length === 0) {
        this.target = null;
        return;
    }
    //if target dead, remove target reference
    if(this.target && this.target.hp <= 0) {
        this.target = null;
    }
    //find first enemy withing range and select that as tower's target
    for (var i = 0, j = zombies.length; i < j; i ++) {
        var dist = (zombies[i].x-this.x)*(zombies[i].x-this.x+64)+(zombies[i].y-this.y)*(zombies[i].y-this.y+64);
        if (dist < (this.range*this.range)) {
            this.target = zombies[i];
            return; //only need a single target
        }
    }
};

objects.findVector = function() {
    if (!this.target) return false; //if there is no target, dont bother calculating vector
    var xDist = this.target.x-this.x;
    var yDist = this.target.y-this.y;
    var dist = Math.sqrt(xDist*xDist+yDist*yDist);
    this.xFire = this.x+20*xDist/dist; //where turret ends and bullets start
    this.yFire = this.y+20*yDist/dist;
};

objects.fire = function() {
    this.rateOfFire--;
    if(this.target && this.rateOfFire <=0) {
        bullets.push(new Bullet(this.xFire,this.yFire,this.target,this.hurt));
    };
};