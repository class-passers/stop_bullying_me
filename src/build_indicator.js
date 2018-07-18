
var validImage = new Image();
validImage.src = "img/tower_valid.png";

var invalidImage = new Image();
invalidImage.src = "img/tower_invalid.png";

var BuildIndicator = function( tower_type, mouse, positions, base, pos_x, pos_y, width, height ){
    this.x = pos_x;
    this.y = pos_y;
	this.z = 0;
    this.width = width;
    this.height = height;
	this.isValid = false;
	this.towerType = tower_type;

    this.image = validImage;
    this.buildTimer = null;

    // set this flag as true when a tower destroyed.
    this.to_be_removed = false;

    this.get_x = function()
    {
        return this.x;
    };
    this.get_y = function()
    {
        return (this.y - this.height)+worldMap.tileHeight;
    };

    this.get_source_x = function()
    {
        return 0;
    };
    this.get_source_y = function()
    {
        return 0;
    };
	this.canBuild = function()
	{
		if(get_tile_type(mouse.x, mouse.y) === 0 &&
			get_tile_type( this.x+this.width, mouse.y ) === 0 &&
			base.resource >= TowerInfo["normal"].cost)
		{
			var rec1 = new Rectangle(this.x, this.y, this.width, worldMap.tileHeight);
			var rec2 = null;
			for(var i = 0; i < positions.length; i++)
			{
				rec2 = new Rectangle(positions[i].x, positions[i].y, this.width, worldMap.tileHeight);
				if(isCollided(rec1, rec2))
				{
					this.image = invalidImage;
					return false;
				}
			}
			this.image = validImage;
			return true;
		}
		else
		{
			this.image = invalidImage;
			return false;
		}
	};
    this.update = function(deltaTime)
    {
		this.x = mouse.x - (mouse.x % worldMap.tileWidth);
		this.y = mouse.y - (mouse.y % worldMap.tileHeight);
		this.isValid = this.canBuild();
    };
    this.render = function( context )
    {
        context.drawImage( this.image, this.get_source_x(), this.get_source_y(),
            towerImage.width, towerImage.height,
            this.get_x(), this.get_y(), this.width, this.height );
    };
};