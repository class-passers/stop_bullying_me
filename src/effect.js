var Effect = function( pos, image, num_max_sprites, num_horz_sprites, num_vert_sprites, num_loops )
{
    this.x = pos.x - Math.floor( ( image.width / num_horz_sprites ) );
    this.y = pos.y - Math.floor( ( image.height / num_vert_sprites ) );
    this.z = 500;
    this.imageSource = image;

    this.spriteIndex = 0;
    this.max_num_sprites = num_max_sprites;
    this.num_sprite_horz = num_horz_sprites;
    this.num_sprite_vert = num_vert_sprites;
    this.num_loops = num_loops;
    this.num_loop_count = 0;
    this.to_be_removed = false;

    //console.log("create effect : " + this.max_num_sprites + " by " + this.num_sprite_horz + " x " + this.num_sprite_vert );

    this.get_source_x = function () {
        return this.get_image_width() * (Math.floor(this.spriteIndex) % this.num_sprite_horz);
    };

    this.get_source_y = function () {
        return this.get_image_height() * Math.floor(Math.floor(this.spriteIndex) / this.num_sprite_horz);
    };

    this.get_image_width =  function()
    {
        //console.log("image width = " + this.imageSource.width + " / " + this.num_sprite_horz + " = " + Math.floor( this.imageSource.width / this.num_sprite_horz ));
        return Math.floor( this.imageSource.width / this.num_sprite_horz );
    };

    this.get_image_height =  function()
    {
        return Math.floor( this.imageSource.height / this.num_sprite_vert );
    };

    this.update = function(deltaTime)
    {
        //this.spriteIndex += 24 * deltaTime;
        this.spriteIndex += 1;
        if (this.spriteIndex >= this.max_num_sprites) {
            this.spriteIndex = 0;
            this.num_loop_count += 1;
        }

        if( this.num_loop_count >= this.num_loops ){
            this.to_be_removed = true;
        }
    };

    this.render = function(context)
    {
        //console.log("sprite = " + Math.floor(this.spriteIndex) + " => " + this.get_source_x() + ":" + this.get_image_width() + ", " + this.get_source_y() + ":" + this.get_image_height() );
        context.drawImage( this.imageSource, this.get_source_x(), this.get_source_y(),
            this.get_image_width(), this.get_image_height(),
            this.x, this.y, this.get_image_width() * 2, this.get_image_height() * 2 );

    };
};