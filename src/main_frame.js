var canvas = document.querySelector("#game_frame");
canvas.width = 1000;
canvas.height = 800;

var context = canvas.getContext("2d");

var world_map_img = new Image();
world_map_img.src = "img/world_map.png";



var objects = [];
objects.push( new towerObject( 320, 320, 85, 133 ) );
objects.push( new towerObject( 250, 450, 85, 133 ) );

//var window_focused = true;
//window.onfocus = function() {
//    window_focused = true;
//};
//window.onblur = function() {
//    window_focused = false;
//};

setInterval( function() {
    //if( document.hasFocus() )
        populateZombie();
    }
    , 3000 );
function populateZombie()
{
    var start = get_start_location();
    if( start != null ) {
        objects.push(new zombieObject(start.x, start.y, 128, 128));
    }
}

// set fixed frame rate as 60fps
setInterval( update, Math.floor(1000/60) );
function update()
{
    //if( document.hasFocus() === false )
    //    return;
    for( var i = 0; i < objects.length; i++ )
    {
        objects[i].update();
    }

    objects = objects.filter(function (obj) {
        return obj.to_be_removed === false;
    });

    // sort by y position to render properly
    objects.sort( function(a, b){ return a.y + a.height - b.y - b.height } );


    render();
}

function render()
{
    // no need to clear context
    context.drawImage( world_map_img, 0, 0 );
    // draw objects
    for( var i = 0; i < objects.length; i++ )
    {
        objects[i].render( context );
    }

}

