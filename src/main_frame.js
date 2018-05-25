var canvas = document.querySelector("#game_frame");
canvas.width = 1000;
canvas.height = 800;

var context = canvas.getContext("2d");

var mouse = new mouseObject(canvas);
window.addEventListener("mousemove", mouse.position);
window.addEventListener("mousedown", mouse.click);

var world_map_img = new Image();
world_map_img.src = "img/world_map.png";
world_map_img.onload = function()
{
    canvas.width = world_map_img.width;
    canvas.height = world_map_img.height;
};

var objects = [];
objects.push( new TowerObject( 320, 320, 85, 133 ) );
objects.push( new TowerObject( 250, 450, 85, 133 ) );

//var window_focused = true;
//window.onfocus = function() {
//    window_focused = true;
//};
//window.onblur = function() {
//    window_focused = false;
//};

level0.populate_timer = setInterval( function() {
    //if( document.hasFocus() )
        populateZombie();
    }, 5000 );

//objects.push(new ZombieObject(0, 0, 128, 128));
function populateZombie()
{
    var start = get_start_location();
    console.log( "remaining zombies = " + level0.remaining_zombies );
    if( start != null ) {
        if( level0.remaining_zombies > 0 ) {
            objects.push(new ZombieObject(start.x, start.y, 128, 128));
            level0.remaining_zombies--;
        }
        else
        {
             clearInterval(level0.populate_timer);
            level0.populate_timer = null;
        }
    }
}

// set fixed frame rate as 50fps
base.interval = setInterval( update, Math.floor(1000/50) );
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

