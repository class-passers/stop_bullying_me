var canvas = document.querySelector("#game_frame");
canvas.width = 1000;
canvas.height = 800;

var context = canvas.getContext("2d");

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

var cur_level = levels[0];
loadMapData();

cur_level.populate_timer = setInterval( function() {
    //if( document.hasFocus() )
        populateZombie();
    }, 5000 );

//objects.push(new ZombieObject(0, 0, 128, 128));
function populateZombie()
{
    var start = get_start_location();
    console.log( "remaining zombies = " + cur_level.remaining_zombies );
    if( start != null ) {
        if( cur_level.remaining_zombies > 0 ) {
            // TODO : need to create zombies based on level data.
            var zombie = new ZombieObject( ["normal", "fast"][getRandom(2)], start.x, start.y, 128, 128);
            objects.push(zombie);
            cur_level.remaining_zombies--;
        }
        else
        {
             clearInterval(cur_level.populate_timer);
            cur_level.populate_timer = null;
        }
    }
}

var Time = {
    last : new Date().getTime(),
    now : null,
    delta : 0
};
update();
function update()
{
    Time.now = new Date().getTime();
    Time.delta = (Time.now - Time.last) / 1000;
    Time.last = Time.now;
    //console.log( "delta = " + Time.delta );

    //if( document.hasFocus() === false )
    //    return;
    for( var i = 0; i < objects.length; i++ )
    {
        objects[i].update( Time.delta );
    }

    objects = objects.filter(function (obj) {
        return obj.to_be_removed === false;
    });

    // sort by y position to render properly
    objects.sort( function(a, b){ return a.y + a.height - b.y - b.height } );

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
        objects[i].render( context );
    }

}

