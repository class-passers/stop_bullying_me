// base object for storing player's hp and enemies which are still alive on map
var base = {
	hp : 100,
	alive_enemies : 5,
	//interval for main game loop
	interval : null,
	
//functions
	//called when an enemy is attacking the player's base
	decreaseHP : function(damage){decHP(damage);},
	lose : function(){defeated();},
	
	//called when an enemy is dead
	decreaseEnemies : function(){decEnemies();},
	win : function(){defeat();}
}

//functions to be used for base object
var decHP = function(d) // decreaseHP
{
	base.hp -= d;
	console.log(base.hp);
	
	if(base.hp <= 0)
		base.lose();
}
var defeated = function() // lose
{
	//Add turing on result screen when UI is ready
	console.log("Lose");
	//and then stops main game loop
	clearInterval(base.interval);
}
var decEnemies = function() // decreaseEnemies
{
	base.alive_enemies--;
	if(base.alive_enemies <= 0)
	{
		base.win();
	}
}
var defeat = function() // win
{
	//Add turing on result screen when UI is ready
	console.log("Win");
	//and then stops main game loop
	clearInterval(base.interval);
}