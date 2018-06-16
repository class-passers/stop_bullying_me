var ButtonObject = function( buttonType, pos_x, pos_y)
{
	this.buttonInfo = Button(buttonType);
	this.x = pos_x;
	this.y = pos_y;
	this.width = this.buttonInfo.width;
	this.height = this.buttonInfo.height;
	
	this.execute = this.buttonInfo.execute;
	this.isClickable = true;
	this.curImage = buttonImages[this.buttonInfo.name].default.image;
	
	this.to_be_removed = false;
	var self = this;
	
	this.press = function()
	{
		self.curImage = buttonImages[self.buttonInfo.name].pressed.image;
		return true;
	}
	this.release = function()
	{
		self.curImage = buttonImages[self.buttonInfo.name].default.image;
		return true;
	}
	
	this.update = function(deltaTime){}
	
	this.render = function(context)
	{
		context.drawImage(self.curImage, self.x, self.y, self.width, self.height);
	}
}

var loadUIButtons = function(base, gameObjects, build)
{
	var ui = [];
	
	ButtonInfo["pause"].param = base;
	ButtonInfo["resume"].param = base;
	ButtonInfo["build"].param = build;
	ButtonInfo["build"].param2 = gameObjects;
	
	//these 3 need parameters
	ButtonInfo["next"].param = null;
	ButtonInfo["replay"].param = null;
	ButtonInfo["exit"].param = null;
	
	ui.push(new ButtonObject("pause", 1000, 10));
	return ui;
}