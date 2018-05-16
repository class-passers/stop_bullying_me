var canvas = document.querySelector("#game_frame");
canvas.width = 1000;
canvas.height = 800;

var context = canvas.getContext("2d");

var world_map_img = new Image();
world_map_img.src = "img/world_map.png";

var objects = [];
objects.push( new zombieObject( 0, 0, 128, 128 ) );
objects.push( new towerObject( 250, 320, 85, 133 ) );

// set fixed frame rate as 60fps
setInterval( update, Math.floor(1000/60) );
function update()
{
    for( var i = 0; i < objects.length; i++ )
    {
        objects[i].update();
    }

    render();
}

function render()
{
    // no need to clear context
    context.drawImage( world_map_img, 0, 0 );
    // draw objects
    for( var i = 0; i < objects.length; i++ )
    {
        var obj = objects[i];

        context.drawImage( obj.image, obj.get_source_x(), obj.get_source_y(),
            obj.sprite_width, obj.sprite_height,
            obj.get_x(), obj.get_y(), obj.width, obj.height );
    }

}

