
var ZombieObject = function( zombieType, pos_x, pos_y, width, height ){
    this.objectType = "zombie";
    this.x = pos_x;
    this.y = pos_y - height;
    this.z = 0;
    this.width = width;
    this.height = height;


    // target tile index that zombie is pursuing
    this.moveIndex = 1;
    // render sprite index
    this.spriteIndex = 0;

    // represents current zombie's status and its image object
    this.unitInfo= new Unit( zombieType );
    this.curImage = allZombieImages[this.unitInfo.name].idle;
    this.state = "idle";

    // set this flag as true when a zombie died or go out of bound.
    this.to_be_removed = false;
    this.corpse_interval = null;

    this.get_x = function()
    {
        return Math.floor(this.x);
    };

    this.get_y = function()
    {
        // to render at proper position
        return this.y;
    };

    this.get_bounding_rect = function()
    {
        // get bounding box as its 50% of entire area.
        return new Rectangle( Math.floor( this.x + this.width * 0.25 ),
            Math.floor( this.y + this.height * 0.25 ),
            Math.floor( this.width * 0.5 ),
            Math.floor( this.height * 0.5 ) );
    };

    this.get_source_x = function()
    {
        return this.curImage.sprite_width * ( Math.floor(this.spriteIndex) % this.curImage.num_sprites_horz );
    };
    this.get_source_y = function()
    {
        return this.curImage.sprite_height * Math.floor( this.spriteIndex / this.curImage.num_sprites_horz );
    };

    this.get_sprite_width = function()
    {
        return this.curImage.sprite_width;
    };
    this.get_sprite_height = function()
    {
        return this.curImage.sprite_height;
    };

    this.update = function( deltaTime ) {
        if (this.state === 'idle') {
            this.change_state('walk');
        }
        else if (this.state === 'walk') {
            this.move_ahead( deltaTime );

            if (this.unitInfo.hp <= 0 ) {
                this.change_state('dying');
            }
            else if (is_reached_at_destination(this.moveIndex)) {
                this.change_state('attack');
            }
        }
        else if (this.state === 'dying') {
            if (this.spriteIndex >= this.curImage.max_num_sprites - 1) {
                if( this.corpse_interval === null )
                {
                    var self = this;
                    this.corpse_interval = setTimeout( function(){
                        self.to_be_removed = true;
                    }, 2000 );
					base.decreaseEnemies();
                }
            }
        }
        else if (this.state === 'attack') {

            this.unitInfo.hp -= 1;
			if(this.spriteIndex === Math.floor(this.curImage.max_num_sprites/2))
				base.decreaseHP(1);

            if (this.unitInfo.hp <= 0) {
                this.change_state('dying');
            }
        }

        // change to next sprite image every 4 frames not to make zombie moving so fast.
        this.spriteIndex += 0.25;
        if( this.spriteIndex >= this.curImage.max_num_sprites ) {
            if( this.curImage.repeat === true ) {
                this.spriteIndex = 0;
            }
            else {
                this.spriteIndex = this.curImage.max_num_sprites - 1;
            }
        }
    };

    this.render = function( context )
    {
        context.drawImage( this.curImage.image, this.get_source_x(), this.get_source_y(),
            this.get_sprite_width(), this.get_sprite_height(),
            this.get_x(), this.get_y(), this.width, this.height );
    };

    this.change_state = function( newState )
    {
        // this.state.leave();
        //console.log( JSON.stringify(this.unitInfo) + " state changed : " + newState );
        this.state = newState;
        this.curImage = allZombieImages[this.unitInfo.name][newState];
        // this.state.enter();
    };

    this.move_ahead = function( deltaTime )
    {
        var nextPos = get_next_position( this.moveIndex );
        // add a quarter size of the zombie to the position to look better on the road.
        var distX = nextPos.x - ( this.x + this.width / 2 );
        var distY = nextPos.y - ( this.y + this.height );

        var hypotenuseSquared = distX * distX + distY * distY;
        if( hypotenuseSquared > 0 ) {

            var unitVector = Math.sqrt(hypotenuseSquared);
            var vx = distX / unitVector;
            var vy = distY / unitVector;

            this.x += vx * this.unitInfo.speed * deltaTime;
            this.y += vy * this.unitInfo.speed * deltaTime;

            // check if the zombie is already closed to the target position
            if (hypotenuseSquared <= this.unitInfo.speed * this.unitInfo.speed) {
                this.moveIndex += 1;
            }
        }
        else
        {
            console.log("current = " + this.x + "+" + this.width + ", " + this.y + "+" + this.height);
            console.log("next = " + nextPos.x + ", " + nextPos.y);
            console.log("out of distance");
        }
    };
};