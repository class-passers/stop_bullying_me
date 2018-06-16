var baseImage = new Image();
baseImage.src = "img/tower.png";

var hpImage = new Image();
hpImage.src = "img/base_hp_bar.png";

// base object for storing player's hp and enemies which are still alive on map
var baseObject = function(startMoney, pos_x, pos_y )
{
    this.objectType = "basecamp";
    this.unitInfo = BaseInfo[ cur_level_index ];

	this.max_hp = 100;
	this.hp = this.max_hp;
	this.alive_enemies = cur_level.remaining_zombies;
	this.resource = startMoney;
	this.earn_interval = null;
	
	//animation request for main game loop
	this.loop = true;
	
    this.x = pos_x;
    this.y = pos_y - this.unitInfo.height;
    this.z = 0;
    this.width = this.unitInfo.width;
    this.height = this.unitInfo.height;
	this.image = baseImage;
	this.max_num_sprites = 1;


	
	//about hp bar
	this.hp_image = hpImage;
	this.hp_width = this.width;
	this.hp_onePercent = this.hp_width/100;
	this.hp_height = Math.floor(this.hp_width / 8);
	this.hp_x = this.x;
	this.hp_y = this.y - this.hp_height;
	
	// set this flag as true when a tower destroyed.
    this.to_be_removed = false;
	
//functions
	//called when an enemy is attacking the player's base
	this.takeDamage = function(damage)
	{
		this.hp -= damage;
		var percent = Math.floor((this.hp / this.max_hp)*100);
		this.hp_width = Math.floor(this.hp_onePercent*percent);
		
		if(this.hp <= 0)
		{
			this.hp_width = 0;
			this.lose();
		}
	};

	this.lose = function()
	{
		console.log("Lose");
		restartGame();

		//this.loop = false;
		//this.earn_interval = null;
	};
	
	//called when an enemy is dead
	this.decreaseEnemies = function(earn)
	{
		this.alive_enemies--;
		this.earnMoney(earn);
		if(this.alive_enemies <= 0)
		{
			this.win();
		}
	};
	this.win = function()
	{

		console.log("Win");
		nextLevel();

		//this.loop = false;
		//this.earn_interval = null;
	};
	
	
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
        return 0;
    };
    this.get_source_y = function()
    {
        return 0;
    };
	
	this.earnMoney = function(amt)
	{
		this.resource += amt;
	};

	this.spendMoney = function(amt)
	{
		this.resource -= amt;
	};

	//functions run evey frame
	this.update = function(deltaTime){};
	this.render = function(context)
	{
		context.drawImage(this.image, this.get_source_x(), this.get_source_y(), baseImage.width, baseImage.height, this.get_x(), this.get_y(), this.width, this.height);
		
		context.drawImage(this.hp_image, this.hp_x, this.hp_y, this.hp_width, this.hp_height);
		
		//*  Drawing text will be changed or removed when UI design is confirmed
		context.fillStyle = 'black';
		context.font = '48px Arial';
		context.textAlign = 'right';
		context.textBaseline = 'top';
		context.fillText(this.resource.toString(), 1270, 0);
		//*/
	};
};
