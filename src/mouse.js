var mouseObject = function(can)
{
	this.canvas = can;

	
	this.x;
	this.y;
	
	var self = this;
	
	this.position = function(event)
	{
		var rect = self.canvas.getBoundingClientRect();
		self.x = event.clientX - rect.left;
		self.y = event.clientY - rect.top;
		
		//console.log(self.x);
		//console.log(self.y);
	}
	
	this.click = function(event)
	{
		//left moust button click
		if(event.which == 1)
		{
			console.log(self.x);
			console.log(self.y);
		}
	}
}



