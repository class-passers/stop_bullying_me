var mouseObject = function(can, uiObjects)
{
	this.canvas = can;
	this.x;
	this.y;
	this.run = function(){return true};
	this.ui = uiObjects;
	this.mouseDown = false;
	this.isPressing = false;
	this.interacting_button = null;
	var self = this;
	
	this.position = function(event)
	{
		var rect = self.canvas.getBoundingClientRect();
		self.x = event.clientX - rect.left;
		self.y = event.clientY - rect.top;
		if(self.mouseDown == false)
		{
			for(var i = 0; i < self.ui.length; i++)
			{
				// mouse cursor is on a clickable button
				if(self.ui[i].isClickable == true &&
				isInside(self.x, self.y, new Rectangle(self.ui[i].x, self.ui[i].y, self.ui[i].width, self.ui[i].height)) == true)
				{
					canvas.style.cursor = "pointer";
					self.interacting_button = self.ui[i];
					return 0;
				}
				else
				{
					continue;	
				}
			}
			// mouse cursor is not on any button
			self.interacting_button = null;
			canvas.style.cursor = "default";
		}
		else
		{
			if(self.isPressing == true)
			{
				if(isInside(self.x, self.y, new Rectangle(self.interacting_button.x, self.interacting_button.y, self.interacting_button.width, self.interacting_button.height)))
				{
					canvas.style.cursor = "pointer";
					self.interacting_button.press();
				}
				else
				{
					canvas.style.cursor = "default";
					self.interacting_button.release();
				}
			}
		}
	}
	this.down = function(event)
	{
		//left moust button click
		if(event.which == 1)
		{
			self.mouseDown = true;
			if(self.interacting_button != null)
			{
				self.isPressing = true;
				canvas.style.cursor = "pointer";
				self.interacting_button.press();
			}
			
			//run assigned function
			if(self.run() == true)
			{
				//If the function worked properly, change it to default
				self.assignFunction(self.defaultFunction);
			}
		}
	}
	this.up = function(event)
	{
		if(event.which == 1)
		{
			self.mouseDown = false;
			if(self.isPressing == true && self.interacting_button != null)
			{
				self.isPressing = false;
				self.interacting_button.release();
				if(isInside(self.x, self.y, new Rectangle(self.interacting_button.x, self.interacting_button.y, self.interacting_button.width, self.interacting_button.height)))
				{
					//console.log(self.interacting_button);
					self.interacting_button.execute(self.interacting_button.buttonInfo.param);
				}
			}
		}
	}
	
	//assign function to left click
	this.assignFunction = function(func)
	{
		self.run = func;
	}
	this.defaultFunction = function()
	{
		//console.log("Does nothing");
		return true;
	}
}



