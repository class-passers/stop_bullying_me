var hpImage = new Image();
hpImage.src = "img/base_hp_bar.png";

var HPBar = function( parent )
{
    //about hp bar
    this.hp_image = hpImage;
    this.hp_width = 0;
    this.hp_height = Math.min( Math.floor( parent.height * 0.1 ), 15 );
    this.hp_x = 0;
    this.hp_y = parent.y - this.hp_height;
    this.parent = parent;

    this.update = function( deltaTime )
    {
        this.hp_width = Math.floor( parent.width * 0.70 * ( Math.max( 0, this.parent.hp ) / this.parent.max_hp ) );

        if( parent.x + parent.width >= worldMap.width )
        {
            this.hp_x = Math.floor(parent.x + parent.width * 0.1);
        }
        else
        {
            this.hp_x = Math.floor(parent.x + parent.width * 0.3);
        }
        this.hp_y = parent.y - this.hp_height;
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