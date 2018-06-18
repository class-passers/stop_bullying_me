var Button = function(buttonType)
{
	return Object.create(ButtonInfo[buttonType]);
}

var Indicator = function(indicatorType)
{
	return Object.create(IndicatorInfo[indicatorType]);
}

var ButtonInfo = {
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
	exit : {
		type : "button",
		name : "exit",
		x : 0,
		y : 0,
		width : 70,
		height : 70,
		visible : false,
		execute : null
	},
	build : {
		type : "button",
		name : "build",
		x : 1200,
		y : 100,
		width : 70,
		height : 70,
		visible : true,
		execute : null
	},
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
}

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
}