
var canvas = document.querySelector("#game_frame");
canvas.width = 1000;
canvas.height = 800;

var context = canvas.getContext("2d");

var gameObjects = [];

var mouse = new mouseObject(canvas);
var build_indicator = null;
var build_mode = false;
var tower_positions = [];
var tower_index = 0;

var cur_level = levels[0];
loadMapData();

var endPoint = find_node( worldMap.mapGrid, 20 )
var base = new baseObject((endPoint.x*worldMap.tileWidth), ((endPoint.y+1) * worldMap.tileHeight), 85, 133);

window.addEventListener("mousemove", mouse.position);
window.addEventListener("mousedown", mouse.click);
//turn on build mode
document.addEventListener('keydown', function(event){
	if(event.keyCode == 84 && build_mode == false) // Keyboard 'T'
	{
		mouse.assignFunction(buildTower);
		build_indicator = new BuildIndicator(mouse, tower_positions, mouse.x, mouse.y, 85, 133);
		gameObjects.push(build_indicator);
		build_mode = true;
	}
});
// turn off build mode
document.addEventListener('keydown', function(event){
	if(event.keyCode == 78 && build_mode == true) // Keyboard 'N'
	{
		mouse.assignFunction(mouse.defaultFunction);
		build_indicator.to_be_removed = true;
		build_mode = false;
	}
});

gameObjects.push(base);
gameObjects.push( new TowerObject( "normal", 320, 320, 85, 133 ) );
gameObjects.push( new TowerObject( "normal", 250, 450, 85, 133 ) );

//var window_focused = true;
//window.onfocus = function() {
//    window_focused = true;
//};
//window.onblur = function() {
//    window_focused = false;
//};


cur_level.populate_timer = setInterval( function() {
    //if( document.hasFocus() )
        populateZombie();
    }, 5000 );

//gameObjects.push(new ZombieObject(0, 0, 128, 128));
function populateZombie()
{
    var start = get_start_location();
    console.log( "remaining zombies = " + cur_level.remaining_zombies );
    if( start != null ) {
        if( cur_level.remaining_zombies > 0 ) {
            // TODO : need to create zombies based on level data.
            var zombie = new ZombieObject( ["normal", "fast"][getRandom(2)], start.x, start.y, 128, 128);
            gameObjects.push(zombie);
            cur_level.remaining_zombies--;
        }
        else
        {
             clearInterval(cur_level.populate_timer);
            cur_level.populate_timer = null;
        }
    }
}

function buildTower()
{
	// check it is on road or not
	if(build_indicator.isValid == true)
	{
		// 5second build time
		var build_interval = 5000;
		gameObjects.push(new buildObject(build_interval, build_indicator.x,(build_indicator.y+worldMap.tileHeight), 85, 133));
		
		tower_positions.push(new Pos(build_indicator.x, build_indicator.y));
		
		setTimeout(function(){gameObjects.push(new TowerObject("normal", tower_positions[tower_index].x, (tower_positions[tower_index].y+worldMap.tileHeight), 85, 133)); tower_index++;}, build_interval);
		build_indicator.to_be_removed = true;
		build_mode = false;
		return true;
	}
	else
		return false;
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
    for( var i = 0; i < gameObjects.length; i++ )
    {
        gameObjects[i].update( Time.delta );
    }

    gameObjects = gameObjects.filter(function (obj) {
        return obj.to_be_removed === false;
    });

    // sort by y position to render properly
    gameObjects.sort( function(a, b){ return (a.y + a.height + a.z) - (b.y + b.height + b.z) } );
    //console.log( JSON.stringify(gameObjects));

    render();

	if(base.loop == true)
		requestAnimationFrame(update);
}

function render()
{
    // no need to clear context
    context.drawImage( worldMap.image, 0, 0 );
    // draw gameObjects
    for( var i = 0; i < gameObjects.length; i++ )
    {
        gameObjects[i].render( context );
    }

}

