
var zombieImages = {
    idle : {
        image_src : "img/zombie_walk.png",
        max_num_sprites : 10,
        num_sprites_horz : 4,
        num_sprites_vert : 3,
        sprite_width : 0,
        sprite_height : 0,
        repeat : true,
        image : null
    },
    walk : {
        image_src : "img/zombie_walk.png",
        max_num_sprites : 10,
        num_sprites_horz : 4,
        num_sprites_vert : 3,
        sprite_width : 0,
        sprite_height : 0,
        repeat : true,
        image : null
    },
    dying : {
        image_src : "img/zombie_dying.png",
        max_num_sprites : 12,
        num_sprites_horz : 2,
        num_sprites_vert : 6,
        sprite_width : 0,
        sprite_height : 0,
        repeat : false,
        image : null
    },
    attack : {
        image_src : "img/zombie_attack.png",
        max_num_sprites : 8,
        num_sprites_horz : 4,
        num_sprites_vert : 2,
        sprite_width : 0,
        sprite_height : 0,
        repeat : true,
        image : new Image()
    }
};

for( var status in zombieImages )
{
    zombieImages[status].image = new Image();
    zombieImages[status].image.src = zombieImages[status].image_src;
    zombieImages[status].image.onload = (function( it ){
        return function() {
            zombieImages[it].sprite_width = Math.floor(zombieImages[it].image.width / zombieImages[it].num_sprites_horz);
            zombieImages[it].sprite_height = Math.floor(zombieImages[it].image.height / zombieImages[it].num_sprites_vert);
            //console.log( it + " = " + JSON.stringify( zombieImages[it] ) );
        }
    }( status ));
}

var ZombieObject = function( pos_x, pos_y, width, height ){
    this.x = pos_x;
    this.y = pos_y;
    this.width = width;
    this.height = height;

    // unit info
    this.hp = 100;

    // move speed is affected both horizontally and vertically. ( pixel per second )
    this.moveSpeed = 50;
    // target tile index that zombie is pursuing
    this.moveIndex = 0;
    // render sprite index
    this.spriteIndex = 0;

    // represents current zombie's status and its image object
    this.curImage = zombieImages.walk;
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
        return Math.floor(this.y - this.height);
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

            if (this.hp <= 0 ) {
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
                }
            }
        }
        else if (this.state === 'attack') {
            this.hp -= 1;

            if (this.hp <= 0) {
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
        this.state = newState;
        this.curImage = zombieImages[newState];
        // this.state.enter();
    };

    this.move_ahead = function( deltaTime )
    {
        var nextPos = get_next_position( this.moveIndex );
        // add a quarter size of the zombie to the position to look better on the road.
        var distX = nextPos.x - ( this.x + this.width / 4 );
        var distY = nextPos.y - this.y;
        var hypotenuseSquared = distX * distX + distY * distY;
        if( distX !== 0 || distY !== 0 ) {

            var unitVector = Math.sqrt(hypotenuseSquared);
            var vx = distX / unitVector;
            var vy = distY / unitVector;

            this.x += vx * this.moveSpeed * deltaTime;
            this.y += vy * this.moveSpeed * deltaTime;

            // check if the zombie is already closed to the target position
            if (hypotenuseSquared <= this.moveSpeed * this.moveSpeed) {
                this.moveIndex += 1;
            }
        }
        else
        {
            console.log("out of distance");
        }
    };
};