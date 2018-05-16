
var zombieImage = new Image();
zombieImage.src = "img/zombie_walk.png";
zombieImage.onload = function(){
    this.sprite_width = zombieImage.width / 4;
    this.sprite_height = zombieImage.height / 3;
};

var zombieObject = function( pos_x, pos_y, width, height ){
    this.x = pos_x;
    this.y = pos_y;
    this.width = width;
    this.height = height;
    this.sprite_width = zombieImage.width / 4;
    this.sprite_height = zombieImage.height / 3;
    this.max_num_sprites = 10;
    this.image = zombieImage;
    this.index = 0;
    this.get_source_x = function()
    {
        return this.sprite_width * ( Math.floor(this.index) % 4 )
    };
    this.get_source_y = function()
    {
        return this.sprite_height * Math.floor( Math.floor(this.index) / 4 );
    };

    this.update = function()
    {
        this.index += 0.2;
        if( this.index >= this.max_num_sprites )
            this.index = 0;
    };
};