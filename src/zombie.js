var healImage = new Image();
healImage.src = "img/heal.png";

var ZombieObject = /** @class */ (function (_super) {
    __extends(ZombieObject, _super);
    function ZombieObject(param1, param2, param3) {
        var _this = _super.call(this, param1, param2) || this;
        _this.param2 = param2;
        _this.param3 = param3;
        _this._depart = param3;
        return _this;
    }
    //...
    return ZombieObject;
}(TroopObject));

var ZombieObject = /** @class */ (function (_super) {
    __extends(ZombieObject, _super);
    function ZombieObject(zombieType, is_boss, pos_x, pos_y ) {

        if( is_boss ) {
            var unitInfo = BossZombieInfo[zombieType];
        }
        else {
            var unitInfo = ZombieInfo[zombieType];
        }

        var _this = _super.call(this, pos_x, pos_y, unitInfo, null, is_boss ) || this;
        _this.objectType = "zombie";
        _this.curImage = allZombieImages[this.unitInfo.name][this.state];
        return _this;
    }

    ZombieObject.prototype.changeState = function (newState) {
        // this.state.leave();

        if( this.state !== newState ) {
            //console.log( this.unitInfo.name + " : " + this.state + " changed to " + newState );
            this.state = newState;
            this.curImage = allZombieImages[this.unitInfo.name][newState];
            this.spriteIndex = 0;
        }
        // this.state.enter();
    };

    ZombieObject.prototype.findClosestTarget = function () {

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


    ZombieObject.prototype.attackTarget = function( target )
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

    ZombieObject.prototype.findWoundedAlliedTroop = function()
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

    return ZombieObject;
}(TroopObject));