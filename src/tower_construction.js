var buildImage = {
	image : null,
	image_src : "img/tower_build.png",
	num_sprite_horz : 5,
	num_sprite_vert : 1,
	max_num_sprites : 5,
	sprite_width : 85,
    sprite_height : 133
};

buildImage.image = new Image();
buildImage.image.src = buildImage.image_src;
buildImage.image.onload = function(){
	buildImage.sprite_width = Math.floor(buildImage.image.width / buildImage.num_sprite_horz);
	buildImage.sprite_height = Math.floor(buildImage.image.height / buildImage.num_sprite_vert);
    numLoadedAssets++;
};
numAllAssets++;

var progressImage = new Image();
progressImage.src = "img/progress_bar.png";

var BuildObject = function ( tower_type, interval, pos_x, pos_y, width, height )
{
	this.progress = 0;

	this.objectType = "towerInConstruction";
	this.x = pos_x;
    this.y = pos_y - height;
	this.z = 0;
	this.width = width;
    this.height = height;
	this.image = buildImage;
	this.spriteIndex = 0;
	this.buildInterval = interval / 1000;
	this.buildTimer = 0;
	this.preBuiltTower = new TowerObject( tower_type, pos_x, pos_y );
	if( attacker_type === "human" )
    	gameObjects.push( new ZombieObject( tower_type, base.x, base.y+base.height, this.preBuiltTower, false ) );
	else
    	gameObjects.push( new HumanObject( tower_type, base.x, base.y+base.height, this.preBuiltTower, false ) );

	this.progress_image = progressImage;
	this.progress_width = this.width;
	this.progress_height = Math.floor(this.progress_width / 8);
	this.progress_x = this.x;
	this.progress_y = this.y - this.progress_height;
	
	this.to_be_removed = false;
	
	//functions for rendering
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
        return this.image.sprite_width * (Math.floor(this.spriteIndex) % this.image.num_sprite_horz);
    };
    this.get_source_y = function()
    {
        return this.image.sprite_height * (Math.floor(this.spriteIndex) % this.image.num_sprite_vert);
    };
	this.get_sprite_width = function()
	{
		return this.image.sprite_width;
	};
	this.get_sprite_height = function()
	{
		return this.image.sprite_height;
	};
	
	this.update = function(deltaTime)
	{
		this.buildTimer += deltaTime;
		this.progress = this.buildTimer/this.buildInterval;
		this.spriteIndex = Math.floor( this.progress * 5 );
		if(this.progress >= 1)
		{
			this.progress = 1;
			this.preBuiltTower.isBuilt = true;
            gameObjects.push( this.preBuiltTower );
			this.to_be_removed = true;
		}
		this.progress_width = Math.floor(this.width * this.progress);
	};

	this.render = function(context)
	{
		// build animation
		context.drawImage(this.image.image, this.get_source_x(), this.get_source_y(),
            this.get_sprite_width(), this.get_sprite_height(),
            this.get_x(), this.get_y(), this.width, this.height );
		
		// progress bar
		context.drawImage(this.progress_image, this.progress_x, this.progress_y, this.progress_width, this.progress_height);
	};
};