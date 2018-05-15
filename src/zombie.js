
var zombieImage = new Image();
zombieImage.src = "img/zombie_walk.png";

const zombieImageWidth = 1720;
const zombieImageHeight = 1557;

var zombieObject = function( pos_x, pos_y, width, height ){
    this.x = pos_x;
    this.y = pos_y;
    this.width = width;
    this.height = height;
    this.sprite_width = zombieImageWidth / 4;
    this.sprite_height = zombieImageHeight / 3;
    this.max_num_sprites = 10;
    this.image = zombieImage;
    this.index = 0;
    this.get_source_x = function()
    {
        return this.sprite_width * ( parseInt(this.index) % 4 )
    };
    this.get_source_y = function()
    {
        return this.sprite_height * parseInt( parseInt(this.index) / 4 );
    };
    this.update = function()
    {
        this.index += 0.2;
        if( this.index >= this.max_num_sprites )
            this.index = 0;
    };
};