var healImage = new Image();
healImage.src = "img/heal.png";

var ZombieObject = function( zombieType, is_boss, pos_x, pos_y ) {
    this.objectType = "zombie";
    this.isBoss = is_boss;

    if (is_boss) {
        this.unitInfo = BossZombieInfo[zombieType];
        this.z = -1;
    }
    else {
        this.unitInfo = ZombieInfo[zombieType];
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
    // usually this variable holds the previous state.
    this.subState = "";
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
            if( this.subState === 'attack' )
            {
                if( this.curTarget === null || this.curTarget.hp <= 0 )
                    this.changeState('walk');
                else {
                    if (this.isOnCooldown === false) {
                        this.curTarget = this.findClosestTarget();
                        if (this.curTarget !== null && this.isInAttackRange(this.curTarget)) {
                            this.changeState('attack');
                        }
                        else {
                            this.changeState('walk');
                        }
                    }
                }
            }
        }
        else if (this.state === 'walk') {

            if (is_reached_at_destination(this.moveIndex)) {
                this.curTarget = this.findClosestTarget();

                if( this.isInAttackRange(this.curTarget) ){
                    this.changeState('attack');
                }
                else {
                    this.moveTo( this.curTarget, deltaTime );
                }
            }
            else if( this.isBoss ){
                // boss can attack any tower or troop on his way
                this.curTarget = this.findClosestTarget();
                if (this.curTarget !== null && this.curTarget.hp > 0 && this.isInAttackRange(this.curTarget)) {
                    this.changeState('attack');
                }
                else {
                    this.moveAhead(deltaTime);
                }
            }
            else if( this.unitInfo.name === "healer" )
            {
                this.curTarget = this.findWoundedAlliedTroop();
                if( this.curTarget !== null && this.curTarget.hp > 0 )
                {
                    // change to attack state, but it actually heals the target.
                    this.changeState('attack');
                }
                else
                {
                    this.moveAhead(deltaTime);
                }
            }
            else {
                this.moveAhead(deltaTime);
            }
        }
        else if (this.state === 'attack') {

            if( this.curTarget !== null ) {
                if( this.unitInfo.name === 'healer' )
                {
                    if( this.curTarget.hp > 0 )
                    {
                        this.healTarget( this.curTarget );
                    }
                }
                else {
                    if ( this.curTarget && this.curTarget.hp > 0 && this.isInAttackRange(this.curTarget)) {
                        this.attackTarget(this.curTarget);
                        if (this.curTarget.hp <= 0) {
                            this.curTarget = null;
                        }
                    }
                    else {
                        this.changeState('walk');
                    }
                }
            }
            else
            {
                this.changeState('walk');
            }
        }
        else if (this.state === 'dying') {
            if (this.spriteIndex >= this.curImage.max_num_sprites - 1) {
                if (this.corpse_interval === null) {
                    var self = this;
                    this.corpse_interval = Time.Wait(function () {
                        self.to_be_removed = true;
                    }, 2);
                    base.decreaseEnemies(this.unitInfo.reward);
					createMoneyIndicator("earn", this.unitInfo.reward, this.x, this.y);
                }
            }
        }

        if (this.hp <= 0) {
            this.changeState('dying');
        }

        // change to next sprite image every 4 frames not to make zombie moving so fast.
        this.spriteIndex += 12 * deltaTime;
        if (this.spriteIndex >= this.curImage.max_num_sprites) {
            if( this.curImage.repeat ) {
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
        var flipped = false;
        if( this.curTarget !== null && (this.state === 'attack' || (this.state === 'idle' && this.subState === 'attack' ) ) )
        {
            if( this.curTarget.x < this.x ) {
                //image = this.curImage.image_left;
                flipped = true;
            }
        }
        else {
            if (this.vx < 0) {
                //image = this.curImage.image_left;
                flipped = true;
            }
        }
        if( flipped ) {
            context.save();
            context.scale(-1, 1);
            context.drawImage(image, this.get_source_x(), this.get_source_y(),
                this.get_sprite_width(), this.get_sprite_height(),
                -this.get_x() - this.width, this.get_y(), this.width, this.height);
            context.restore();
        }
        else {
            context.drawImage(image, this.get_source_x(), this.get_source_y(),
                this.get_sprite_width(), this.get_sprite_height(),
                this.get_x(), this.get_y(), this.width, this.height);
        }

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

    this.heal = function( healPower )
    {
        this.hp = Math.min( this.max_hp, this.hp + healPower );
        var center = new Pos( this.x + Math.floor( this.width / 2 ), this.y + Math.floor( this.height / 2 ) );
        gameObjects.push( new Effect( center, healImage, 25, 5, 5, 1 ) );
    };

    this.findClosestTarget = function () {

        if( this.isBoss ) {

            // find a tower or troop nearby
            if (this.curTarget !== null && this.curTarget.hp > 0 && this.isInAttackRange(this.curTarget)) {
                return this.curTarget;
            }

            var closestTarget = null;
            // find any zombie in its attack range
            for (var i = 0; i < gameObjects.length; i++) {
                if (gameObjects[i].hp <= 0)
                    continue;

                if (gameObjects[i].objectType === "tower" || gameObjects[i].objectType === "basecamp" ||
                    // can attack human only if his tower is already destroyed
                    (gameObjects[i].objectType === "human" && gameObjects[i].boundTower === null)) {
                    if (closestTarget === null)
                        closestTarget = gameObjects[i];
                    else if (getDistanceSquare(this, gameObjects[i]) < getDistanceSquare(this, closestTarget)) {
                        closestTarget = gameObjects[i];
                    }
                }
            }
            return closestTarget;
        }
        else
        {
            // normal zombie's target is always the basecamp
            return base;
        }
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

            var speed = this.unitInfo.moveSpeed * deltaTime;
            this.x += this.vx * speed;
            this.y += this.vy * speed;

            // check if the zombie is already closed to the target position
            if (distSquared <= speed * speed ) {
                this.moveIndex += 1;
            }
        }
        else {
            console.log("current = " + this.x + "+" + this.width + ", " + this.y + "+" + this.height);
            console.log("next = " + nextPos.x + ", " + nextPos.y);
            console.log("wrong distance = " + distX + " " + distY );
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
        if (target !== null ) {
            return (getDistanceSquare(this, target) <= this.unitInfo.attackRange * this.unitInfo.attackRange);
        }
        return false;
    };

    this.attackTarget = function( target )
    {
        if( target !== null && this.isOnCooldown === false ) {
            if (this.spriteIndex >= this.curImage.max_num_sprites - 1) {
                target.takeDamage(this.unitInfo.attackPower);
                this.isOnCooldown = true;
                var self = this;
                // to have attack interval
                Time.Wait(
                    function () {
                        self.isOnCooldown = false;
                    },
                    this.unitInfo.attackSpeed
                );
                this.subState = 'attack';
                this.changeState('idle');
            }
        }
    };

    this.findWoundedAlliedTroop = function()
    {
        var closestWoundedTroop = null;
        // find any zombie in its heal(attack) range
        for (var i = 0; i < gameObjects.length; i++) {
            if (gameObjects[i].hp <= 0 || gameObjects[i].objectType !== "zombie" )
                continue;

            var zombie = gameObjects[i];
            if ( zombie.hp < zombie.max_hp ) {
                var distSq = getDistanceSquare(this, zombie );
                // attack range means a searchable range for the heal
                if( distSq <= this.unitInfo.attackRange * this.unitInfo.attackRange ) {
                    if (closestWoundedTroop === null)
                        closestWoundedTroop = zombie;
                    // just find a closest target. should he find the most wounded troop?
                    else if( distSq < getDistanceSquare(this, closestWoundedTroop ) )
                        closestWoundedTroop = zombie;
                }
            }
        }
        return closestWoundedTroop;
    };

    this.healTarget = function( target )
    {
        if( target !== null && this.isOnCooldown === false ) {
            if (this.spriteIndex >= this.curImage.max_num_sprites - 1) {
                //console.log( this.unitInfo.name  + " healed " + target.objectType + "[" + target.unitInfo.name + "]" );
                target.heal(this.unitInfo.attackPower);
                this.isOnCooldown = true;
                var self = this;
                // to have attack interval
                Time.Wait(
                    function () {
                        self.isOnCooldown = false;
                    },
                    this.unitInfo.attackSpeed
                );
                this.subState = 'attack';
                this.changeState('walk');
            }
        }
    }

};