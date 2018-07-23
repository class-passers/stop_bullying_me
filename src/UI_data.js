var stateContainer = ["paused","win","lose"];
var ingameContainer = ["paused","win","lose","build","timer"];
var startContainer = ["start","level","credit"];
var credit_text = "Script Engineers : Younggi Kim, Maksim Tumazev, Beomjin Kim \nAudio Engineer : Younggi Kim, Maksim Tumazev, Beomjin Kim \nArtist : Younggi Kim, Maksim Tumazev, Beomjin Kim";

var Button = function(buttonType)
{
	return Object.create(ButtonInfo[buttonType]);
};

var Indicator = function(indicatorType)
{
	return Object.create(IndicatorInfo[indicatorType]);
};

var Container = function( containerType )
{
	return Object.create( ContainerInfo[containerType] );
};
var FindContainer = function(type)
{
	for(var i = 0; i < uiObjects.length; i++)
	{
		if(uiObjects[i].uiInfo.name === type)
			return uiObjects[i];
	}
};
var FindButton = function(type)
{
	for(var i = 0; i < uiObjects.length; i++)
	{
		if(uiObjects[i].uiInfo.type === "container")
		{
			for(var j = 0; j < uiObjects[i].childElements.length; j++)
			{
				if(uiObjects[i].childElements[j].uiInfo.name === type)
					return uiObjects[i].childElements[j]
			}
		}
		else
		{
			if(uiObjects[i].uiInfo.name === type)
				return uiObjects[i];
		}
	}
};

var ContainerInfo = {
	start : {
		type : "container",
		name : "start",
		x : 640,
		y : 330,
		buttons : ["startGame", "credit"],
		indicators : ["title"],
		visibility : true,
		uiLayer : 0,
		target_positions : null
	},
	level : {
		type : "container",
		name : "level",
		x : 640,
		y : 330,
		buttons : ["back"],
		indicators : ["levelSelectionTitle"],
		visibility : false,
		uiLayer : 0,
		target_positions : null
	},
	credit : {
		type : "container",
		name : "credit",
		x : 640,
		y : 330,
		buttons : ["back"],
		indicators : ["creditTitle"],
		visibility : false,
		uiLayer : 0,
		target_positions : null
	},
	timer : {//pause or control time scale
		type : "container",
		name : "timer",
		x : 0,
		y : 0,
		buttons : ["pause"],
		indicators : [],
		visibility : true,
		uiLayer : 0,
		target_positions : null
	},
	build : {
		type : "container",
		name : "build",
		x : 1200,
		y : 90,
		buttons : ["build","build2","build3"],
		indicators : [],
		visibility : true,
		uiLayer : 0,
		target_positions : null
	},
	paused : {
		type : "container",
		name : "paused",
		x : 640,
		y : 330,
		buttons : ["replay", "resume", "exit"],
		indicators : ["paused"],
		visibility : false,
		uiLayer : 2,
		target_positions : null
	},
	win : {
		type : "container",
		name : "win",
		x : 640,
		y : 330,
		buttons : ["replay","next", "exit"],
		indicators : ["win"],
		visibility : false,
		uiLayer : 2,
		target_positions : null
	},
	lose : {
		type : "container",
		name : "lose",
		x : 640,
		y : 330,
		buttons : ["replay", "exit"],
		indicators : ["lose"],
		visibility : false,
		uiLayer : 2,
		target_positions : null
	}
};

