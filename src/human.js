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

    this.boundTower = tower;
    this.curTarget = null;
    this.isOnCooldown = false;
    this.movePath = find_grass_path( new Pos( this.x, this.y + this.height - 1 ), new Pos( tower.x, tower.y + tower.height - 1 ) );

    // target tile index that this troop is pursuing
    this.moveIndex = 1;
    // render sprite index
    this.spriteIndex = 0;
    this.scale = 1.0;

    // represents current zombie's status and its image object
    this.state = "walk";
    this.subState = "";
    this.curImage = allHumanImages[this.unitInfo.name][this.state];

    // set this flag as true when a zombie died or go out of bound.
    this.to_be_removed = false;
    this.corpse_interval = null;

    //console.log("creates human troop at " + this.x + ", " + this.y + "+" + this.height + " from " + pos_x + ", " + pos_y + " to " + tower.x + ", " + tower.y );
    //console.log("human path = " + JSON.stringify(this.movePath));
    if( this.movePath !== null )
    {
        for( var i = 0; i < this.movePath.length; i++ )
        {
            var nextLocation = this.movePath[i];
            var nextPos = new Pos( ( nextLocation.x * worldMap.tileWidth ), ( ( nextLocation.y + 1 ) * worldMap.tileHeight ) );
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
            // do not change the state while the zombie is in cool down since he was in attack state previously.
            //if (this.isOnCooldown === false) {
            //    this.changeState('walk');
            //}

            // if the troop was in attack state, it should be idle until they find a near enemy
            if( this.subState === 'moveInTower' )
            {
                if( this.boundTower !== null && this.boundTower.isBuilt === true )
                {
                    this.subState = "phase1";
                    this.changeState("moveInTower");
                }
            }
            else if( this.subState === 'attack' )
            {
                if( this.isOnCooldown === false ) {
                    this.curTarget = this.findClosestTarget();
                    if (this.curTarget !== null) {
                        if (this.boundTower !== null && this.isInAttackRange(this.curTarget)) {
                            this.changeState('attack');
                        }
                        else if (this.boundTower === null && this.isInAttackRange2(this.curTarget)) {
                            this.changeState('attack');
                        }
                    }
                }
            }
        }
        else if (this.state === 'walk') {
            if( this.boundTower !== null ) {
                // troop doesn't walk except constructing phase if there is a bound tower.
                if (this.isReachedTower() ) {
                    // just wait
                    this.subState = 'moveInTower';
                    this.changeState('idle');
                }
                else {
                    this.moveToTower(deltaTime);
                }
            }
            else if( this.curTarget !== null && this.isInAttackRange2( this.curTarget ) )
            {
                this.moveToTarget( this.curTarget, deltaTime );
            }
        }
        else if( this.state === 'moveInTower' )
        {
            // phase1 : getting scale down and moving to the tower as if the troop is entering the tower
            if( this.subState === "phase1" )
            {
                this.scale -= 0.01;
                if( this.scale < 0.5 ) {
                    this.subState = "phase2";
                    this.scale = 0.0;
                }
            }

            // phase2 : hide image for a while
            else if( this.subState === "phase2" )
            {
                var self = this;
                setTimeout( function() { self.subState = "phase3"; self.scale = 0.80; }, 500 );
            }

            // phase3 : popping up the upper part on top of the tower, slightly scaled down.
            else if( this.subState === "phase3" )
            {
                this.y -= 1;
                if( this.boundTower.y - this.y > 60 )
                {
                    this.subState = "phase4";
                }
            }

            // the troop is now ready to fight
            else if( this.subState === "phase4" )
            {
                this.boundTower.boundTroop = this;
                // this tells the troop is in attack state even if it is in idle state due to the attack cool-down or
                // not finding a nearby enemy.
                this.subState = 'attack';
                this.changeState("attack");
            }
        }
        else if (this.state === 'attack') {
            this.curTarget = this.findClosestTarget();
            if( this.curTarget !== null ) {
                if (this.boundTower !== null) {
                    if (this.isInAttackRange(this.curTarget))
                        this.attackTarget(this.curTarget);
                    else {
                        this.changeState('idle');
                    }
                }
                else {
                    if (this.isInAttackRange(this.curTarget))
                        this.attackTarget(this.curTarget);
                    else if(this.isInAttackRange2(this.curTarget))
                        this.moveToTarget(this.curTarget, deltaTime);
                    else {
                        this.changeState('idle');
                    }
                }
            }
            else
            {
                this.changeState('idle');
            }
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
            this.get_x(), this.get_y(), this.width * this.scale, this.height * this.scale);
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
        if (this.curTarget !== null && this.curTarget.objectType === "zombie" && this.curTarget.hp > 0  ) {
            if( this.boundTower !== null && this.isInAttackRange( this.curTarget ))
                return this.curTarget;
            // search a larger area if the tower is destroyed because the troop can chase a zombie
            else if( this.boundTower === null && this.isInAttackRange2( this.curTarget ))
                return this.curTarget;
        }

        var closestTarget = null;
        // if the zombie is out of its range, but the closest one, the troop will follow them.
        // but the zombie moves faster than the troop moves, this would require finding a new target
        for (var i = 0; i < gameObjects.length; i++) {
            if( gameObjects[i].objectType === "zombie" && gameObjects[i].hp > 0 ){
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

    this.isReachedTower = function()
    {
        if( this.boundTower && this.boundTower.objectType === "tower" )
        {
            return this.moveIndex >= this.movePath.length;
        }
        return false;
    };

    this.get_next_position = function()
    {
        if( this.movePath !== null )
        {
            var nextLocation = null;
            if( this.moveIndex < this.movePath.length ) {
                nextLocation = this.movePath[this.moveIndex];
                return new Pos( ( nextLocation.x * worldMap.tileWidth ), ( ( nextLocation.y + 1 ) * worldMap.tileHeight ) );
            }
            else {
                console.log("went out of index");
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
            if (distSquared <= speed * speed ) {
                this.moveIndex += 1;
            }
        }
        else {
            //console.log("current = " + this.x + "+" + this.width + ", " + this.y + "+" + this.height);
            //console.log("next = " + nextPos.x + ", " + nextPos.y + " index = " + this.moveIndex );
        }
    };

    this.moveToTarget = function( target, deltaTime )
    {
        var nextPos = new Pos( target.x + target.width, target.y + target.height );
        // add a quarter size of the zombie to the position to look better on the road.
        var distX = nextPos.x - (this.x + this.width / 2);
        var distY = nextPos.y - (this.y + this.height);

        var distSquared = distX * distX + distY * distY;
        var speed = this.unitInfo.moveSpeed * deltaTime;
        if (distSquared > speed * speed) {

            var unitVector = Math.sqrt(distSquared);
            this.vx = distX / unitVector;
            this.vy = distY / unitVector;

            this.x += this.vx * speed;
            this.y += this.vy * speed;
        }
    };

    this.isInAttackRange = function (target) {
        if (target !== null ) {
            return (getDistanceSquare(this, target) <= this.unitInfo.attackRange * this.unitInfo.attackRange);
        }
        return false;
    };

    // returns true if the target is within the two times of its the attack range.
    this.isInAttackRange2 = function (target) {
        if (target !== null ) {
            return ( getDistanceSquare(this, target) <= this.unitInfo.attackRange * this.unitInfo.attackRange * 4 );
        }
        return false;
    };

    this.attackTarget = function( target )
    {
        if (this.isOnCooldown === false) {
            // calculates damage in the very last frame of the attack animation.
            if (this.spriteIndex >= this.curImage.max_num_sprites - 1) {
                var damage = this.unitInfo.attackPower;
                if( this.boundTower )
                {
                    damage += this.boundTower.unitInfo.attackPower;
                }
                this.curTarget.takeDamage(damage);

                this.isOnCooldown = true;
                var self = this;
                // to have attack interval
                setTimeout(
                    function () {
                        self.isOnCooldown = false;
                    },
                    this.unitInfo.attackSpeed
                );

                this.changeState('idle');
            }
        }
    }
};