
var ZombieObject = function( zombieType, is_boss, pos_x, pos_y ) {
    this.objectType = "zombie";
    this.isBoss = is_boss;

    if (is_boss) {
        this.unitInfo = new Boss(zombieType);
        this.z = -1;
    }
    else {
        this.unitInfo = new Unit(zombieType);
        this.z = 0;
    }
    this.x = pos_x;
    this.y = pos_y - this.unitInfo.height;

    this.width = this.unitInfo.width;
    this.height = this.unitInfo.height;

    this.hp = this.unitInfo.hp;
    this.max_hp = this.unitInfo.hp;
    this.hpBar = new HPBar( this );

    // for move vector
    this.vx = 0;
    this.vy = 0;

    this.curTarget = null;
    this.isOnCooldown = false;

    // target tile index that zombie is pursuing
    this.moveIndex = 1;
    // render sprite index
    this.spriteIndex = 0;

    // represents current zombie's status and its image object
    this.state = "walk";
    this.curImage = allZombieImages[this.unitInfo.name][this.state];

    // set this flag as true when a zombie died or go out of bound.
    this.to_be_removed = false;
    this.corpse_interval = null;

    //console.log("creates " + zombieType + " zombie troop = " + (this.unitInfo.name) );

    this.get_x = function () {
        return Math.floor(this.x);
    };

    this.get_y = function () {
        // to render at proper position
        return this.y;
    };

    this.get_bounding_rect = function () {
        // get bounding box as its 50% of entire area.
        return new Rectangle(Math.floor(this.x + this.width * 0.25),
            Math.floor(this.y + this.height * 0.25),
            Math.floor(this.width * 0.5),
            Math.floor(this.height * 0.5));
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
            var isReached = is_reached_at_destination(this.moveIndex);
            if( this.isBoss ) {
                if (this.curTarget === null || this.curTarget.hp <= 0) {
                    this.curTarget = this.findClosestTarget();
                }

                if (this.curTarget !== null && this.isInAttackRange(this.curTarget)) {
                    this.changeState('attack');
                }
                else if( isReached === false ) {
                    this.moveAhead(deltaTime);
                }
            }
            else if( isReached === false ){
                this.moveAhead(deltaTime);
            }

            if (isReached) {
                this.curTarget = base;
                if( this.isInAttackRange(this.curTarget) === false )
                {
                    this.moveTo( this.curTarget, deltaTime );
                }
                else {
                    this.changeState('attack');
                }
            }
        }
        else if (this.state === 'dying') {
            if (this.spriteIndex >= this.curImage.max_num_sprites - 1) {
                if (this.corpse_interval === null) {
                    var self = this;
                    this.corpse_interval = setTimeout(function () {
                        self.to_be_removed = true;
                    }, 2000);
                    base.decreaseEnemies(this.unitInfo.cost);
					createEarnIndicator(this.unitInfo.cost, this.x, this.y);
                }
            }
        }
        else if (this.state === 'attack') {
            if( this.isInAttackRange(this.curTarget) === false )
            {
                console.log("target is out of range");
            }

            if (this.isBoss  &&
                ( this.curTarget === null || this.curTarget.hp <= 0 || this.isInAttackRange(this.curTarget) === false )) {
                this.changeState('walk');
                this.curTarget = null;
            }
            else {
                if (this.isOnCooldown === false ) {
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
            }
        }

        if (this.hp <= 0) {
            this.changeState('dying');
        }

        // change to next sprite image every 4 frames not to make zombie moving so fast.
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
            this.curImage = allZombieImages[this.unitInfo.name][newState];
            this.spriteIndex = 0;
        }
        // this.state.enter();
    };

    this.takeDamage = function( damage )
    {
        this.hp -= damage;
    };

    this.findClosestTarget = function () {

        // find a tower or troop nearby
        if (this.curTarget !== null && (this.curTarget.objectType === "tower" || this.curTarget.objectType === "troop" || this.curTarget.objectType === "basecamp" )
            && this.isInAttackRange(this.curTarget)) {
            return this.curTarget;
        }

        var closestTarget = null;
        // find any zombie in its attack range
        for (var i = 0; i < gameObjects.length; i++) {
            if ((gameObjects[i].objectType === "tower" || gameObjects[i].objectType === "troop" || gameObjects[i].objectType === "basecamp") && this.isInAttackRange(gameObjects[i])) {
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

    this.moveAhead = function (deltaTime) {
        var nextPos = get_world_next_position(this.moveIndex);
        // add a quarter size of the zombie to the position to look better on the road.
        var distX = nextPos.x - (this.x + this.width / 2);
        var distY = nextPos.y - (this.y + this.height);

        var distSquared = distX * distX + distY * distY;
        if (distSquared > 0) {

            var unitVector = Math.sqrt(distSquared);
            this.vx = distX / unitVector;
            this.vy = distY / unitVector;

            this.x += this.vx * this.unitInfo.moveSpeed * deltaTime;
            this.y += this.vy * this.unitInfo.moveSpeed * deltaTime;

            // check if the zombie is already closed to the target position
            if (distSquared <= this.unitInfo.moveSpeed * this.unitInfo.moveSpeed) {
                this.moveIndex += 1;
            }
        }
        else {
            console.log("current = " + this.x + "+" + this.width + ", " + this.y + "+" + this.height);
            console.log("next = " + nextPos.x + ", " + nextPos.y);
            console.log("out of distance");
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