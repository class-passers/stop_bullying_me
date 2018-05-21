var Base = function()
{
	this.hp = 3;
	this.aliveEnemies = 5;
	
	// This function should be called when a zombie is attacking
	this.decreaseHP = function(damage)
	{
		this.hp -= damage;
		if(hp <= 0)
		{
			this.lose();
		}
	}
	this.lose = function()
	{
		console.log("Lose");
	}
	
	// This function should be called when a zombie is dead
	this.decreaseAliveEnemies = function()
	{
		aliveEnemies--;
		if(aliveEnemies <= 0)
		{
			this.win();
		}
	}
	this.win = function()
	{
		console.log("Win");
	}
};