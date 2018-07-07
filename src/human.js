var HumanObject = function( humanType, tower, pos_x, pos_y ) {
    this.objectType = "human";

    this.unitInfo = new Human(humanType);
    this.x = pos_x;
    this.y = pos_y - this.unitInfo.height;
    this.z = 0;

    this.width = this.unitInfo.width;
    this.height = this.unitInfo.height;

    this.hp = this.unitInfo.hp;
    this.max_hp = this.unitInfo.hp;
    this.hpBar = new HPBar(this);

    // for move vector
    this.vx = 0;
    this.vy = 0;

    this.curTarget = tower;
    this.isOnCooldown = false;
    this.movePath = find_grass_path( new Pos( this.x, this.y + this.height ), new Pos( tower.x, tower.y + tower.height ) );

    // target tile index that this troop is pursuing
    this.moveIndex = 1;
    // render sprite index
    this.spriteIndex = 0;

    // represents current zombie's status and its image object
    this.state = "walk";
    this.curImage = allHumanImages[this.unitInfo.name][this.state];

    // set this flag as true when a zombie died or go out of bound.
    this.to_be_removed = false;
    this.corpse_interval = null;

    console.log("creates human troop at " + this.x + ", " + this.y + "+" + this.height + " from " + pos_x + ", " + pos_y + " to " + tower.x + ", " + tower.y );
    console.log("human path = " + JSON.stringify(this.movePath));
    if( this.movePath !== null )
    {
        for( var i = 0; i < this.movePath.length; i++ )
        {
            var nextLocation = this.movePath[i];
            var nextPos = new Pos( ( nextLocation.x * worldMap.tileWidth ), ( ( nextLocation.y + 1 ) * worldMap.tileHeight ) );
            console.log( JSON.stringify(nextPos) );
        }
    }

    this.get_x = function () {
        return Math.floor(this.x);
    };

    this.get_y = function () {
        // to render at proper position
        return this.y;
    };

    this.get_bounding_rect = function () {
        // get bounding box as its 50% of entire area.
        return new Rectangle(
            Math.floor(this.x + this.width * 0.25),
            Math.floor(this.y + this.height * 0.25),
            Math.floor(this.width * 0.5),
            Math.floor(this.height * 0.5)
        );
    };

    this.get_source_x = function () {
        return this.curImage.sprite_width * (Math.floor(this.spriteIndex) % this.curImage.num_sprites_horz);
    };
    this.get_source_y = function () {
        return this.curImage.sprite_height * Math.floor(this.spriteIndex / this.curImage.num_sprites_horz);
    };
    this.get_sprite_width = function () {
        return this.curImage.sprite_width;
    };
    this.get_sprite_height = function () {
        return this.curImage.sprite_height;
    };

    this.update = function (deltaTime) {

        if (this.state === 'idle') {
            // do not change the state while the zombie is in cool down since it was in attack state previously.
            if (this.isOnCooldown === false) {
                this.changeState('walk');
            }
        }
        else if (this.state === 'walk') {

            if( this.isInTower() ) {
                this.changeState('attack');
            }
            else {
                this.moveToTower(deltaTime);
            }
        }
        else if (this.state === 'attack') {
            /*
                        if( this.isInAttackRange(this.curTarget) === false )
                        {
                            console.log("target is out of range");
                        }

                        if (this.isOnCooldown === false && this. ) {
                            if (this.spriteIndex >= this.curImage.max_num_sprites - 1 ) {
                                this.curTarget.takeDamage(this.unitInfo.attackPower);
                                if( this.curTarget.hp <= 0 )
                                {
                                    this.changeState('walk');
                                }
                                else
                                {
                                    this.changeState('idle');
                                }
                                this.isOnCooldown = true;

                                var self = this;
                                // to have attack interval
                                setTimeout(
                                    function () {
                                        self.isOnCooldown = false;
                                        self.changeState('attack');
                                    },
                                    this.unitInfo.attackSpeed
                                );
                            }
                        }
                        */
        }
        else if (this.state === 'dying') {
            if (this.spriteIndex >= this.curImage.max_num_sprites - 1) {
                if (this.corpse_interval === null) {
                    var self = this;
                    this.corpse_interval = setTimeout(function () {
                        self.to_be_removed = true;
                    }, 2000);
                }
            }
        }

        if (this.hp <= 0) {
            this.changeState('dying');
        }

        // change to next sprite image every 4 frames not to make this moves so fast.
        this.spriteIndex += 12 * deltaTime;
        if (this.spriteIndex >= this.curImage.max_num_sprites) {
            if (this.curImage.repeat === true) {
                this.spriteIndex = 0;
            }
            else {
                this.spriteIndex = this.curImage.max_num_sprites - 1;
            }
        }

        this.hpBar.update(deltaTime);
    };

    this.render = function (context) {
        var image = this.curImage.image_right;
        if (this.vx < 0) {
            image = this.curImage.image_left;
        }
        context.drawImage(image, this.get_source_x(), this.get_source_y(),
            this.get_sprite_width(), this.get_sprite_height(),
            this.get_x(), this.get_y(), this.width, this.height);
        this.hpBar.render(context);
    };

    this.changeState = function (newState) {

        // this.state.leave();
        if( this.state !== newState ) {
            //console.log( this.unitInfo.name + " : " + this.state + " changed to " + newState );
            this.state = newState;
            this.curImage = allHumanImages[this.unitInfo.name][newState];
            this.spriteIndex = 0;
        }
        // this.state.enter();
    };

    this.takeDamage = function( damage )
    {
        this.hp -= damage;
    };

    this.findClosestTarget = function () {

        // find a nearby zombie
        if (this.curTarget !== null && this.curTarget.objectType === "zombie" && this.isInAttackRange(this.curTarget) ) {
            return this.curTarget;
        }

        var closestTarget = null;
        // find any zombie in its attack range
        for (var i = 0; i < gameObjects.length; i++) {
            if( gameObjects[i].objectType === "zombie" && this.isInAttackRange(gameObjects[i]) ){
                if (closestTarget === null)
                    closestTarget = gameObjects[i];
                else {
                    if (getDistanceSquare(this, gameObjects[i]) < getDistanceSquare(this, closestTarget)) {
                        closestTarget = gameObjects[i];
                    }
                }
            }
        }
        return closestTarget;
    };

    this.isInTower = function()
    {
        if( this.curTarget )
        {
            return this.moveIndex >= worldMap.movePath.length;
        }
        return false;
    };

    this.get_next_position = function()
    {
        if( this.movePath !== null )
        {
            if( this.moveIndex < this.movePath.length ) {
                var nextLocation = this.movePath[this.moveIndex];
                var nextPos = new Pos( ( nextLocation.x * worldMap.tileWidth ), ( ( nextLocation.y + 1 ) * worldMap.tileHeight ) );
                //console.log("target pos = " + JSON.stringify(nextPos) );
                // return bottom left position of the grid
                return nextPos;
            }
            else
            {
                console.log("went out of index");
                var nextLocation = this.movePath[this.movePath.length - 1];
                var nextPos = new Pos( ( nextLocation.x * worldMap.tileWidth ), ( ( nextLocation.y + 1 ) * worldMap.tileHeight ) );
                return nextPos;
            }
        }
        return new Pos( this.x, this.y + this.height );
    };


    this.moveToTower = function (deltaTime) {

        var nextPos = this.get_next_position();
        // add a quarter size of the zombie to the position to look better on the road.
        var distX = nextPos.x - this.x;
        var distY = nextPos.y - ( this.y + this.height );

        var distSquared = distX * distX + distY * distY;
        if (distSquared > 0) {

            var unitVector = Math.sqrt(distSquared);
            this.vx = distX / unitVector;
            this.vy = distY / unitVector;

            var speed = this.unitInfo.moveSpeed * deltaTime;

            this.x += this.vx * speed;
            this.y += this.vy * speed;

            // check if the zombie is already closed to the target position
            if (distSquared <= speed * speed * 4 ) {
                this.moveIndex += 1;
            }
        }
        else {
            //console.log("current = " + this.x + "+" + this.width + ", " + this.y + "+" + this.height);
            //console.log("next = " + nextPos.x + ", " + nextPos.y + " index = " + this.moveIndex );
        }
    };

    this.moveTo = function( target, deltaTime )
    {
        var nextPos = new Pos( target.x + target.width, target.y + target.height );
        // add a quarter size of the zombie to the position to look better on the road.
        var distX = nextPos.x - (this.x + this.width / 2);
        var distY = nextPos.y - (this.y + this.height);

        var distSquared = distX * distX + distY * distY;
        if (distSquared > this.unitInfo.moveSpeed * this.unitInfo.moveSpeed) {

            var unitVector = Math.sqrt(distSquared);
            this.vx = distX / unitVector;
            this.vy = distY / unitVector;

            this.x += this.vx * this.unitInfo.moveSpeed * deltaTime;
            this.y += this.vy * this.unitInfo.moveSpeed * deltaTime;
        }
    };

    this.isInAttackRange = function (target) {
        if (target !== null && target.hp > 0) {
            return (getDistanceSquare(this, target) <= this.unitInfo.attackRange * this.unitInfo.attackRange);
        }
        return false;
    };
};