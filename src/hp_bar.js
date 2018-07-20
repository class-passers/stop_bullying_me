var hpImage = new Image();
hpImage.src = "img/base_hp_bar.png";

var HPBar = function( parent )
{
    //about hp bar
    this.hp_image = hpImage;
    this.hp_width = 0;
    this.hp_height = Math.floor( parent.height * 0.08 );
    this.hp_x = 0;
    this.hp_y = 0;
    this.parent = parent;

    this.update = function( deltaTime )
    {
        this.hp_x = Math.floor(parent.x + parent.width * 0.2);
        this.hp_y = parent.y - this.hp_height;
        this.hp_width = Math.floor( parent.width * 0.75 * ( Math.max( 0, this.parent.hp ) / this.parent.max_hp ) );
        //console.log("hp width " + this.hp_width + " ratio = " + ( this.parent.hp / this.parent.max_hp ) + " hp = " + this.parent.hp + " max = " + this.parent.max_hp );

    };

    this.render = function( context )
    {
        if( this.parent.hp > 0 && this.parent.hp < this.parent.max_hp ) {
            // draw hp bar only if the bound object already took damages.
            context.drawImage(this.hp_image, 0, 0, hpImage.width, hpImage.height, this.hp_x, this.hp_y, this.hp_width, this.hp_height);
        }
    };

};