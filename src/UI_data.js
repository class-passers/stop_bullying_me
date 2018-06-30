var Button = function(buttonType)
{
	return Object.create(ButtonInfo[buttonType]);
}

var Indicator = function(indicatorType)
{
	return Object.create(IndicatorInfo[indicatorType]);
}

var Container = function( containerType )
{
	return Object.create( ContainerInfo[containerType] );
}
var FindContainer = function(type)
{
	for(var i = 0; i < uiObjects.length; i++)
	{
		if(uiObjects[i].uiInfo.name == type)
			return uiObjects[i];
	}
}
var FindButton = function(type)
{
	for(var i = 0; i < uiObjects.length; i++)
	{
		if(uiObjects[i].uiInfo.type == "container")
		{
			for(var j = 0; j < uiObjects[i].childElements.length; j++)
			{
				if(uiObjects[i].childElements[j].uiInfo.name == type)
					return uiObjects[i].childElements[j]
			}
		}
		else
		{
			if(uiObjects[i].uiInfo.name == type)
				return uiObjects[i];
		}
	}
}
var ContainerInfo = {
	timer : {//pause or control time scale
		type : "container",
		name : "timer",
		x : 0,
		y : 0,
		visibility : true,
		uiLayer : 0,
		target_positions : [new Pos(0,0), new Pos(0,0)]
	},
	tab : {
		type : "container",
		name : "tab",
		x : -320,
		y : 0,
		visibility : true,
		uiLayer : 0,
		target_positions : [new Pos(-320,0), new Pos(0,0)]
	},
	paused : {
		type : "container",
		name : "paused",
		x : 640,
		y : 330,
		visibility : false,
		uiLayer : 2,
		target_positions : [new Pos(0,0), new Pos(0,0)]
	},
	win : {
		type : "container",
		name : "win",
		x : 640,
		y : 330,
		visibility : false,
		uiLayer : 2,
		target_positions : [new Pos(0,0), new Pos(0,0)]
	},
	lose : {
		type : "container",
		name : "lose",
		x : 640,
		y : 330,
		visibility : false,
		uiLayer : 2,
		target_positions : [new Pos(0,0), new Pos(0,0)]
	}
}

var ButtonInfo = {
	//pause game
	pause : {
		type : "button",
		name : "pause",
		x : 10,
		y : 10,
		width : 70,
		height : 70,
		visible : true,
		param : null,
		execute : null
	},
	// next stage
	next : {
		type : "button",
		name : "next",
		x : -35,
		y : 30,
		width : 70,
		height : 70,
		visible : true,
		param : null,
		execute : null
	},
	// restart game
	replay : {
		type : "button",
		name : "replay",
		x : 80,
		y : 30,
		width : 70,
		height : 70,
		visible : true,
		param : null,
		execute : null
	},
	// exit build mode
	exit : {
		type : "button",
		name : "exit",
		x : -150,
		y : 30,
		width : 70,
		height : 70,
		visible : true,
		param : null,
		execute : null
	},
	// turn on build mode
	build : {
		type : "button",
		name : "build",
		x : 40,
		y : 40,
		width : 70,
		height : 70,
		visible : true,
		param : null,
		execute : null
	},
	// resume game
	resume : {
		type : "button",
		name : "resume",
		x : -35,
		y : 30,
		width : 70,
		height : 70,
		visible : true,
		param : null,
		execute : null
	},
	tabOut : {
		type : "button",
		name : "tabOut",
		x : 320,
		y : 234,
		width : 66,
		height : 192,
		visible : true,
		param : 1,
		execute : null
	},
	tabIn : {
		type : "button",
		name : "tabIn",
		x : 320,
		y : 234,
		width : 66,
		height : 192,
		visible : false,
		param : 0,
		execute : null
	}
}

