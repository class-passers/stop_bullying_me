var ButtonObject = function(container, buttonType)
{
	var self = this;
	this.uiInfo = Button(buttonType);
	this.parent = container;
	this.x = this.uiInfo.x;
	this.y = this.uiInfo.y;
	if(container != null)
	{
		self.x += self.parent.position.x;
		self.y += self.parent.position.y;
	}
	this.width = this.uiInfo.width;
	this.height = this.uiInfo.height;
	
	this.execute = this.uiInfo.execute;
	this.isClickable = true;
	this.isVisible = this.uiInfo.visible;
	this.curImage = buttonImages[this.uiInfo.name].default.image;
	
	this.to_be_removed = false;
	
	this.press = function()
	{
		self.curImage = buttonImages[self.uiInfo.name].pressed.image;
		return true;
	}
	this.release = function()
	{
		self.curImage = buttonImages[self.uiInfo.name].default.image;
		return true;
	}
	
	this.update = function(deltaTime)
	{
		if(self.isVisible == false)
			self.isClickable = false;
		else
			self.isClickable = true;
	}
	
	this.render = function(context)
	{
		if(self.isVisible == true)
		{
			context.drawImage(self.curImage, self.x, self.y, self.width, self.height);
			if(self.uiInfo.text == true && self.uiInfo.param != null)
			{
				context.fillStyle = 'black';
            	context.font = '48px Comic Sans MS';
           		context.textAlign = 'left';
            	context.textBaseline = 'top';
				context.fillText((self.uiInfo.param+1).toString(), self.x + (self.width/3.3), self.y);
			}
		}
	}
}