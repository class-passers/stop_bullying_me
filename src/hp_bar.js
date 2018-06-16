var hpImage = new Image();
hpImage.src = "img/base_hp_bar.png";

var HPBar = function( parent )
{
    //about hp bar
    this.hp_image = hpImage;
    this.hp_width = parent.width;
    this.hp_onePercent = parent.hp_width/100;
    this.hp_height = Math.floor(parent.hp_width / 8);
    this.hp_x = parent.x;
    this.hp_y = parent.y - this.hp_height;

    this.setRatio = function( ratio )
    {
        this.hp_ratio = ratio;
    };

    this.update = function()
    {
        var percent = Math.floor((this.hp / this.max_hp)*100);
        this.hp_width = Math.floor(this.hp_onePercent*percent);
    };

    this.render = function()
    {
        context.drawImage(this.hp_image, this.hp_x, this.hp_y, this.hp_width, this.hp_height);
    };

};