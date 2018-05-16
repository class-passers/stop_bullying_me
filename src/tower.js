
var towerImage = new Image();
towerImage.src = "img/tower.png";
towerImage.onload = function() {
    this.sprite_width = towerImage.width;
    this.sprite_height = towerImage.height;
};

var towerObject = function( pos_x, pos_y, width, height ){
    this.x = pos_x;
    this.y = pos_y;
    this.width = width;
    this.height = height;
    this.sprite_width = towerImage.width;
    this.sprite_height = towerImage.height;
    this.max_num_sprites = 1;
    this.image = towerImage;
    this.index = 0;
    // set this flag as true when a tower destroyed.
    this.to_be_removed = false;

    this.get_x = function()
    {
        return this.x;
    };

    this.get_y = function()
    {
        return this.y - this.height;
    };

    this.get_source_x = function()
    {
        return 0;
    };
    this.get_source_y = function()
    {
        return 0;
    };
    this.update = function()
    {
    };
};