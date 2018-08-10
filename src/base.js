var humanBaseImg = {
	image_src : "img/base_human.png",
	max_num_sprites : 4,
	num_sprites_horz : 4,
	num_sprites_vert : 1,
	sprite_width : 0,
	sprite_height : 0,
	image : null
};
humanBaseImg.image = new Image();
humanBaseImg.image.src = humanBaseImg.image_src;
humanBaseImg.image.onload = (function(){
	humanBaseImg.sprite_width = Math.floor(humanBaseImg.image.width / humanBaseImg.num_sprites_horz);
	humanBaseImg.sprite_height = Math.floor(humanBaseImg.image.height / humanBaseImg.num_sprites_vert);
    numLoadedAssets++;
});
numAllAssets++;

var zombieBaseImg = {
	image_src : "img/base_zombie2.png",
	max_num_sprites : 4,
	num_sprites_horz : 4,
	num_sprites_vert : 1,
	sprite_width : 0,
	sprite_height : 0,
	image : null
};
zombieBaseImg.image = new Image();
zombieBaseImg.image.src = zombieBaseImg.image_src;
zombieBaseImg.image.onload = (function(){
	zombieBaseImg.sprite_width = Math.floor(zombieBaseImg.image.width / zombieBaseImg.num_sprites_horz);
	zombieBaseImg.sprite_height = Math.floor(zombieBaseImg.image.height / zombieBaseImg.num_sprites_vert);
    numLoadedAssets++;
});
numAllAssets++;

var hpImage = new Image();
hpImage.src = "img/base_hp_bar.png";

var gameStatus = {
    playing : 0,
	paused : 1,
    won : 2,
    lost : 3,
	startMenu : 4
};

// base object for storing player's hp and enemies which are still alive on map
var baseObject = function(pos_x, pos_y )
{
    this.objectType = "basecamp";
    this.unitInfo = BaseInfo[ cur_level_index ];

    this.hp = this.unitInfo.hp;
	this.max_hp = this.unitInfo.hp;

	this.alive_enemies = cur_level.remaining_zombies;
	this.resource = cur_level.start_money;
	//this.resource_container = new ContainerObject("resource");
    this.x = pos_x - Math.floor( this.unitInfo.width / 4 );
    this.y = pos_y - Math.floor( this.unitInfo.height * 3 / 4 );
    this.z = -5;
    this.width = this.unitInfo.width;
    this.height = this.unitInfo.height;
	this.Img = attacker_type==="human"?zombieBaseImg:humanBaseImg;
	this.spriteIndex = 0;
	

	this.hpBar = new HPBar( this );

    this.isOnCooldown = false;
    this.curTarget = null;

    // set this flag as true when a tower destroyed.
    this.to_be_removed = false;
//functions
	//called when an enemy is attacking the player's base
	this.takeDamage = function(damage)
	{
		this.hp -= damage;
		//*
		if((this.max_hp-this.hp) > ((this.max_hp/this.Img.max_num_sprites)*(this.spriteIndex+1)))
		{
			this.spriteIndex++;
		}
		//*/
		if(this.hp <= 0)
		{
			this.lose();
			this.spriteIndex = (this.Img.max_num_sprites-1);
		}
	};

	this.lose = function()
	{
		pauseGame();
		Time.TimeScale(1);
        cur_game_state = gameStatus.lost;
        music.bgm.pause();
        music.loseSound.play();
		console.log("Lose");
		
		hideStateContainer("lose");
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
		pauseGame();
		Time.TimeScale(1);
        cur_game_state = gameStatus.won;
        cleared_level = cur_level_index+1;
        music.bgm.pause();
        music.winSound.play();
		console.log("Win");
		
		if(cleared_level >= levels.length)
		{
			hideStateContainer("end");
		}
		else
		{
			hideStateContainer("win");
		}
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
		/*/
		return 0;
		/*/
        return this.Img.sprite_width * (Math.floor(this.spriteIndex)%this.Img.num_sprites_horz);
		//*/
    };
    this.get_source_y = function()
    {
        return 0;
    };
	this.get_sprite_width = function() {
		return this.Img.sprite_width;
	};
	this.get_sprite_height = function() {
		return this.Img.sprite_height;
	};	

    this.get_center_x = function()
    {
        return Math.floor( this.x + this.width / 2 );
    };

    this.get_center_y = function()
    {
        return Math.floor( this.y + this.height / 2 );
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
	this.update = function(deltaTime)
    {
        this.findTarget();
        this.fire();

        FindIndicator("money").txt = this.resource.toString();
        this.hpBar.update( deltaTime );
        console.log("base = " + this.x + ", " + this.y + " : " + this.width + ", " + this.height );
        console.log("hp = " + this.hpBar.hp_x + ", " + this.hpBar.hp_y + " : " + this.hpBar.hp_width + ", " + this.hpBar.hp_height );
    };

	this.render = function(context)
	{
		/*
		context.drawImage(this.image, this.get_source_x(), this.get_source_y(), baseImage.width, baseImage.height, this.get_x(), this.get_y(), this.width, this.height);
		/*/
		context.drawImage(this.Img.image, this.get_source_x(), this.get_source_y(),this.get_sprite_width(), this.get_sprite_height(),
			this.get_x(), this.get_y(), this.width, this.height);
		//*/

		this.hpBar.render(context );
	};

    this.findTarget = function() {


        // if  a zombie is already in target, fire him.
        if( this.curTarget && this.curTarget.hp > 0 ){
            if(getDistanceSquare( this, this.curTarget ) < this.unitInfo.attackRange * this.unitInfo.attackRange ) {
                return;
            }
        }

        this.curTarget = null;
        // find any zombie in its attack range
        for( var i = 0; i < gameObjects.length; i++ ) {
            if (gameObjects[i].objectType === attacker_type && gameObjects[i].hp > 0 ) {
                // check if the zombie is in tower's attack range
                if( getDistanceSquare( this, gameObjects[i] ) < this.unitInfo.attackRange * this.unitInfo.attackRange ) {
                    this.curTarget = gameObjects[i];
                    return;
                }
            }
        }
    };

    this.fire = function() {
        if( this.isOnCooldown === false && this.curTarget !== null )
        {
            var center_x = this.x + Math.floor(this.width / 2);
            var center_y = this.y + Math.floor(this.height/ 5);
            gameObjects.push( new Bullet( center_x, center_y, this.curTarget, this.unitInfo.attackPower) );
            this.isOnCooldown = true;
            var self = this;
            Time.Wait( function()
            {
                self.isOnCooldown = false;
            }, this.unitInfo.attackSpeed )
        }
    };
};
