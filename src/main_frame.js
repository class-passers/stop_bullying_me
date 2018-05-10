let canvas = document.querySelector("#game_frame");
canvas.width = 1000;
canvas.height = 800;

let context = canvas.getContext("2d");

let world_map_img = new Image();
world_map_img.src = "img/world_map.png";

let renderObject = function( pos_x, pos_y, width, height, image ){
    this.x = pos_x;
    this.y = pos_y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.update = function()
    {

    };
};

let objects = [];
objects.push( new renderObject( 0, 0, 0, 0, '' ) );
update();
function update()
{
    for( var i = 0; i < objects.length; i++ )
    {
        objects[i].update();
    }

    render();
    requestAnimationFrame(update);
}

function render()
{
    // no need to clear context
    context.drawImage( world_map_img, 0, 0 );

    // draw objects
    for( var i = 0; i < objects.length; i++ )
    {
        //context.drawImage( objects[i].image, objects.x, objects.y );
    }

}


// push & pull test