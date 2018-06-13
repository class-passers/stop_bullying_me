
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

//var window_focused = true;
//window.onfocus = function() {
//    window_focused = true;
//};
//window.onblur = function() {
//    window_focused = false;
//};

var base = null;
var cur_level = null;
var cur_level_index = 0;
restartGame();
function restartGame()
{
    //cur_level_index = 0;
    startGame(cur_level_index);
}

function nextLevel()
{
    cur_level_index++;
    startGame(cur_level_index);
}

function startGame( level )
{
    cur_level = levels[level];

    loadMapData();
    populateZombie();

    console.log("start game, level = " + level + " : " + JSON.stringify(cur_level));

    if( base != null && base.earn_interval != null)
    {
        clearInterval(base.earn_interval);
    }

    gameObjects = [];

    var endPoint = find_node( worldMap.mapGrid, 20 );
    base = new baseObject(cur_level.start_money, (endPoint.x*worldMap.tileWidth), ((endPoint.y+1) * worldMap.tileHeight), 85, 133);
    base.earn_interval = setInterval(function(){base.earnMoney(1);}, 1000);
    gameObjects.push(base);
}

function populateZombie()
{
    cur_level.remaining_zombies = cur_level.num_zombies;

    for( var i = 0; i < cur_level.populate_zombie_info.length; i++ )
    {
        var pop_info = cur_level.populate_zombie_info[i];
        console.log("populate zombie: " + JSON.stringify(pop_info));
        pop_info.remaining = pop_info.amount;
        setTimeout( registerPopulateZombie, pop_info.start * 1000, pop_info, false );
    }

    for( var i = 0; i < cur_level.populate_boss_info.length; i++ )
    {
        var pop_info = cur_level.populate_boss_info[i];
        console.log("populate boss: " + JSON.stringify(pop_info));
        pop_info.remaining = pop_info.amount;
        setTimeout( registerPopulateZombie, pop_info.start * 1000, pop_info, true );
    }
}

function registerPopulateZombie( pop_info, is_boss )
{
    if( pop_info.timer != null )
    {
        clearInterval( pop_info.timer );
        console.log("clear timer = " + pop_info.timer );
    }

    pop_info.timer = setInterval( function()
        {
            var start = get_start_location();
            if( start != null ) {
                pop_info.remaining--;
                cur_level.remaining_zombies--;

                console.log( "creates " + pop_info.type + " at " + totalSec + ", remaining = " + pop_info.remaining + ", total remaining zombies = " + cur_level.remaining_zombies  );

                var zombie = new ZombieObject( pop_info.type, is_boss, start.x, start.y );
                gameObjects.push(zombie);

                if (pop_info.remaining <= 0) {
                    clearInterval(pop_info.timer);
                }
            }
        },
        pop_info.interval * 1000
    );
}

function buildTower()
{
	// check it is on road or not
	if(build_indicator.isValid == true && base.resource >= TowerInfo["normal"].cost)
	{
		base.spendMoney(TowerInfo["normal"].cost);
		
		gameObjects.push(new buildObject(TowerInfo["normal"].build_interval, build_indicator.x,(build_indicator.y+worldMap.tileHeight), 85, 133));
		
		tower_positions.push(new Pos(build_indicator.x, build_indicator.y));
		
		setTimeout(function(){gameObjects.push(new TowerObject("normal", tower_positions[tower_index].x, (tower_positions[tower_index].y+worldMap.tileHeight), 85, 133)); tower_index++;}, TowerInfo["normal"].build_interval);
		
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

