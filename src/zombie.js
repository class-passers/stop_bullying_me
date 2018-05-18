
var zombieImages = {

    walk : {
        image_src : "img/zombie_walk.png",
        max_num_sprites : 10,
        num_sprites_horz : 4,
        num_sprites_vert : 3,
        sprite_width : 0,
        sprite_height : 0,
        image : new Image()
    },
    dying : {
        image_src : "img/zombie_dying.png",
        max_num_sprites : 12,
        num_sprites_horz : 2,
        num_sprites_vert : 6,
        sprite_width : 0,
        sprite_height : 0,
        image : new Image()
    }
};

zombieImages.walk.image.src = zombieImages.walk.image_src;
zombieImages.walk.image.onload = function(){
    zombieImages.walk.sprite_width = Math.floor(zombieImages.walk.image.width / zombieImages.walk.num_sprites_horz);
    zombieImages.walk.sprite_height = Math.floor(zombieImages.walk.image.height / zombieImages.walk.num_sprites_vert);
};
zombieImages.dying.image.src = zombieImages.dying.image_src;
zombieImages.dying.image.onload = function(){
    zombieImages.dying.sprite_width = Math.floor(zombieImages.dying.image.width / zombieImages.dying.num_sprites_horz);
    zombieImages.dying.sprite_height = Math.floor(zombieImages.dying.image.height / zombieImages.dying.num_sprites_vert);
};

var zombieObject = function( pos_x, pos_y, width, height ){
    this.x = pos_x;
    this.y = pos_y;
    this.moveSpeed = 0.5;
    this.moveIndex = 0;
    this.width = width;
    this.height = height;
    this.spriteIndex = 0;
    this.current_image = zombieImages.walk;
    this.status = 0;    // 0 : walk, 1 : dying
    // set this flag as true when a zombie died or go out of bound.
    this.to_be_removed = false;

    this.get_x = function()
    {
        return Math.floor(this.x - this.width / 2);
    };

    this.get_y = function()
    {
        // to render at proper position
        return Math.floor(this.y - this.height);
    };

    this.get_source_x = function()
    {
        return this.current_image.sprite_width * ( Math.floor(this.spriteIndex) % this.current_image.num_sprites_horz );
    };
    this.get_source_y = function()
    {
        return this.current_image.sprite_height * Math.floor( this.spriteIndex / this.current_image.num_sprites_horz );
    };

    this.get_sprite_width = function()
    {
        return this.current_image.sprite_width;
    };
    this.get_sprite_height = function()
    {
        return this.current_image.sprite_height;
    };


    this.update = function()
    {
        var nextPos = get_next_position( this.moveIndex );
        var distX = nextPos.x - this.x;
        var distY = nextPos.y - this.y;
        var hypotenuseSquared = distX * distX + distY * distY;
        if( distX !== 0 || distY !== 0 ) {

            var unitVector = Math.sqrt(hypotenuseSquared);
            var vx = distX / unitVector;
            var vy = distY / unitVector;

            this.x += vx * this.moveSpeed;
            this.y += vy * this.moveSpeed;

            //console.log("dist to target = " + this.moveIndex + " : " + distX + " , " + distY + " hyp : " + hypotenuseSquared );
            //console.log("next pos = " + nextPos.x + " , " + nextPos.y );
            //console.log("unit vector = " + unitVector + " : " + vx + " , " + vy);
            //console.log("move zombie = " + this.x + " , " + this.y);

            // check if the zombie is already closed to the target position
            if (hypotenuseSquared <= this.moveSpeed * this.moveSpeed) {
                this.moveIndex += 1;

                if( is_reached_at_destination( this.moveIndex ) )
                {
                    this.to_be_removed = true;
                }
            }
        }
        else
        {
            console.log("out of dist");
        }

        // for render sprite index
        this.spriteIndex += 0.25;
        if( this.spriteIndex >= this.current_image.max_num_sprites )
            this.spriteIndex = 0;
    };

    this.render = function( context )
    {
        context.drawImage( this.current_image.image, this.get_source_x(), this.get_source_y(),
            this.get_sprite_width(), this.get_sprite_height(),
            this.get_x(), this.get_y(), this.width, this.height );
    };
};