var ButtonInfo = {
	//Select a level
	levelSelection : {
		type : "button",
		name : "levelSelection",
		x : 0,
		y : 0,
		width : 70,
		height : 70,
		display_level : 0,
		visible : true,
		text : true,
		param : null,
		execute : null
	},
	// going to level selection
	startGame : {
		type : "button",
		name : "startGame",
		x : -180,
		y : 70,
		width : 360,
		height : 75,
		display_level : 0,
		visible : true,
		text : false,
		param : "level",
		execute : function(e){hideStartContainer(e);}
	},
	credit : {
		type : "button",
		name : "credit",
		x : -180,
		y : 190,
		width : 360,
		height : 75,
		display_level : 0,
		visible : true,
		text : false,
		param : "credit",
		execute : function(e){hideStartContainer(e);}
	},
	//going back to start menu
	back : {
		type : "button",
		name : "back",
		x : -630,
		y : -320,
		width : 70,
		height : 70,
		display_level : 0,
		visible : true,
		text : false,
		param : "start",
		execute : function(e){hideStartContainer(e);}
	},
	//pause game
	pause : {
		type : "button",
		name : "pause",
		x : 10,
		y : 10,
		width : 70,
		height : 70,
		display_level : 0,
		visible : true,
		text : false,
		param : null,
		execute : function(){pauseGame(); hideStateContainer("paused");}
	},
	// next stage
	next : {
		type : "button",
		name : "next",
		x : -35,
		y : 30,
		width : 70,
		height : 70,
		display_level : 0,
		visible : true,
		text : false,
		param : null,
		execute : function(){nextLevel(); hideStateContainer(null);}
	},
	// restart game
	replay : {
		type : "button",
		name : "replay",
		x : 80,
		y : 30,
		width : 70,
		height : 70,
		display_level : 0,
		visible : true,
		text : false,
		param : null,
		execute : function(){restartGame(); hideStateContainer(null);}
	},
	// exit build mode
	exit : {
		type : "button",
		name : "exit",
		x : -150,
		y : 30,
		width : 70,
		height : 70,
		display_level : 0,
		visible : true,
		text : false,
		param : null,
		execute : function(){deleteLevel(); cur_level = levels[0]; loadMapData();createStartMenu();}
	},
	// turn on build mode
	build : {
		type : "button",
		name : "build",
		x : 0,
		y : 0,
		width : 70,
		height : 70,
		display_level : 0,
		visible : true,
		text : false,
		param : "normal",
		execute : function(t){turnOnBuildMode(t);}
	},
    build2 : {
        type : "button",
        name : "build2",
        x : 0,
        y : 100,
        width : 70,
        height : 70,
		display_level : 0,
        visible : true,
        text : false,
        param : "ranged",
        execute : function(t){turnOnBuildMode(t);}
    },
    build3 : {
        type : "button",
        name : "build3",
        x : 0,
        y : 200,
        width : 70,
        height : 70,
		display_level : 1,
        visible : true,
        text : false,
        param : "wizard",
        execute : function(t){turnOnBuildMode(t);}
    },
	// resume game
	resume : {
		type : "button",
		name : "resume",
		x : -35,
		y : 30,
		width : 70,
		height : 70,
		display_level : 0,
		visible : true,
		text : false,
		param : null,
		execute : function(){resumeGame(); hideStateContainer(null);}
	}
};

