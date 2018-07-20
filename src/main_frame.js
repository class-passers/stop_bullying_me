
var canvas = document.querySelector("#game_frame");
canvas.width = 1000;
canvas.height = 800;

var context = canvas.getContext("2d");

var gameObjects = [];
var uiObjects = [];
var tower_positions = [];

var cur_level = null;
var cur_level_index = 0;
var cleared_level = 0;
var cur_game_state = gameStatus.playing;
var base = null;
var mouse = new mouseObject(canvas);
var money_indicator = null;
var build_indicator = null;
var build_mode = false;
var tower_index = 0;

var Time = {
    last : new Date().getTime(),
    now : null,
    delta : 0
};

//var window_focused = true;
window.addEventListener("mousedown", function() {
    //window_focused = true;
    if( music.bgm_played === false ) {
        music.bgm.play();
        music.bgm_played = true;
    }
} );
//window.onblur = function() {
//    window_focused = false;
//};
window.addEventListener("mousemove", mouse.position);
window.addEventListener("mousedown", mouse.down);
window.addEventListener("mouseup", mouse.up);


////////// Game state control
function deleteLevel()
{
    console.log("Delete current level");		
    if( base != null)
    {
        clearInterval(base.earn_interval);
		base.resource_indicator.to_be_removed = true;
    }
    base = null;
    if( build_indicator !== null && build_indicator.buildTimer !== null )
    {
        clearTimeout( build_indicator.buildTimer );
    }
	mouse.assignFunction( function(){console.log("Does nothing");} );
	turnOffBuildMode();
    gameObjects = [];
	uiObjects = [];
    tower_positions = [];
    tower_index = 0;

    //clear all interval
}
function restartGame()
{
    //cur_level_index = 0;
    startGame(cur_level_index);
}

function nextLevel()
{
    cur_level_index++;
    //cleared_level = cur_level_index;
    startGame(cur_level_index);
}
function pauseGame()
{
    base.isPaused = true;
	cur_game_state = gameStatus.paused;
	clearInterval(base.earn_interval);
}
function resumeGame()
{
    base.isPaused = false;
    cur_game_state = gameStatus.playing;

	base.earn_interval = setInterval(function(){base.earnMoney(1);}, 1000);
}
function startGame( level )
{
    // delete existing level
    deleteLevel();

    // create new level
    cur_level = levels[level];
    loadMapData();
    populateZombie();
	createIngameUI();
    var endPoint = find_node( worldMap.mapGrid, 20 );
    base = new baseObject((endPoint.x*worldMap.tileWidth), ((endPoint.y+1) * worldMap.tileHeight) );
    gameObjects.push(base);
	uiObjects.push(base.resource_indicator);
	mouse.ui = uiObjects;
	resumeGame();
}

/////// Create zombie
function populateZombie()
{
    cur_level.remaining_zombies = cur_level.num_zombies;

    for( var i = 0; i < cur_level.populate_zombie_info.length; i++ )
    {
        var pop_info = cur_level.populate_zombie_info[i];
        //console.log("populate zombie: " + JSON.stringify(pop_info));
        pop_info.remaining = pop_info.amount;
        setTimeout( registerPopulateZombie, pop_info.start * 1000, pop_info, false );
    }

    for( var i = 0; i < cur_level.populate_boss_info.length; i++ )
    {
        var pop_info = cur_level.populate_boss_info[i];
        //console.log("populate boss: " + JSON.stringify(pop_info));
        pop_info.remaining = pop_info.amount;
        setTimeout( registerPopulateZombie, pop_info.start * 1000, pop_info, true );
    }
}
function registerPopulateZombie( pop_info, is_boss )
{
    if( pop_info.timer != null )
    {
        clearInterval( pop_info.timer );
        //console.log("clear timer = " + pop_info.timer );
    }

    pop_info.timer = setInterval( function()
        {
            var start = get_start_location();
            if( start != null ) {
                pop_info.remaining--;
                cur_level.remaining_zombies--;

                if( is_boss )
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

//////// build mode control
function turnOnBuildMode(tower_type)
{
	if(build_mode == false)
	{
		mouse.assignFunction(buildTower);
		build_indicator = new BuildIndicator(tower_type, mouse, tower_positions, base, mouse.x, mouse.y, 85, 133);
		gameObjects.push(build_indicator);
		build_mode = true;
	}
}
function turnOffBuildMode()
{
	if(build_mode == true)
	{
		mouse.assignFunction(mouse.defaultFunction);
		build_indicator.to_be_removed = true;
		build_mode = false;
	}
}
function buildTower()
{
	// check it is on road or not
	if(build_indicator.isValid == true &&
		mouse.interacting_button == null)
	{
	    var towerType = build_indicator.towerType;
		createMoneyIndicator("spend", TowerInfo[towerType].cost, build_indicator.x, (build_indicator.y-150));
		base.spendMoney(TowerInfo[towerType].cost);

		gameObjects.push( new BuildObject( towerType, TowerInfo[towerType].build_interval,
            build_indicator.x, build_indicator.y + worldMap.tileHeight,
            TowerInfo[towerType].width, TowerInfo[towerType].height ) );
		console.log("build indicator at " + build_indicator.x + ", " + build_indicator.y );
		tower_positions.push( new Pos(build_indicator.x, build_indicator.y) );
        tower_index++;

        music.buildSound.play();
		build_indicator.to_be_removed = true;
		build_mode = false;
		return true;
	}
	else
		return false;
}


////////// Game loop
function update()
{
    Time.now = new Date().getTime();
    Time.delta = (Time.now - Time.last) / 1000;
    Time.last = Time.now;
    //console.log( "delta = " + Time.delta );

    if( cur_game_state === gameStatus.playing ) {
        //if( document.hasFocus() === false )
        //    return;
        for (var i = 0; i < gameObjects.length; i++) {
            //console.log("["+i+"]: "+JSON.stringify(gameObjects[i]));
            gameObjects[i].update(Time.delta);
        }
        gameObjects = gameObjects.filter(function (obj) {
            return obj.to_be_removed === false;
        });
        // sort by y position to render properly
        gameObjects.sort(function (a, b) {
            return (a.y + a.height + a.z) - (b.y + b.height + b.z)
        });
        //console.log( JSON.stringify(gameObjects));
    }

	for(var i = 0; i < uiObjects.length; i++)
	{
		uiObjects[i].update( Time.delta);
	}

	uiObjects = uiObjects.filter(function (obj) {
        return obj.to_be_removed === false;
    });

    render();

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
	
	for(var i = 0; i < uiObjects.length; i++)
	{
		uiObjects[i].render(context)
	}
}

function drawText( message )
{
    context.font = "30px Comic Sans MS";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText( message, canvas.width / 2, canvas.height / 2 - 20 );
}
