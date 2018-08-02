
var HumanObject = /** @class */ (function (_super) {
    __extends(HumanObject, _super);
    function HumanObject(humanType, pos_x, pos_y, tower, is_boss ) {

        if( is_boss ) {
            var unitInfo = HumanBossInfo[humanType];
        }
        else {
            var unitInfo = HumanTroopInfo[humanType];
        }

        var _this = _super.call(this, pos_x, pos_y, unitInfo, tower, is_boss ) || this;
        _this.objectType = "human";
        _this.curImage = allHumanImages[_this.unitInfo.name][_this.state];

        if( _this.isDefender === false ) {
            var nextPos = this.get_next_position();
            if (nextPos.x - pos_x > 0) {
                // move left by its width if its next tile is on his right side
                _this.x -= _this.unitInfo.width;
            }
        }

        return _this;
    }

    HumanObject.prototype.changeState = function (newState) {

        // this.state.leave();
        if( this.state !== newState ) {

            this.prevState = this.state;
            this.state = newState;

            if( this.isBoss )
                console.log( this.unitInfo.name + " : " + this.prevState + " changed to " + this.state );

            this.curImage = allHumanImages[this.unitInfo.name][this.state];

            this.spriteIndex = 0;
        }
        // this.state.enter();
    };



    return HumanObject;
}(TroopObject));
