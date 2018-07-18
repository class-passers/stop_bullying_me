var ButtonObject = function( buttonType, visibility) {
    this.uiInfo = Button(buttonType);
    this.x = this.uiInfo.x;
    this.y = this.uiInfo.y;
    this.width = this.uiInfo.width;
    this.height = this.uiInfo.height;

    this.execute = this.uiInfo.execute;
    this.isClickable = true;
    this.isVisible = visibility;
    this.curImage = buttonImages[this.uiInfo.name].default.image;

    this.to_be_removed = false;
    var self = this;

    this.press = function () {
        self.curImage = buttonImages[self.uiInfo.name].pressed.image;
        return true;
    };

    this.release = function () {
        self.curImage = buttonImages[self.uiInfo.name].default.image;
        return true;
    };

    this.update = function (deltaTime) {
        if (self.isVisible === false)
            self.isClickable = false;
        else
            self.isClickable = true;
    };

	
	this.render = function(context)
	{
		if(self.isVisible === true)
		{
			context.drawImage(self.curImage, self.x, self.y, self.width, self.height);
		}
	};
};