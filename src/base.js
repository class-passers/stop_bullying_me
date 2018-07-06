var baseImage = new Image();
baseImage.src = "img/tower.png";

var hpImage = new Image();
hpImage.src = "img/base_hp_bar.png";

var gameStatus = {
    playing : 0,
    won : 2,
    lost : 3
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
	this.earn_interval = null;
	this.resource_indicator = new IndicatorObject("money", 1070, 10, 0);
	this.button_popup = null;
	
	//animation request for main game loop
	this.gameStatus  = gameStatus.playing;
    this.isPaused = false;

    this.x = pos_x;
    this.y = pos_y - this.unitInfo.height;
    this.z = 0;
    this.width = this.unitInfo.width;
    this.height = this.unitInfo.height;
	this.image = baseImage;
	this.max_num_sprites = 1;

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
		if(this.hp <= 0)
		{
			this.lose();
		}
	};

	this.lose = function()
	{
        this.gameStatus = gameStatus.lost;
		console.log("Lose");
		//restartGame();
		
		this.findButton("replay");
		this.button_popup.isVisible = true;

		pauseGame();
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
        this.gameStatus = gameStatus.won;
		console.log("Win");
		//nextLevel();
		
		this.findButton("next");
		this.button_popup.isVisible = true;
		
		this.findButton("replay");
		this.button_popup.isVisible = true;

		pauseGame();
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
	this.update = function(deltaTime)
    {
        this.findTarget();
        this.fire();

        this.resource_indicator.txt = this.resource.toString();
        this.hpBar.update( deltaTime );
    };

	this.render = function(context)
	{
		context.drawImage(this.image, this.get_source_x(), this.get_source_y(), baseImage.width, baseImage.height, this.get_x(), this.get_y(), this.width, this.height);

		this.hpBar.render(context );
	};
	this.findButton = function(buttonType)
	{
		for(var i = 0; i < uiObjects.length; i++)
		{
			if(uiObjects[i].uiInfo.name === buttonType)
			{
				this.button_popup = uiObjects[i];
			}
		}
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
            if (gameObjects[i].objectType === "zombie" && gameObjects[i].hp > 0 ) {
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
            setTimeout( function()
            {
                self.isOnCooldown = false;
            }, this.unitInfo.attackSpeed )
        }
    };
};
