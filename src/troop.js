// the mechanism to inherit from TroopObject
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

var TroopObject = /** @class */ (function () {
    function TroopObject( pos_x, pos_y, unitInfo, tower, is_boss ) {
        this.unitInfo = unitInfo;
        this.x = pos_x;
        this.y = pos_y - this.unitInfo.height;
        this.z = 0;
        this.is_boss = is_boss;

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

        this.is_defender = ( tower !== null );
        if( this.is_defender )
        {
            this.boundTower = tower;
            this.boundTower.boundTroop = this;

            this.movePath = find_grass_path( new Pos( this.x, this.y + this.height - 1 ), new Pos( tower.x, tower.y + tower.height - 1 ) );
            this.isReadyToFight = false;
            this.z = 1;
        }
        else
        {
            this.movePath = worldMap.movePath;
            this.isReadyToFight = true;
            if( this.is_boss ) {
                this.z = 0;
            }
            else
            {
                this.z = getRandom(1, 5);
            }
        }
        this.curTarget = null;
        this.isOnCooldown = false;

        // render sprite index
        this.spriteIndex = 0;
        this.scale = 1.0;
        this.curImage = null;

        // represents current zombie's status and its image object
        this.state = "walk";
        this.subState = "";

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

            if( this.is_defender )
                this.updateDefender( deltaTime );
            else
                this.updateAttacker( deltaTime );


            this.hpBar.update(deltaTime);

        };


        TroopObject.prototype.updateDefender = function( deltaTime )
        {
            if (this.state === 'idle') {
                // if the troop was in attack state, it should be idle until they find a near enemy
                if( this.subState === 'moveInTower' )
                {
                    if( this.boundTower !== null && this.boundTower.hp > 0 && this.boundTower.isBuilt === true )
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
                            if (this.isReadyToFight === true && this.isInAttackRange(this.curTarget)) {
                                this.changeState('attack');
                            }
                            else if (this.isOnTower() === false && this.isInAttackRange2(this.curTarget)) {
                                this.changeState('walk');
                            }
                        }
                    }
                }
                else if( this.subState === 'walk' )
                {
                    this.curTarget = this.findClosestTarget();
                    if( this.curTarget !== null && this.curTarget.hp > 0 ) {
                        if (this.isInAttackRange(this.curTarget)) {
                            this.changeState('attack');
                        }
                        else if (this.isInAttackRange2(this.curTarget)) {
                            this.changeState('walk');
                        }
                    }
                }
            }
            else if (this.state === 'walk') {
                if( this.boundTower !== null && this.boundTower.hp > 0 ) {
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
                else if( this.curTarget !== null && this.isInAttackRange( this.curTarget ) )
                {
                    this.changeState('attack');
                }
                else if( this.curTarget !== null && this.isInAttackRange2( this.curTarget ) )
                {
                    this.moveToTarget( this.curTarget, deltaTime );
                }
                else
                {
                    this.subState = 'walk';
                    this.changeState('idle');
                }
            }
            else if( this.state === 'moveInTower' )
            {
                if( this.boundTower === null || this.boundTower.hp <= 0 ) {
                    this.subState = 'attack';
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
            else if (this.state === 'attack') {
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
                        else if(this.isInAttackRange2(this.curTarget)) {
                            this.changeState('walk');
                        }
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
                        this.corpse_interval = Time.Wait(function () {
                            self.to_be_removed = true;
                        }, 2);
                    }
                }
            }

            if (this.hp <= 0) {
                this.changeState('dying');
            }

            // change to next sprite image every 4 frames not to make this moves so fast.
            this.spriteIndex += 12 * deltaTime;
            console.log("this.curImage = " + JSON.stringify(this.curImage) );
            if (this.spriteIndex >= this.curImage.max_num_sprites) {
                if (this.curImage.repeat === true) {
                    this.spriteIndex = 0;
                }
                else {
                    this.spriteIndex = this.curImage.max_num_sprites - 1;
                }
            }
        };

        TroopObject.prototype.updateAttacker = function( deltaTime )
        {
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

                if ( this.moveIndex >= this.movePath.length ) {
                    this.curTarget = this.findClosestTarget();

                    if( this.isInAttackRange(this.curTarget) ){
                        this.changeState('attack');
                    }
                    else {
                        this.moveToTarget( this.curTarget, deltaTime );
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
        };

        TroopObject.prototype.render = function (context) {

            if( this.is_defender )
                this.renderDefender(context);
            else
                this.renderAttacker(context);

        };

        TroopObject.prototype.renderDefender = function( context )
        {
            // when the troop is in the tower,
            // the tower will draw the troop so that do not draw here;
            if( this.isOnTower() )
            {
                return;
            }
            this.renderTroop( context );
        };

        TroopObject.prototype.renderAttacker = function( context )
        {
            this.renderTroop( context );
        };

        TroopObject.prototype.renderTroop = function( context )
        {
            var flipped = false;
            if( this.curTarget !== null && (this.state === 'attack' || (this.state === 'idle' && this.subState === 'attack' ) ) )
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
                context.arc( this.get_center_x(), this.get_center_y(), this.unitInfo.attackRange, 0, 2 * Math.PI);
                context.fillStyle = "rgba(0, 128, 0, 0.2)";
                context.fill();

                if( this.curTarget )
                {
                    var target_x = Math.floor( this.curTarget.x + this.curTarget.width / 2 );
                    var target_y = Math.floor( this.curTarget.x + this.curTarget.width / 2 );
                    context.moveTo( this.get_center_x(), this.get_center_y() );
                    context.lineTo( this.curTarget.get_center_x(), this.curTarget.get_center_y() );
                    context.stroke();
                }
            }

            if( flipped ) {
                context.save();
                context.scale(-1, 1);
                context.drawImage(this.curImage.image, this.get_source_x(), this.get_source_y(),
                    this.get_sprite_width(), this.get_sprite_height(),
                    -this.get_x() - this.width * this.scale, this.get_y(), this.width * this.scale, this.height * this.scale);
                context.restore();
            }
            else {
                context.drawImage(this.curImage.image, this.get_source_x(), this.get_source_y(),
                    this.get_sprite_width(), this.get_sprite_height(),
                    this.get_x(), this.get_y(), this.width * this.scale, this.height * this.scale);
            }

            this.hpBar.render(context);
        };

        TroopObject.prototype.takeDamage = function( damage )
        {
            this.hp -= damage;
        };

        TroopObject.prototype.heal = function( healPower )
        {
            this.hp = Math.min( this.max_hp, this.hp + healPower );
            var center = new Pos( this.x + Math.floor( this.width / 2 ), this.y + Math.floor( this.height / 2 ) );
            gameObjects.push( new Effect( center, healImage, 25, 5, 5, 1 ) );
        };

        TroopObject.prototype.healTarget = function( target )
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
        };



        TroopObject.prototype.isOnTower = function()
        {
            return this.boundTower && this.boundTower.hp > 0 && this.isReadyToFight;
        };

        TroopObject.prototype.isReachedTower = function()
        {
            if( this.boundTower && this.boundTower.objectType === "tower" )
            {
                return this.moveIndex >= this.movePath.length;
            }
            return false;
        };

        TroopObject.prototype.get_next_position = function()
        {
            if( this.movePath !== null )
            {
                var index = this.moveIndex;
                if( index < 0 ) {
                    console.log("went out of index : " + index);
                    index = 0;
                }
                else if( index >= this.movePath.length ) {
                    console.log("went out of index :" + index + "[ " + this.movePath.length + " ]");
                    index = this.movePath.length - 1;
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
                console.log("something weired on move path:");
                console.log("current = " + this.x + "( " + this.width/2 + " ), " + this.y + " ( " + this.height + " ) ->  next = " + nextPos.x + ", " + nextPos.y );
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

        TroopObject.prototype.isInAttackRange = function (target) {
            if (target !== null ) {
                return (getDistanceSquare(this, target) <= this.unitInfo.attackRange * this.unitInfo.attackRange);
            }
            return false;
        };

        // returns true if the target is within the two times of its the attack range.
        TroopObject.prototype.isInAttackRange2 = function (target) {
            if (target !== null ) {
                return ( getDistanceSquare(this, target) <= this.unitInfo.attackRange * this.unitInfo.attackRange * 4 );
            }
            return false;
        };

        TroopObject.prototype.isRangedUnit = function()
        {
            return this.unitInfo.attackRange > 200;
        };
    }
    return TroopObject;
}());

