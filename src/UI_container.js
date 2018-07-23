var ContainerObject = function( containerType)
{
	var self = this;
	this.uiInfo = Container(containerType);
	this.position = new Pos(this.uiInfo.x, this.uiInfo.y);
	this.isVisible = this.uiInfo.visibility
	this.uiLayer = this.uiInfo.uiLayer;
	
	this.childElements = [];
	
	this.targetPositions = this.uiInfo.target_positions;
	this.posIndex = 0;
	this.isMoving = false;
	this.speed = 800;
	
	this.to_be_removed = false;
	
	this.createChildElement = function()
	{
		for(var i = 0; i < self.uiInfo.buttons.length; i++)
		{
			var temp = new ButtonObject(self, self.uiInfo.buttons[i]);
			if(temp.uiInfo.display_level > cur_level_index)
				temp.isVisible = false;
			self.childElements.push(temp);
		}
		for(var i = 0; i < self.uiInfo.indicators.length; i++)
		{
			self.childElements.push(new IndicatorOjbect(self, self.uiInfo.indicators[i], null));
		}
	}
	this.movingOn = function(layer)
	{
		self.posIndex++;
		self.posIndex %= 2;
		
		self.uiLayer = layer;
		mouse.uiLayer = layer;
		
		self.isMoving = true;
	}
	this.moving = function(deltaTime)
	{
		var normal_dir = getNormalizedVector(new Pos(
		(self.targetPositions[self.posIndex].x - self.position.x),
		(self.targetPositions[self.posIndex].y - self.position.y)));
		
		self.position.x += normal_dir.x * deltaTime * self.speed;
		
		for(var i = 0; i < self.childElements.length; i++)
		{
			self.childElements[i].x = self.position.x + self.childElements[i].uiInfo.x;
			self.childElements[i].y = self.position.y + self.childElements[i].uiInfo.y;
		}
		if(Math.abs(self.position.x - self.targetPositions[self.posIndex].x) <= 5)
		{
			self.position.x = self.targetPositions[self.posIndex].x;
			self.position.y = self.targetPositions[self.posIndex].y;
			self.isMoving = false;
		}
	}
	
	this.update = function(deltaTime)
	{
		if(self.isMoving == true)
		{
			this.moving(deltaTime);
		}
		for(var i = 0; i < self.childElements.length; i++)
		{
			self.childElements[i].update(deltaTime);
		}
		self.childElements = self.childElements.filter(function (obj) {
			return obj.to_be_removed === false;
		});
	}
	
	this.render = function(context)
	{
		if(self.isVisible == true)
		{
			for(var i = 0; i < self.childElements.length; i++)
			{
				self.childElements[i].render(context);
			}
		}
	}
	this.createChildElement();
}