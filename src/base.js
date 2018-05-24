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
	
var decHP = function(d)
{
	base.hp -= d;
	console.log(base.hp);
	
	if(base.hp <= 0)
		base.lose();
}
var defeated = function()
{
	console.log("Lose");
	clearInterval(base.interval);
}
var decEnemies = function()
{
	base.alive_enemies--;
	if(base.alive_enemies <= 0)
	{
		base.win();
	}
}
var defeat = function()
{
	console.log("Win");
	clearInterval(base.interval);
}