
var validImage = new Image();
validImage.src = "img/tower_valid.png";

var invalidImage = new Image();
invalidImage.src = "img/tower_invalid.png";

var BuildIndicator = function( tower_type, positions, base, pos_x, pos_y, width, height ){
    this.x = pos_x - Math.floor( width / 2 );
    this.y = pos_y - Math.floor( height / 2 );
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
        return this.y;
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
	    var x = this.x;
	    var end_x = this.x + this.width;
	    end_x -= ( end_x % worldMap.tileWidth );
        var y = this.y + this.height;
        y -= ( y % worldMap.tileHeight + worldMap.tileHeight);
        document.getElementById("game_info").innerHTML = "mouse" + ":" + mouse.x + "," + mouse.y;
        document.getElementById("game_info").innerHTML += "<br>" +"build :" + this.x + "," + this.y + "("+y+")";

		if(get_tile_type( x, y ) === 0 &&
			get_tile_type( end_x, y ) === 0 &&
			base.resource >= TowerInfo[this.towerType].cost)
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

        this.x = mouse.x - Math.floor(this.width/ 2);
        this.x -= ( this.x % worldMap.tileWidth) ;
		this.y = mouse.y - Math.floor(this.height / 2);
		this.y -= ( this.y % worldMap.tileHeight );
		this.isValid = this.canBuild();
    };
    this.render = function( context )
    {
    	// draw the attack range of the bound troop, not tower's range
        context.beginPath();
        context.arc( Math.floor(this.get_x() + this.width/2), Math.floor(this.get_y() + this.height/2), HumanTroopInfo[this.towerType].attackRange, 0, 2*Math.PI );
        context.fillStyle = "rgba(0, 0, 128, 0.2)";
        context.fill();

        context.drawImage( this.image, this.get_source_x(), this.get_source_y(),
            towerImage.width, towerImage.height,
            this.get_x(), this.get_y(), this.width, this.height );

    };
};