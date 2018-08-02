var healImage = new Image();
healImage.src = "img/heal.png";

var ZombieObject = /** @class */ (function (_super) {
    __extends(ZombieObject, _super);
    function ZombieObject(zombieType, pos_x, pos_y, tower, is_boss ) {

        var unitInfo = null;
        if( is_boss ) {
            unitInfo = ZombieBossInfo[zombieType];
        }
        else {
            unitInfo = ZombieInfo[zombieType];
        }

        var _this = _super.call(this, pos_x, pos_y, unitInfo, tower, is_boss ) || this;
        _this.objectType = "zombie";
        _this.curImage = allZombieImages[_this.unitInfo.name][_this.state];

        if( _this.isDefender === false ) {
            var nextPos = this.get_next_position();
            if (nextPos.x - pos_x > 0) {
                // move left by its width if its next tile is on his right side
                _this.x -= _this.unitInfo.width;
            }
        }

        return _this;
    }

    ZombieObject.prototype.changeState = function (newState) {
        // this.state.leave();

        if( this.state !== newState ) {

            this.prevState = this.state;
            this.state = newState;

            //if( this.isBoss )
                //console.log( this.unitInfo.name + " : " + this.prevState + " changed to " + this.state );

            this.curImage = allZombieImages[this.unitInfo.name][this.state];

            this.spriteIndex = 0;
        }
        // this.state.enter();
    };

    return ZombieObject;
}(TroopObject));