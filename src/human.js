
var HumanObject = /** @class */ (function (_super) {
    __extends(HumanObject, _super);
    function HumanObject(humanType, tower, pos_x, pos_y ) {
        var _this = _super.call(this, pos_x, pos_y, HumanTroopInfo[humanType], tower ) || this;
        _this.objectType = "human";
        _this.curImage = allHumanImages[this.unitInfo.name][this.state];
        return _this;
    }

    HumanObject.prototype.changeState = function (newState) {

        // this.state.leave();
        if( this.state !== newState ) {
            //console.log( this.unitInfo.name + " : " + this.state + " changed to " + newState );
            this.state = newState;
            this.curImage = allHumanImages[this.unitInfo.name][newState];
            this.spriteIndex = 0;
        }
        // this.state.enter();
    };

    HumanObject.prototype.findClosestTarget = function () {

        // find a nearby zombie
        if (this.curTarget !== null && this.curTarget.hp > 0  ) {
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

    HumanObject.prototype.attackTarget = function( target )
    {
        if( target !== null ) {
            if (this.isOnCooldown === false) {
                // calculates damage in the very last frame of the attack animation.
                if (this.spriteIndex >= this.curImage.max_num_sprites - 1) {
                    var damage = this.unitInfo.attackPower;
                    if (this.boundTower) {
                        damage += this.boundTower.unitInfo.attackPower;
                    }

                    if( this.unitInfo.name === "ranged") {
                        var center_x = this.x + Math.floor(this.width / 2);
                        var center_y = this.y + Math.floor(this.height / 2);
                        gameObjects.push(new Kunai(center_x, center_y, target, damage));
                    }
                    else if( this.unitInfo.name === "wizard" )
                    {
                        var center_x = this.x + Math.floor(this.width / 2);
                        var center_y = this.y + Math.floor(this.height / 2);
                        gameObjects.push(new Fireball(center_x, center_y, target, damage, this.unitInfo.damageRange ));
                    }
                    else {
                        target.takeDamage(damage);
                    }

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
        }
    };
    return HumanObject;
}(TroopObject));
