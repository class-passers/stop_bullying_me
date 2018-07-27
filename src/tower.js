var towerImage = new Image();
towerImage.src = "img/tower.png";

var towerImage_upper = new Image();
towerImage_upper.src = "img/tower_upper.png";
var towerImage_lower = new Image();
towerImage_lower.src = "img/tower_lower.png";

var TowerObject = function( towerType, pos_x, pos_y ){
    this.objectType = "tower";
    this.unitInfo = TowerInfo[ towerType ];
    // x, y position starts from the top left corner.
    this.x = pos_x;
    this.y = pos_y - this.unitInfo.height;
    this.z = 0;
    this.width = this.unitInfo.width;
    this.height = this.unitInfo.height;

    this.isOnCooldown = false;
    this.isBuilt = false;

    this.curTarget = null;
    this.boundTroop = null;

    this.max_num_sprites = 1;

    this.hp = this.unitInfo.hp;
    this.max_hp = this.unitInfo.hp;

    this.hpBar = new HPBar( this );

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

    this.get_center_x = function()
    {
        return Math.floor( this.x + this.width / 2 );
    };

    this.get_center_y = function()
    {
        return Math.floor( this.y + this.height / 2 );
    };

    this.update = function( deltaTime )
    {
        // attack nearby zombies only if a bound troop has not reached the tower yet.
        if( this.boundTroop === null || this.boundTroop.isOnTower() === false ) {
            this.findTarget();
            this.fire();
        }
        this.hpBar.update( deltaTime );
    };

    this.render = function( context )
    {
        var image = towerImage;
        if( this.boundTroop && this.boundTroop.isOnTower() )
        {
            context.drawImage(towerImage_upper, this.get_source_x(), this.get_source_y(),
                towerImage.width, towerImage.height,
                this.get_x(), this.get_y(), this.width, this.height);

            this.boundTroop.renderTroop(context);

            context.drawImage(towerImage_lower, this.get_source_x(), this.get_source_y(),
                towerImage.width, towerImage.height,
                this.get_x(), this.get_y(), this.width, this.height);
        }
        else {
            context.drawImage(towerImage, this.get_source_x(), this.get_source_y(),
                towerImage.width, towerImage.height,
                this.get_x(), this.get_y(), this.width, this.height);
        }

        this.hpBar.render( context );
    };

    this.findTarget = function() {

        // if  a zombie is already in target, fire him.
        if( this.curTarget && this.curTarget.hp > 0 ){
            if(getDistanceSquare( this, this.curTarget ) < this.unitInfo.attackRange * this.unitInfo.attackRange ) {
                return;
            }
        }

        this.curTarget = null;
        // find any zombie in its attack range
        for( var i = 0; i < gameObjects.length; i++ ) {
            if (gameObjects[i].objectType === "zombie" && gameObjects[i].hp > 0 ) {
                // check if the zombie is in tower's attack range
                if( getDistanceSquare( this, gameObjects[i] ) < this.unitInfo.attackRange * this.unitInfo.attackRange ) {
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
            gameObjects.push( new Bullet( center_x, center_y, this.curTarget, this.unitInfo.attackPower) );
            this.isOnCooldown = true;
            var self = this;
            Time.Wait( function()
            {
                self.isOnCooldown = false;
            }, this.unitInfo.attackSpeed )
            music.fireSound.play();
        }
    };

    this.takeDamage = function( damage )
    {
        this.hp -= damage;
        if( this.hp <= 0 )
        {
            this.boundTroop.boundTower = null;
            this.to_be_removed = true;
            // disconnect the troop and the tower
            console.log("tower destroyed");
        }
    }
};


