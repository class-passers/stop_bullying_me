var Button = function(buttonType)
{
	return Object.create(ButtonInfo[buttonType]);
};

var Indicator = function(indicatorType)
{
	return Object.create(IndicatorInfo[indicatorType]);
};

var ButtonInfo = {
	//pause game
	pause : {
		type : "button",
		name : "pause",
		x : 1200,
		y : 200,
		width : 70,
		height : 70,
		visible : false,
		execute : null
	},
	// next stage
	next : {
		type : "button",
		name : "next",
		x : 670,
		y : 400,
		width : 70,
		height : 70,
		visible : false,
		execute : null
	},
	// restart game
	replay : {
		type : "button",
		name : "replay",
		x : 540,
		y : 400,
		width : 70,
		height : 70,
		visible : false,
		execute : null
	},
	// exit build mode
	exit : {
		type : "button",
		name : "exit",
		x : 1200,
		y : 300,
		width : 70,
		height : 70,
		visible : true,
		execute : null
	},
	// turn on build mode
	build : {
		type : "button",
		name : "build",
        id : 0,
		x : 1200,
		y : 100,
		width : 70,
		height : 70,
		visible : true,
		execute : null
	},
    build2 : {
        type : "button",
        name : "build2",
        id : 1,
        x : 1200,
        y : 200,
        width : 70,
        height : 70,
        visible : true,
        execute : null
    },
	// resume game
	resume : {
		type : "button",
		name : "resume",
		x : 1200,
		y : 200,
		width : 70,
		height : 70,
		visible : false,
		execute : null
	}
};

var IndicatorInfo = {
	money : {
		type : "indicator",
		name : "money",
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
		width : 44,
		height : 40,
		txt_sign : "+",
		txt_x : 10,
		txt_y : -5,
		txt_color : 'yellow',
		txt_font : '48px Arial',
		interval : 1000
	}
};