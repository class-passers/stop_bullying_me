var ButtonObject = function( buttonType, visibility)
{
	this.buttonInfo = Button(buttonType);
	this.x = this.buttonInfo.x;
	this.y = this.buttonInfo.y;
	this.width = this.buttonInfo.width;
	this.height = this.buttonInfo.height;
	
	this.execute = this.buttonInfo.execute;
	this.isClickable = true;
	this.isVisible = visibility;
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
	
	this.update = function(deltaTime){ if(self.isVisible == false)self.isClickable = false;}
	
	this.render = function(context)
	{
		if(self.isVisible == true)
		{
			context.drawImage(self.curImage, self.x, self.y, self.width, self.height);
		}
	}
}