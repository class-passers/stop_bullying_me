

// the mechanism to inherit from TroopObject by Typescript
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var healImage = new Image();
healImage.src = "img/heal.png";

var TroopObject = /** @class */ (function () {
    function TroopObject( pos_x, pos_y, unitInfo, tower, is_boss ) {
        this.unitInfo = unitInfo;
        this.x = pos_x;
        this.y = pos_y - this.unitInfo.height;
        this.z = 0;
        this.isBoss = is_boss;

        this.width = this.unitInfo.width;
        this.height = this.unitInfo.height;

        this.hp = this.unitInfo.hp;
        this.max_hp = this.unitInfo.hp;
        this.hpBar = new HPBar(this);

        // for move vector
        this.vx = 0;
        this.vy = 0;

        // target tile index that this troop is pursuing
        this.moveIndex = 1;

        this.isDefender = ( tower !== null );
        this.boundTower = tower;
        if( this.isDefender )
        {
            this.boundTower.boundTroop = this;

            this.movePath = find_grass_path( new Pos( this.x, this.y + this.height - 1 ), new Pos( tower.x, tower.y + tower.height - 1 ) );
            this.isReadyToFight = false;
            this.z = 1;
        }
        else
        {
            this.movePath = worldMap.movePath;
            this.isReadyToFight = true;
            if( this.isBoss ) {
                this.z = 0;
            }
            else
            {
                this.z = getRandom(1, 5);
            }
        }
        this.curTarget = null;
        // attack timing can be various on the troop type, but cool down should works as same behavior
        this.isOnCooldown = false;
        this.isAttacked = false;

        // render sprite index
        this.spriteIndex = 0;
        this.scale = 1.0;
        this.curImage = null;

        // represents current zombie's status and its image object
        this.state = "walk";
        this.prevState = "";
        this.subState = "";
        var self = this;
        this.updateHandler = {
            "idle" : function(t){ self.updateIdleState(t); },
            "moveInTower" : function(t){ self.updateMoveInTowerState(t); },
            "moveOutTower" : function(t){ self.updateMoveOutTowerState(t); },
            "walk" : function(t){ self.updateWalkState(t); },
            "attack" : function(t){ self.updateAttackState(t); },
            "dying" : function(t){ self.updateDyingState(t); }
        };

        // set this flag as true when a zombie died or go out of bound.
        this.to_be_removed = false;
        this.corpse_interval = null;

        TroopObject.prototype.get_x = function () {
            return Math.floor(this.x);
        };

        TroopObject.prototype.get_y = function () {
            // to render at proper position
            return this.y;
        };

        TroopObject.prototype.get_center_x = function()
        {
            return Math.floor( this.x + this.width / 2 );
        };

        TroopObject.prototype.get_center_y = function()
        {
            return Math.floor( this.y + this.height / 2 );
        };

        TroopObject.prototype.get_bounding_rect = function () {
            // get bounding box as its 50% of entire area.
            return new Rectangle(
                Math.floor(this.x + this.width * 0.25),
                Math.floor(this.y + this.height * 0.25),
                Math.floor(this.width * 0.5),
                Math.floor(this.height * 0.5)
            );
        };

        TroopObject.prototype.get_source_x = function () {
            return this.curImage.sprite_width * (Math.floor(this.spriteIndex) % this.curImage.num_sprites_horz);
        };
        TroopObject.prototype.get_source_y = function () {
            return this.curImage.sprite_height * Math.floor(this.spriteIndex / this.curImage.num_sprites_horz);
        };
        TroopObject.prototype.get_sprite_width = function () {
            return this.curImage.sprite_width;
        };
        TroopObject.prototype.get_sprite_height = function () {
            return this.curImage.sprite_height;
        };

        TroopObject.prototype.update = function (deltaTime) {

            if( this.curTarget !== null && this.curTarget.hp <= 0 )
                this.curTarget = null;

            this.updateHandler[this.state]( deltaTime );

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

        TroopObject.prototype.updateIdleState = function (deltaTime) {

            if( this.isDefender )
            {
                if( this.isReadyToFight === false )
                {
                    if( this.boundTower !== null && this.boundTower.hp > 0 && this.boundTower.isBuilt === true )
                    {
                        this.subState = "phase1";
                        this.changeState("moveInTower");
                    }
                }
                else
                {
                    if( this.isOnCooldown === false && this.isReadyToFight === true ) {
                        this.curTarget = this.findClosestTarget();
                        if (this.curTarget !== null) {
                            if ( this.isAttackable( this.curTarget )) {
                                this.changeState('attack');
                            }
                            else if( (this.boundTower === null || this.boundTower.hp <= 0 ) &&
                                this.isInAttackRange3(this.curTarget) ) {
                                console.log("follow the target : " + this.curTarget.unitInfo );
                                this.changeState('walk');
                            }
                        }
                    }
                }
            }
            else
            {
                // in attacker, this state only comes from the attack state.
                if (this.isOnCooldown === false) {
                    this.curTarget = this.findClosestTarget();
                    if (this.isAttackable(this.curTarget)) {
                        this.changeState('attack');
                    }
                    else {
                        this.changeState('walk');
                    }
                }
            }
        };

        TroopObject.prototype.updateMoveInTowerState = function (deltaTime) {
            if( this.isDefender )
            {
                if( this.boundTower === null || this.boundTower.hp <= 0 ) {
                    this.changeState("idle");
                    this.isReadyToFight = true;
                }
                else {
                    // phase1 : getting scale down and moving to the tower as if the troop is entering the tower
                    if (this.subState === "phase1") {
                        this.scale -= 0.01;
                        if (this.scale < 0.5) {
                            this.subState = "phase2";
                            this.scale = 0.0;
                        }
                    }
                    // phase2 : hide image for a while
                    else if (this.subState === "phase2") {
                        var self = this;
                        this.x = Math.floor( this.boundTower.x + ( this.boundTower.width - this.width * 0.8 ) / 2 );
                        Time.Wait(function () {
                            self.subState = "phase3";
                            self.scale = 0.80;
                        }, 0.5);
                    }
                    // phase3 : popping up the upper part on top of the tower, slightly scaled down.
                    else if (this.subState === "phase3") {
                        this.y -= 1;
                        if (this.boundTower.y - this.y > 60) {
                            this.subState = "phase4";
                        }
                    }
                    // the troop is now ready to fight
                    else if (this.subState === "phase4") {
                        // this tells the troop is in attack state even if it is in idle state due to the attack cool-down or
                        // not finding a nearby enemy.
                        this.subState = 'attack';
                        this.changeState("idle");
                        this.isReadyToFight = true;
                    }
                }
            }
            else
            {
                this.changeState("idle");
            }
        };

        TroopObject.prototype.updateMoveOutTowerState = function (deltaTime) {
            if( this.isDefender )
            {
                if (this.scale < 1.0) {
                    this.scale += 0.02;
                    this.x -= 1;
                    this.y += 2;
                }
                else
                {
                    this.isReadyToFight = true;
                    this.changeState("idle");
                }
            }
            else
            {
                this.changeState("idle");
            }
        };

        TroopObject.prototype.updateWalkState = function (deltaTime) {

            if( this.isDefender )
            {
                if( this.isReadyToFight === false ) {
                    if (this.isReachedTower() ) {
                        // just wait
                        this.changeState('idle');
                    }
                    else {
                        this.moveToTower(deltaTime);
                    }
                }
                else {
                    if (this.isAttackable(this.curTarget)) {
                        this.changeState('attack');
                    }
                    else if (this.isInAttackRange3(this.curTarget)) {
                        this.moveToTarget(this.curTarget, deltaTime);
                    }
                    else {
                        this.changeState('idle');
                    }
                }
            }
            else
            {
                // is reached the base-camp ?
                if ( this.moveIndex >= this.movePath.length ) {
                    this.curTarget = this.findClosestTarget();

                    if( this.isAttackable(this.curTarget) ){
                        this.changeState('attack');
                    }
                    else {
                        this.moveToTarget( this.curTarget, deltaTime );
                    }
                }
                else if( this.isBoss ){
                    // boss can attack any tower or troop on his way while walking
                    this.curTarget = this.findClosestTarget();
                    if (this.isAttackable(this.curTarget)) {
                        this.changeState('attack');
                    }
                    else {
                        this.moveAhead(deltaTime);
                    }
                }
                else if( this.unitInfo.name === "healer" )
                {
                    this.curTarget = this.findWoundedAttackerTroop();
                    if( this.curTarget !== null )
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
        };

        TroopObject.prototype.updateAttackState = function (deltaTime) {
            if( this.unitInfo.name === 'healer' ) {
                this.healTarget( this.curTarget );
            }
            else {
                this.attackTarget( this.curTarget );
            }
        };

        TroopObject.prototype.updateDyingState = function (deltaTime) {
            if( this.isDefender )
            {
                if (this.spriteIndex >= this.curImage.max_num_sprites - 1) {
                    if (this.corpse_interval === null) {
                        var self = this;
                        this.corpse_interval = Time.Wait(function () {
                            self.to_be_removed = true;
                        }, 2);
                    }
                }
            }
            else
            {
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

        };

        TroopObject.prototype.render = function (context) {

            if( this.isDefender )
            {
                // when the troop is in the tower,
                // the tower will draw the troop to make it seamless so that do not draw here;
                if( this.isOnTower() === false )
                {
                    this.renderTroop( context );
                }
            }
            else {
                this.renderTroop(context);
            }
        };

        TroopObject.prototype.renderTroop = function( context )
        {
            var flipped = false;
            if( this.curTarget !== null && ( this.state === 'attack' || (this.state === 'idle' && this.prevState === 'attack' ) ) )
            {
                if( this.curTarget.x < this.x ) {
                    flipped = true;
                }
            }
            else {
                if (this.vx < 0) {
                    flipped = true;
                }
            }

            if( debug_draw ) {

                context.beginPath();
                if( this.boundTower ) {
                    context.arc(this.boundTower.get_center_x(), this.boundTower.get_center_y(), this.unitInfo.attackRange, 0, 2 * Math.PI);
                }
                else {
                    context.arc(this.get_center_x(), this.get_center_y(), this.unitInfo.attackRange, 0, 2 * Math.PI);
                }
                if( this.isDefender ) {
                    context.fillStyle = "rgba(0, 128, 0, 0.2)";
                }
                else
                {
                    context.fillStyle = "rgba(128, 0, 0, 0.2)";
                }
                context.fill();

                if( this.curTarget )
                {
                    if( this.isInAttackRange( this.curTarget ) )
                    {
                        context.strokeStyle="#FF0000";
                    }
                    else
                    {
                        context.strokeStyle="#7f7f7f";
                    }
                    context.moveTo( this.get_center_x(), this.get_center_y() );
                    context.lineTo( this.curTarget.get_center_x(), this.curTarget.get_center_y() );
                    context.stroke();
                }
            }

            var scale = this.scale;
            if( this.curImage.hasOwnProperty("scale") )
            {
                scale *= this.curImage.scale;
            }

            if( flipped ) {
                context.save();
                context.scale(-1, 1);
                context.drawImage(this.curImage.image, this.get_source_x(), this.get_source_y(),
                    this.get_sprite_width(), this.get_sprite_height(),
                    -this.get_x() - this.width * scale, this.get_y(), this.width * scale, this.height * scale);
                context.restore();
            }
            else {
                context.drawImage(this.curImage.image, this.get_source_x(), this.get_source_y(),
                    this.get_sprite_width(), this.get_sprite_height(),
                    this.get_x(), this.get_y(), this.width * scale, this.height * scale);
            }

            this.hpBar.render(context);
        };

        TroopObject.prototype.findClosestTarget = function () {
            var closestTarget = null;
            if( this.isDefender ) {

                // find a nearby enemy
                if (this.curTarget !== null && this.curTarget.hp > 0) {
                    if (this.boundTower !== null && this.boundTower.isInAttackRange(this.curTarget))
                        return this.curTarget;
                    // search a larger area when the tower is destroyed so that the troop can chase a zombie
                    else if (this.boundTower === null && this.isInAttackRange3(this.curTarget))
                        return this.curTarget;
                }
                // if the zombie is out of its range, but the closest one, the troop will follow them.
                // but the zombie moves faster than the troop moves, this would require finding a new target
                for (var i = 0; i < gameObjects.length; i++) {
                    if (gameObjects[i].objectType === attacker_type && gameObjects[i].hp > 0) {
                        if (closestTarget === null)
                            closestTarget = gameObjects[i];
                        else {
                            if( this.boundTower !== null ) {
                                if (getDistanceSquare(this.boundTower, gameObjects[i]) < getDistanceSquare(this, closestTarget)) {
                                    closestTarget = gameObjects[i];
                                }
                            }
                            else
                            {
                                if (getDistanceSquare(this, gameObjects[i]) < getDistanceSquare(this, closestTarget)) {
                                    closestTarget = gameObjects[i];
                                }
                            }
                        }
                    }
                }
                return closestTarget;
            }
            else
            {
                var targetType = attacker_type === "human" ? "zombie" : "human";
                if( this.isBoss ) {

                    // find a tower or troop nearby
                    if( this.isAttackable(this.curTarget) ){
                        return this.curTarget;
                    }

                    var closestTarget = null;
                    // find any zombie in its attack range
                    for (var i = 0; i < gameObjects.length; i++) {
                        if ( ( gameObjects[i].objectType === "tower" ||
                                gameObjects[i].objectType === "basecamp" ||
                                // can attack the troop only if he lost his tower
                                ( gameObjects[i].objectType === targetType && gameObjects[i].boundTower === null) ) &&
                            gameObjects[i].hp > 0 ) {
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
                    // normal troop's target is always the base-camp.
                    return base;
                }
            }
        };

        TroopObject.prototype.attackTarget = function( target )
        {
            if (this.isOnCooldown === false) {

                var needsAttack = false;
                if( this.isAttacked === false )
                {
                    if( this.unitInfo.name === "ranged" || this.unitInfo.name === "wizard" ) {
                        // attacks in half motion
                        if (this.spriteIndex >= this.curImage.max_num_sprites * 0.5 ) {
                            needsAttack = true;
                        }
                    }
                    else
                    {
                        // attacks in 2/3 motion
                        if (this.spriteIndex >= this.curImage.max_num_sprites * 0.66 ) {
                            needsAttack = true;
                        }
                    }
                }

                // calculates damage in the very last frame of the attack animation.
                if (needsAttack) {
                    var damage = this.unitInfo.attackPower;
                    if (this.boundTower) {
                        damage += this.boundTower.unitInfo.attackPower;
                    }

                    if( target !== null ) {
                        if (this.unitInfo.name === "ranged") {
                            gameObjects.push(new RangedBullet(this.get_center_x(), this.get_center_y(), target, damage));
                        }
                        else if (this.unitInfo.name === "wizard") {
                            gameObjects.push(new Fireball(this.get_center_x(), this.get_center_y(), target, damage, this.unitInfo.damageRange));
                        }
                        else {
                            //if (this.isBoss)
                            //    console.log(this.unitInfo.name + " attack " + target.unitInfo.name + " dmg = " + damage + " hp = " + (target.hp - damage) + "(" + target.hp + ") t: " + Time.totalSec);

                            target.takeDamage(damage);
                        }
                    }

                    this.isAttacked = true;
                }

                if( this.spriteIndex >= this.curImage.max_num_sprites - 1 ) {
                    this.isOnCooldown = true;
                    this.isAttacked = false;
                    var self = this;
                    // to have attack interval
                    Time.Wait(
                        function () {
                            self.isOnCooldown = false;
                        },
                        this.unitInfo.attackSpeed
                    );

                    this.changeState('idle');
                }
            }
            else
            {
                console.log("ERROR : Can't get into the attack state while cooldown is true = " + this.unitInfo.name );
                this.changeState('idle');
            }

        };

        TroopObject.prototype.takeDamage = function( damage )
        {
            //if( this.objectType === "human" )
            //    console.log( this.unitInfo.name + " took damage " + damage + " hp = " + (this.hp - damage) + "("+this.hp+") t: " + Time.totalSec );
            this.hp -= damage;
        };

        TroopObject.prototype.heal = function( healPower )
        {
            this.hp = Math.min( this.max_hp, this.hp + healPower );
            var center = new Pos( this.get_center_x(), this.get_center_y() );
            gameObjects.push( new Effect( center, healImage, 25, 5, 5, 1 ) );
        };

        TroopObject.prototype.healTarget = function( target )
        {
            if( this.isOnCooldown === false ) {
                if (this.spriteIndex >= this.curImage.max_num_sprites - 1) {
                    //console.log( this.unitInfo.name  + " healed " + target.objectType + "[" + target.unitInfo.name + "]" );
                    if( target && target.hp > 0 )
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
                    this.changeState('idle');
                }
            }
            else
            {
                console.log("ERROR : Can't get into the attack state while cooldown is true = " + this.unitInfo.name );
                this.changeState('idle');
            }
        };

        TroopObject.prototype.findWoundedAttackerTroop = function()
        {
            var closestWoundedTroop = null;
            // find any zombie in its heal(attack) range
            for (var i = 0; i < gameObjects.length; i++) {
                if( gameObjects[i].objectType === attacker_type && gameObjects[i].hp > 0 ) {
                    if (gameObjects[i].hp < gameObjects[i].max_hp) {
                        // if we want to increase the difficulty,
                        // we can find a troop which lost the most hp ( max_hp - hp ).
                        var distSq = getDistanceSquare(this, gameObjects[i]);
                        // attack range means a searchable range for the heal
                        if (distSq <= this.unitInfo.attackRange * this.unitInfo.attackRange) {
                            if (closestWoundedTroop === null)
                                closestWoundedTroop = gameObjects[i];
                            // just find a closest target. should he find the most wounded troop?
                            else if (distSq < getDistanceSquare(this, closestWoundedTroop))
                                closestWoundedTroop = gameObjects[i];
                        }
                    }
                }
            }
            return closestWoundedTroop;
        };

        TroopObject.prototype.isOnTower = function()
        {
            return ( this.boundTower !== null && this.boundTower.hp > 0 && this.isReadyToFight );
        };

        TroopObject.prototype.isReachedTower = function()
        {
            if( this.boundTower !== null && this.boundTower.objectType === "tower" )
            {
                return this.moveIndex >= this.movePath.length;
            }
            return false;
        };

        TroopObject.prototype.get_next_position = function()
        {
            if( this.movePath !== null )
            {
                if( this.moveIndex < 0 ) {
                    console.log("went out of index : " + this.moveIndex);
                    this.moveIndex = 0;
                }
                else if( this.moveIndex >= this.movePath.length ) {
                    console.log("went out of index :" + this.moveIndex + "[ " + this.movePath.length + " ]");
                    this.moveIndex = this.movePath.length - 1;
                }

                var nextLocation = this.movePath[this.moveIndex];
                return new Pos( ( nextLocation.x * worldMap.tileWidth ), ( ( nextLocation.y + 1 ) * worldMap.tileHeight ) );
            }
            return new Pos( this.x, this.y + this.height );
        };

        TroopObject.prototype.moveAhead = function (deltaTime) {
            var nextPos = this.get_next_position();
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
                //console.log("something weired on move path:");
                //console.log("current = " + this.x + "( " + this.width/2 + " ), " + this.y + " ( " + this.height + " ) ->  next = " + nextPos.x + ", " + nextPos.y );
                this.moveIndex += 1;
            }
        };

        TroopObject.prototype.moveToTower = function (deltaTime) {

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

        TroopObject.prototype.moveToTarget = function( target, deltaTime )
        {
            if( target !== null ) {
                var nextPos = new Pos(target.x + target.width, target.y + target.height);
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
            }
        };

        TroopObject.prototype.isAttackable = function( target ) {
            if( target !== null && target.hp > 0 ) {
                return this.isInAttackRange(target);
            }
            return false;
        };

        TroopObject.prototype.isInAttackRange = function (target) {
            if (target !== null ) {
                if( this.boundTower !== null ) {
                    return (getDistanceSquare(this.boundTower, target) <= this.unitInfo.attackRange * this.unitInfo.attackRange);
                }
                else {
                    return (getDistanceSquare(this, target) <= this.unitInfo.attackRange * this.unitInfo.attackRange);
                }
            }
            return false;
        };

        // returns true if the target is within the three times of its the attack range.
        TroopObject.prototype.isInAttackRange3 = function (target) {
            if (target !== null ) {
                // sqrt(9) === 3
                return ( getDistanceSquare(this, target) <= this.unitInfo.attackRange * this.unitInfo.attackRange * 9 );
            }
            return false;
        };

        TroopObject.prototype.towerDestroyed = function()
        {
            this.boundTower = null;
            this.changeState("moveOutTower");
            //console.log("bound tower destroyed :" + this.isOnTower() );
        };

        TroopObject.prototype.isRangedUnit = function()
        {
            return this.unitInfo.attackRange > 200;
        };
    }
    return TroopObject;
}());

