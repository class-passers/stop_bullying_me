var stateContainer = ["paused","win","lose"];
var ingameContainer = ["paused","win","lose","build","timer"];
var startContainer = ["start","level","credit"];
var credit_text = "Younggi Kim \nMaksim Tumazev \nBeomjin Kim";


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
		buttons : ["pause","time_double","time_half","time_default"],
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
		buttons : ["build1","build2","build3","buildCancel"],
		indicators : ["build1Disabled","build2Disabled","build3Disabled"],
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
	time_double : {
		type : "button",
		name : "time_double",
		x : 110,
		y : 10,
		width : 70,
		height : 70,
		display_level : 0,
		visible : true,
		text : false,
		param : 2,
		execute : function(p){Time.TimeScale(p); hideTimerButton("time_half");}
	},
	time_half : {
		type : "button",
		name : "time_half",
		x : 110,
		y : 10,
		width : 70,
		height : 70,
		display_level : 0,
		visible : false,
		text : false,
		param : 0.5,
		execute : function(p){Time.TimeScale(p); hideTimerButton("time_default");}
	},
	time_default : {
		type : "button",
		name : "time_default",
		x : 110,
		y : 10,
		width : 70,
		height : 70,
		display_level : 0,
		visible : false,
		text : false,
		param : 1,
		execute : function(p){Time.TimeScale(p); hideTimerButton("time_double");}
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
	// exit to start menu
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
		execute : function(){deleteLevel(); cur_level = levels[0]; loadMapData();startMenu();}
	},
	// turn on build mode
	build1 : {
		type : "button",
		name : "build1",
		x : 0,
		y : 0,
		width : 70,
		height : 90,
		display_level : 0,
		visible : true,
		text : false,
		param : "normal",
		execute : function(t){buildButtonToggleOff();turnOnBuildMode(t);buildButtonToggleOn("build1");}
	},
    build2 : {
        type : "button",
        name : "build2",
        x : 0,
        y : 100,
        width : 70,
        height : 90,
		display_level : 0,
        visible : true,
        text : false,
        param : "ranged",
        execute : function(t){buildButtonToggleOff();turnOnBuildMode(t);buildButtonToggleOn("build2");}
    },
    build3 : {
        type : "button",
        name : "build3",
        x : 0,
        y : 200,
        width : 70,
        height : 90,
		display_level : 1,
        visible : true,
        text : false,
        param : "wizard",
        execute : function(t){buildButtonToggleOff();turnOnBuildMode(t);buildButtonToggleOn("build3");}
    },
	buildCancel : {
        type : "button",
        name : "buildCancel",
        x : 0,
        y : 0,
        width : 70,
        height : 90,
		display_level : 0,
        visible : false,
        text : false,
        param : "",
        execute : function(t){turnOffBuildMode();buildButtonToggleOff();}
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
	build1Disabled : {
		type : "indicator",
		name : "build1Disabled",
		x : 0,
		y : 0,
		width : 70,
		height : 70,
		visibility : false,
		txt_sign : "",
		txt_x : 0,
		txt_y : 0,
		txt_color : '',
		txt_font : '',
		interval : 0
	},
	build2Disabled : {
		type : "indicator",
		name : "build2Disabled",
		x : 0,
		y : 100,
		width : 70,
		height : 70,
		visibility : false,
		txt_sign : "",
		txt_x : 0,
		txt_y : 0,
		txt_color : '',
		txt_font : '',
		interval : 0
	},
	build3Disabled : {
		type : "indicator",
		name : "build3Disabled",
		x : 0,
		y : 200,
		width : 70,
		height : 70,
		visibility : false,
		txt_sign : "",
		txt_x : 0,
		txt_y : 0,
		txt_color : '',
		txt_font : '',
		interval : 0
	},
	title : {
		type : "indicator",
		name : "title",
		x : -325,
		y : -120,
		width : 650,
		height : 190,
		visibility : true,
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
		visibility : true,
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
		visibility : true,
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
		visibility : true,
		txt_sign : credit_text,
		txt_x : -400,
		txt_y : 150,
		txt_color : 'black',
		txt_font : '70px Comic Sans MS',
		interval : 0
	},
	money : {
		type : "indicator",
		name : "money",
		x : 1070,
		y : 10,
		width : 70,
		height : 70,
		visibility : true,
		txt_sign : "",
		txt_x : 20,
		txt_y : 10,
		txt_color : 'yellow',
		txt_font : '48px Arial',
		interval : 0
	},
	cost : {
		type : "indicator",
		name : "cost",
		x : 10,
		y : 74,
		width : 10,
		height : 10,
		visibility : true,
		txt_sign : "",
		txt_x : 10,
		txt_y : -2,
		txt_color : 'yellow',
		txt_font : '13px Arial',
		interval : 0
	},
	spend : {
		type : "indicator",
		name : "spend",
		x : 0,
		y : 0,
		width : 44,
		height : 40,
		visibility : true,
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
		visibility : true,
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
		visibility : true,
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
		visibility : true,
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
		visibility : true,
		txt_sign : "",
		txt_x : 0,
		txt_y : 0,
		txt_color : '',
		txt_font : '',
		interval : 0
	}
};