
var canvas = document.querySelector("#game_frame");
canvas.width = 1000;
canvas.height = 800;

var context = canvas.getContext("2d");

var gameObjects = [];
var uiObjects = [];
addUIButtons();
var tower_positions = [];

var cur_level = null;
var cur_level_index = 0;

var base = null;
var mouse = new mouseObject(canvas, uiObjects);
var money_indicator = null;
var build_indicator = null;
var build_mode = false;
var tower_index = 0;

var Time = {
    last : new Date().getTime(),
    now : null,
    delta : 0
};

window.addEventListener("mousemove", mouse.position);
window.addEventListener("mousedown", mouse.down);
window.addEventListener("mouseup", mouse.up);

//turn on build mode
function turnOnBuildMode()
{
	if(build_mode == false)
	{
		mouse.assignFunction(buildTower);
		build_indicator = new BuildIndicator(mouse, tower_positions, base, mouse.x, mouse.y, 85, 133);
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
function addUIButtons()
{
	ButtonInfo["next"].execute = nextLevel;
	ButtonInfo["replay"].execute = restartGame;
	ButtonInfo["build"].execute = turnOnBuildMode;
	ButtonInfo["pause"].execute = pauseGame;
	ButtonInfo["resume"].execute = resumeGame;
	ButtonInfo["exit"].execute = turnOffBuildMode;
	
	for(var type in ButtonInfo)
	{
		uiObjects.push(new ButtonObject(ButtonInfo[type].name, ButtonInfo[type].visible));
	}
}
function hideUIButtons()
{
	//hide all ui buttons except build button
	for(var i = 0; i < uiObjects.length; i++)
	{
		if(uiObjects[i].uiInfo.type == "button" && uiObjects[i].uiInfo.name != "build" && uiObjects[i].uiInfo.name != "exit")
			uiObjects[i].isVisible = false;
	}
}
function createEarnIndicator(earn, x, y)
{
	uiObjects.push(new IndicatorObject("earn", x, y, earn));
}
//var window_focused = true;
//window.onfocus = function() {
//    window_focused = true;
//};
//window.onblur = function() {
//    window_focused = false;
//};


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
function pauseGame()
{
    base.isPaused = true;
	clearInterval(base.earn_interval);
	gameLoop = null;
}
function resumeGame()
{
    base.isPaused = false;
    base.gameStatus = gameStatus.playing;

	base.earn_interval = setInterval(function(){base.earnMoney(1);}, 1000);
	
	requestAnimationFrame(update);
}
function startGame( level )
{
    // delete existing level
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
	mouse.assignFunction(function(){console.log("Does nothing");})
	turnOffBuildMode();
    gameObjects = [];
    tower_positions = [];
    tower_index = 0;
	hideUIButtons();

    // create new level
    cur_level = levels[level];
    loadMapData();
    populateZombie();

    var endPoint = find_node( worldMap.mapGrid, 20 );
    base = new baseObject((endPoint.x*worldMap.tileWidth), ((endPoint.y+1) * worldMap.tileHeight) );
    gameObjects.push(base);
	uiObjects.push(base.resource_indicator);
	
	resumeGame();
}

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

function buildTower()
{
	// check it is on road or not
	if(build_indicator.isValid == true &&
		mouse.interacting_button == null)
	{
	    var tower_type = "normal";
		uiObjects.push(new IndicatorObject("spend", build_indicator.x, (build_indicator.y-150), TowerInfo["normal"].cost));
		base.spendMoney(TowerInfo[tower_type].cost);

		gameObjects.push( new BuildObject( TowerInfo[tower_type].build_interval,
            build_indicator.x, build_indicator.y + worldMap.tileHeight,
            TowerInfo[tower_type].width, TowerInfo[tower_type].height ) );
		
		tower_positions.push( new Pos(build_indicator.x, build_indicator.y) );

        build_indicator.buildTimer = setTimeout(
            function(){
                var tower = new TowerObject(tower_type, tower_positions[tower_index].x, (tower_positions[tower_index].y+worldMap.tileHeight) );
                gameObjects.push( tower );
                tower_index++;
                gameObjects.push( new HumanObject( tower_type, tower, base.x, base.y ) );
                },
            TowerInfo[tower_type].build_interval);
		
		build_indicator.to_be_removed = true;
		build_mode = false;
		return true;
	}
	else
		return false;
}

function update()
{
    Time.now = new Date().getTime();
    Time.delta = (Time.now - Time.last) / 1000;
    Time.last = Time.now;
    //console.log( "delta = " + Time.delta );

    if( base.gameStatus === gameStatus.playing ) {
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
		uiObjects[i].render(context);
	}
	//requestAnimationFrame(render);

    if( base.isPaused === true )
    {
        if( base.gameStatus === gameStatus.won )
        {
            this.drawText("You won !");
        }
        else if( base.gameStatus === gameStatus.lost )
        {
            this.drawText("You lost.");
        }
    }
}

function drawText( message )
{
    context.font = "30px Comic Sans MS";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText( message, canvas.width / 2, canvas.height / 2 - 20 );
}
