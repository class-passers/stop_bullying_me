var towerImage = new Image();
towerImage.src = "img/tower.png";

var TowerObject = function( towerType, pos_x, pos_y, width, height ){
    this.objectType = "tower";
    // x, y position starts from the top left corner.
    this.x = pos_x;
    this.y = pos_y - height;
    this.z = 0;
    this.width = width;
    this.height = height;

    this.towerInfo = new Tower( towerType );
    this.isOnCooldown = false;

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
        return this.y ;
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
        this.findTarget();
        this.fire();
    };

    this.render = function( context )
    {
/*
        context.beginPath();
        var center_x = this.x + Math.floor(this.width / 2);
        var center_y = this.y + Math.floor(this.height/ 2);
        context.arc( center_x, center_y, this.towerInfo.attackRange, 0, 2 * Math.PI );
        context.fillStyle = 'blue';
        context.fill();
*/
        context.drawImage( this.image, this.get_source_x(), this.get_source_y(),
            towerImage.width, towerImage.height,
            this.get_x(), this.get_y(), this.width, this.height );
    };

    this.findTarget = function() {


        // if  a zombie is already in target, fire him.
        if( this.curTarget && this.curTarget.unitInfo.hp > 0 ){
            if(getDistanceSquare( this, this.curTarget ) < this.towerInfo.attackRange * this.towerInfo.attackRange ) {
                return;
            }
            else
            {
                console.log("a zombie goes out of range");
            }
        }



        this.curTarget = null;
        // find any zombie in its attack range
        for( var i = 0; i < gameObjects.length; i++ ) {
            if (gameObjects[i].objectType === "zombie" && gameObjects[i].unitInfo.hp > 0 ) {
                // check if the zombie is in tower's attack range
                if( getDistanceSquare( this, gameObjects[i] ) < this.towerInfo.attackRange * this.towerInfo.attackRange ) {
                    this.curTarget = gameObjects[i];
                    return;
                }
            }
        }
    };

    this.fire = function() {
        if( this.isOnCooldown === false && this.curTarget !== null )
        {
            var center_x = this.x + Math.floor(this.width / 2);
            var center_y = this.y + Math.floor(this.height/ 5);
            gameObjects.push( new Bullet( center_x, center_y, this.curTarget, this.towerInfo.attackPower) );
            this.isOnCooldown = true;
            var self = this;
            setTimeout( function()
            {
                self.isOnCooldown = false;
            }, this.towerInfo.attackSpeed )
        }
    };
};


