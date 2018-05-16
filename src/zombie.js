
var zombieImage = new Image();
zombieImage.src = "img/zombie_walk.png";
zombieImage.onload = function(){
    this.sprite_width = zombieImage.width / 4;
    this.sprite_height = zombieImage.height / 3;
};

var zombieObject = function( pos_x, pos_y, width, height ){
    this.x = pos_x;
    this.y = pos_y;
    this.moveSpeed = 0.5;
    this.moveIndex = 0;
    this.width = width;
    this.height = height;
    this.sprite_width = zombieImage.width / 4;
    this.sprite_height = zombieImage.height / 3;
    this.max_num_sprites = 10;
    this.image = zombieImage;
    this.spriteIndex = 0;

    this.get_x = function()
    {
        return this.x - this.width / 2;
    };

    this.get_y = function()
    {
        // to render at proper position
        return this.y - this.height;
    };

    this.get_source_x = function()
    {
        return this.sprite_width * ( Math.floor(this.spriteIndex) % 4 )
    };
    this.get_source_y = function()
    {
        return this.sprite_height * Math.floor( this.spriteIndex / 4 );
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
                    // what can do
                    this.moveIndex = 0;
                }

            }
        }
        else
        {
            console.log("out of dist");
        }

        // for render sprite index
        this.spriteIndex += 0.3;
        if( this.spriteIndex >= this.max_num_sprites )
            this.spriteIndex = 0;
    };
};