var IndicatorInfo = {
	money : {
		type : "indicator",
		name : "money",
		x : 0,
		y : 0,
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
	tab : {
		type : "indicator",
		name : "tab",
		x : 0,
		y : 0,
		width : 320,
		height : 660,
		txt_sign : "",
		txt_x : 0,
		txt_y : 0,
		txt_color : 'yellow',
		txt_font : '48px Arial',
		interval : 0
	},
	paused : {
		type : "indicator",
		name : "paused",
		x : 0,
		y : 0,
		width : 300,
		height : 150,
		txt_sign : "",
		txt_x : 0,
		txt_y : 0,
		txt_color : 'yellow',
		txt_font : '48px Arial',
		interval : 0
	},
	win : {
		type : "indicator",
		name : "win",
		x : 0,
		y : 0,
		width : 300,
		height : 150,
		txt_sign : "",
		txt_x : 0,
		txt_y : 0,
		txt_color : 'yellow',
		txt_font : '48px Arial',
		interval : 0
	},
	lose : {
		type : "indicator",
		name : "lose",
		x : 0,
		y : 0,
		width : 300,
		height : 150,
		txt_sign : "",
		txt_x : 0,
		txt_y : 0,
		txt_color : 'yellow',
		txt_font : '48px Arial',
		interval : 0
	}
}
function createEarnIndicator(earn, x, y)
{
	uiObjects.push(new IndicatorOjbect(null, "earn", x, y, earn));
}
function createIngameUI()
{
	var timer = new ContainerObject("timer");
	ButtonInfo["pause"].execute = pauseGame;
	timer.childElements.push(new ButtonObject(timer, "pause"));
	
	var tab = new ContainerObject("tab");
	ButtonInfo["tabOut"].execute = function(l){
		tab.movingOn(l); 
		FindButton("tabOut").isVisible = false;
		FindButton("tabIn").isVisible = true;
	};
	ButtonInfo["tabIn"].execute = function(l){
		tab.movingOn(l); 
		FindButton("tabIn").isVisible = false;
		FindButton("tabOut").isVisible = true;
	};
	ButtonInfo["build"].execute = function(){
		turnOnBuildMode();
		FindContainer("tab").movingOn(FindButton("tabIn").uiInfo.param);
		FindButton("tabIn").isVisible = false;
		FindButton("tabOut").isVisible = true;
	};
	tab.childElements.push(new IndicatorOjbect(tab, "tab", 0, 0, null));
	tab.childElements.push(new ButtonObject(tab, "tabOut"));
	tab.childElements.push(new ButtonObject(tab, "tabIn"));
	tab.childElements.push(new ButtonObject(tab, "build"));
	
	
	var paused = new ContainerObject("paused");
	ButtonInfo["exit"].execute = exitGame;
	ButtonInfo["resume"].execute = resumeGame;
	ButtonInfo["replay"].execute = restartGame;
	paused.childElements.push(new IndicatorOjbect(paused, "paused", -150, -150, null));
	paused.childElements.push(new ButtonObject(paused, "resume"));
	paused.childElements.push(new ButtonObject(paused, "replay"));
	paused.childElements.push(new ButtonObject(paused, "exit"));
	
	var win = new ContainerObject("win");
	ButtonInfo["exit"].execute = exitGame;
	ButtonInfo["next"].execute = nextLevel;
	ButtonInfo["replay"].execute = restartGame;
	win.childElements.push(new IndicatorOjbect(win, "win", -150, -150, null));
	win.childElements.push(new ButtonObject(win, "next"));
	win.childElements.push(new ButtonObject(win, "replay"));
	win.childElements.push(new ButtonObject(win, "exit"));
	
	var lose = new ContainerObject("lose");
	ButtonInfo["exit"].execute = exitGame;
	ButtonInfo["replay"].execute = restartGame;
	lose.childElements.push(new IndicatorOjbect(lose, "lose", -150, -150, null));
	lose.childElements.push(new ButtonObject(lose, "replay"));
	lose.childElements.push(new ButtonObject(lose, "exit"));
	
	uiObjects.push(timer);
	uiObjects.push(tab);
	uiObjects.push(paused);
	uiObjects.push(win);
	uiObjects.push(lose);
}
function hideStateContainer()
{
	FindContainer("paused").isVisible = false;
	FindContainer("win").isVisible = false;
	FindContainer("lose").isVisible = false;
	mouse.uiLayer = 0;
}