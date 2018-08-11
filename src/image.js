var StaticObject = function( x, y, width, height, imageSource )
{
    this.objectType = "image";
    this.x = x;
    this.y = y - height;
    this.z = -1;
    this.width = width;
    this.height = height;
    this.imageSource = new Image();
    this.imageSource.src = imageSource;

    this.to_be_removed = false;

    this.update = function(deltaTime)
    {
    };

    this.render = function(context)
    {
        //console.log("sprite = " + Math.floor(this.spriteIndex) + " => " + this.get_source_x() + ":" + this.get_image_width() + ", " + this.get_source_y() + ":" + this.get_image_height() );
        context.drawImage( this.imageSource, 0, 0, this.imageSource.width, this.imageSource.height,
            this.x, this.y, this.width, this.height );
    };
};