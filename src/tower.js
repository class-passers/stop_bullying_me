var towerImage = new Image();
towerImage.src = "img/tower.png";

var TowerObject = function( pos_x, pos_y, width, height ){
    this.objectType = "tower";
    // x, y position starts from the top left corner.
    this.x = pos_x;
    this.y = pos_y;
    this.width = width;
    this.height = height;

    this.range = 200;
    this.rateOfFire = 20;
    this.damage = 50;
    this.curTarget = null;

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
        findTarget();
        fire();
    };
    this.render = function( context )
    {
        context.drawImage( this.image, this.get_source_x(), this.get_source_y(),
            towerImage.width, towerImage.height,
            this.get_x(), this.get_y(), this.width, this.height );
    };

    findTarget = function() {

        // if  a zombie is already in target, fire him.
        if( this.curTarget && this.curTarget.hp > 0 )
            return;

        // find any zombie in its attack range
        for( var i = 0; i < gameObjects.length; i++ ) {
            if (gameObjects[i].objectType === "zombie" && gameObjects[i].unit.hp > 0 ) {
                // check if the zombie is in tower's attack range


                return null;
            }
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

    findVector = function() {
        if (!this.target) return false; //if there is no target, dont bother calculating vector
        var xDist = this.target.x-this.x;
        var yDist = this.target.y-this.y;
        var dist = Math.sqrt(xDist*xDist+yDist*yDist);
        this.xFire = this.x+20*xDist/dist; //where turret ends and bullets start
        this.yFire = this.y+20*yDist/dist;
    };

    fire = function() {
        this.rateOfFire--;
        if(this.target && this.rateOfFire <=0) {
            bullets.push(new Bullet(this.xFire,this.yFire,this.target,this.hurt));
        };
    }
};


