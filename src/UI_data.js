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
		name : "pause",
		width : 70,
		height : 70,
		visible : false,
		execute : null
	},
	next : {
		name : "next",
		width : 70,
		height : 70,
		visible : false,
		execute : null
	},
	replay : {
		name : "replay",
		width : 70,
		height : 70,
		visible : false,
		execute : null
	},
	exit : {
		name : "exit",
		width : 70,
		height : 70,
		visible : false,
		execute : null
	},
	build : {
		name : "build",
		width : 70,
		height : 70,
		param : null,
		visible : true,
		execute : null
	},
	resume : {
		name : "resume",
		width : 70,
		height : 70,
		visible : false,
		execute : null
	}
}

var IndicatorInfo = {
	money : {
		name : "money",
		width : 70,
		height : 70,
		txt_sign : "",
		txt_x : 20,
		txt_y : 0,
		txt_color : 'yellow',
		txt_font : '48px Arial',
		interval : 0
	},
	spend : {
		name : "spend",
		width : 44,
		height : 40,
		txt_sign : "-",
		txt_x : 10,
		txt_y : 0,
		txt_color : 'yellow',
		txt_font : '48px Arial',
		interval : 1500
	},
	earn : {
		name : "earn",
		width : 44,
		height : 40,
		txt_sign : "+",
		txt_x : 10,
		txt_y : 0,
		txt_color : 'yellow',
		txt_font : '48px Arial',
		interval : 1500
	}
}