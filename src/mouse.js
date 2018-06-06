var mouseObject = function(can)
{
	this.canvas = can;
	this.x;
	this.y;
	this.run = function(){console.log("default1"); return true};
	
	var self = this;
	
	this.position = function(event)
	{
		var rect = self.canvas.getBoundingClientRect();
		self.x = event.clientX - rect.left;
		self.y = event.clientY - rect.top;
	}
	this.click = function(event)
	{
		//left moust button click
		if(event.which == 1)
		{
			//*
			console.log(self.x);
			console.log(self.y);
			//*/
			
			//run assigned function
			if(self.run() == true)
			{
				//If the function worked properly, change it to default
				self.assignFunction(self.defaultFunction);
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
		console.log("default2");
		return true;
	}
}



