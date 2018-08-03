var mouseObject = function(can)
{
	this.canvas = can;
	this.x;
	this.y;
	this.run = function(){return true};
	this.ui = null;
	this.uiLayer = 0;
	this.mouseDown = false;
	this.isPressing = false;
	this.interacting_button = null;
	var self = this;
	
	this.position = function(event)
	{
		var rect = self.canvas.getBoundingClientRect();
		self.x = clamp(event.clientX - rect.left, 0, 1280);
		self.y = clamp(event.clientY - rect.top, 0, 660);

        //document.getElementById("game_info").innerHTML = "mouse" + ":" + self.x + "," + self.y;
	};
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
	};
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
					if(self.interacting_button.uiInfo.param == null)
						self.interacting_button.execute();
					else
						self.interacting_button.execute(self.interacting_button.uiInfo.param);
				}
			}
		}
	};
	
	//assign function to left click
	this.assignFunction = function(func)
	{
		self.run = func;
	};
	this.defaultFunction = function()
	{
		//console.log("Does nothing");
		return true;
	};
	this.checkUI = function()
	{
		if(self.mouseDown == false)
		{
			for(var i = 0; i < self.ui.length; i++)
			{
				// mouse cursor is on a clickable button on the same layer
				if(self.ui[i].uiInfo.type == "container" && 
				self.ui[i].uiLayer == self.uiLayer &&
				self.ui[i].isVisible == true)
				{
					for(var j = 0; j < self.ui[i].childElements.length; j++)
					{
						if(self.ui[i].childElements[j].isClickable == true && isInside(self.x, self.y, new Rectangle(self.ui[i].childElements[j].x, self.ui[i].childElements[j].y, self.ui[i].childElements[j].width, self.ui[i].childElements[j].height)) == true)
						{
							canvas.style.cursor = "pointer";
							self.interacting_button = self.ui[i].childElements[j];
							return 0;
						}
						else
						{
							continue;	
						}
					}
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
};