var IndicatorInfo = {
	title : {
		type : "indicator",
		name : "title",
		x : -325,
		y : -120,
		width : 650,
		height : 190,
		txt_sign : "",
		txt_x : 0,
		txt_y : 0,
		txt_color : '',
		txt_font : '',
		interval : 0
	},
	locked : {
		type : "indicator",
		name : "locked",
		x : 0,
		y : 0,
		width : 70,
		height : 70,
		txt_sign : "",
		txt_x : 0,
		txt_y : 0,
		txt_color : '',
		txt_font : '',
		interval : 0
	},
	levelSelectionTitle : {
		type : "indicator",
		name : "levelSelectionTitle",
		x : -180,
		y : -300,
		width : 360,
		height : 75,
		txt_sign : "",
		txt_x : 0,
		txt_y : 0,
		txt_color : '',
		txt_font : '',
		interval : 0
	},
	creditTitle : {
		type : "indicator",
		name : "creditTitle",
		x : -180,
		y : -300,
		width : 360,
		height : 75,
		txt_sign : credit_text,
		txt_x : -800,
		txt_y : 200,
		txt_color : 'black',
		txt_font : '42px Comic Sans MS',
		interval : 0
	},
	money : {
		type : "indicator",
		name : "money",
		x : 1070,
		y : 10,
		width : 70,
		height : 70,
		txt_sign : "",
		txt_x : 20,
		txt_y : 10,
		txt_color : 'yellow',
		txt_font : '48px Arial',
		interval : 0
	},
	spend : {
		type : "indicator",
		name : "spend",
		x : 0,
		y : 0,
		width : 44,
		height : 40,
		txt_sign : "-",
		txt_x : 10,
		txt_y : -5,
		txt_color : 'yellow',
		txt_font : '48px Arial',
		interval : 1000
	},
	earn : {
		type : "indicator",
		name : "earn",
		x : 0,
		y : 0,
		width : 44,
		height : 40,
		txt_sign : "+",
		txt_x : 10,
		txt_y : -5,
		txt_color : 'yellow',
		txt_font : '48px Arial',
		interval : 1000
	},
	paused : {
		type : "indicator",
		name : "paused",
		x : -150,
		y : -150,
		width : 300,
		height : 150,
		txt_sign : "",
		txt_x : 0,
		txt_y : 0,
		txt_color : '',
		txt_font : '',
		interval : 0
	},
	win : {
		type : "indicator",
		name : "win",
		x : -150,
		y : -150,
		width : 300,
		height : 150,
		txt_sign : "",
		txt_x : 0,
		txt_y : 0,
		txt_color : '',
		txt_font : '',
		interval : 0
	},
	lose : {
		type : "indicator",
		name : "lose",
		x : -150,
		y : -150,
		width : 300,
		height : 150,
		txt_sign : "",
		txt_x : 0,
		txt_y : 0,
		txt_color : '',
		txt_font : '',
		interval : 0
	}
};

function createIngameUI()
{
	for(var i = 0; i < ingameContainer.length; i++)
	{
		var temp = new ContainerObject(ingameContainer[i]);
		uiObjects.push(temp);
	}
}

function createMoneyIndicator(type, value, pos_x, pos_y)
{
	IndicatorInfo[type].x = pos_x;
	IndicatorInfo[type].y = pos_y;
	var temp = new IndicatorOjbect(null, type, value);
}

function hideStateContainer(except)
{
	for(var i = 0; i < stateContainer.length; i++)
	{
		if(stateContainer[i] !== except)
		{
			FindContainer(stateContainer[i]).isVisible = false;
		}
		else
		{
			FindContainer(stateContainer[i]).isVisible = true;
			mouse.uiLayer = FindContainer(stateContainer[i]).uiLayer;
		}

	}
	if(except == null)
		mouse.uiLayer = 0;
}

////////// Start menu control
function createStartMenu()
{
	var start = new ContainerObject("start");
	var level = new ContainerObject("level");
	for(var i = 0; i < levels.length; i++)
	{
		var temp;
		if(i <= cleared_level)
		{
			temp = new ButtonObject(level, "levelSelection");
			temp.uiInfo.param = i;
			temp.execute = function(level)
			{
				cur_level_index = level;
				restartGame();
			}
		}
		else
		{
			temp = new IndicatorOjbect(level, "locked", null);
		}
		var gap = 100;
		var start_x = (((levels.length/2)*gap)+((levels.length/2)*temp.width));
		temp.x = start_x + ((i+1)*(temp.width + gap));
		level.childElements.push(temp);
	}

	var credit = new ContainerObject("credit");

	uiObjects.push(start);
	uiObjects.push(level);
	uiObjects.push(credit);
	mouse.ui = uiObjects;
	mouse.uiLayer = 0;
}

function startMenu()//create start menu and hide other scenes
{
    createStartMenu();
    FindContainer("start").isVisible = true;
    FindContainer("level").isVisible = false;
    FindContainer("credit").isVisible = false;
    mouse.ui = uiObjects;
	mouse.uiLayer = 0;
}

function hideStartContainer(except)
{
	for(var i = 0; i < startContainer.length; i++)
	{
		if(startContainer[i] !== except)
		{
			FindContainer(startContainer[i]).isVisible = false;
		}
		else
		{
			FindContainer(startContainer[i]).isVisible = true;
		}
	}
	mouse.uiLayer = 0;
}
