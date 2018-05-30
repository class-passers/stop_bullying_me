
var towerImage = new Image();
towerImage.src = "img/tower.png";

var TowerObject = function( pos_x, pos_y, width, height ){
    this.x = pos_x;
    this.y = pos_y;
    this.width = width;
    this.height = height;

    this.max_num_sprites = 1;
    this.image = towerImage;

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
    this.update = function( deltaTime )
    {
    };
    this.render = function( context )
    {
        context.drawImage( this.image, this.get_source_x(), this.get_source_y(),
            towerImage.width, towerImage.height,
            this.get_x(), this.get_y(), this.width, this.height );
    };
};