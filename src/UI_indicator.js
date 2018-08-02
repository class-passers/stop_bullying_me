var IndicatorObject = function(container, indicatorType, txt_value)
{
	var self = this;
	this.uiInfo = Indicator(indicatorType);
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
	
	this.txt = txt_value != null? txt_value.toString() : "";
	this.txt_x = this.x + this.width + this.uiInfo.txt_x;
	this.txt_y = this.y + this.uiInfo.txt_y;
	this.txt_color = this.uiInfo.txt_color;
	this.txt_font = this.uiInfo.txt_font;

	this.isClickable = false;
	this.isVisible = this.uiInfo.visibility;
	this.spriteIndex = 0;
	this.curImage = indicatorImages[this.uiInfo.name];
	
	this.to_be_removed = false;
	
	if(this.uiInfo.interval > 0)
		setInterval(function(){self.to_be_removed = true;}, self.uiInfo.interval);
	
	this.get_x = function()
	{
		return Math.floor(this.x);
	};
	this.get_y = function()
	{
		return this.y;
	};
	this.get_source_x = function()
	{
		return this.curImage.sprite_width * (Math.floor(this.spriteIndex)%this.curImage.num_sprites_horz);
	};
	this.get_source_y = function()
	{
		return this.curImage.sprite_height * Math.floor(this.spriteIndex / this.curImage.num_sprites_horz);
	};
	this.get_sprite_width = function()
    {
        return this.curImage.sprite_width;
    };
    this.get_sprite_height = function()
    {
        return this.curImage.sprite_height;
    };
	this.update = function(deltaTime)
	{
		this.spriteIndex += 10*deltaTime;
		this.spriteIndex %= this.curImage.max_num_sprites
	};
	this.render = function(context)
	{
		if( this.curImage.image && this.isVisible === true) {
            //*
            context.drawImage(this.curImage.image, this.get_source_x(), this.get_source_y(),
                this.get_sprite_width(), this.get_sprite_height(),
                this.get_x(), this.get_y(), this.width, this.height);
            //*/

            context.fillStyle = this.txt_color;
            context.font = this.txt_font;
            context.textAlign = 'left';
			context.textBaseline = 'top';
			wrapText(context,self.uiInfo.txt_sign + this.txt, this.txt_x, this.txt_y, 1000, 150)
            //context.fillText(self.uiInfo.txt_sign + this.txt, this.txt_x, this.txt_y);
        }
	};
};
