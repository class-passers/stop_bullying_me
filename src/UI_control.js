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
				if(uiObjects[i].childElements[j].uiInfo.name === type &&
				uiObjects[i].childElements[j].uiInfo.type === "button")
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
var FindIndicator = function(type)
{
	for(var i = 0; i < uiObjects.length; i++)
	{
		if(uiObjects[i].uiInfo.type === "container")
		{
			for(var j = 0; j < uiObjects[i].childElements.length; j++)
			{
				if(uiObjects[i].childElements[j].uiInfo.name === type &&
				uiObjects[i].childElements[j].uiInfo.type === "indicator")
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


////////// Start menu control
function createStartMenu()
{
	for(var i = 0; i < startContainer.length; i++)
	{
		uiObjects.push(new ContainerObject(startContainer[i]));
	}
	var level = FindContainer("level");
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
				//hideStartContainer("side");
				restartGame();
			}
		}
		else
		{
			temp = new IndicatorObject(level, "locked", null);
		}
		var gap = 100;
		var start_x = (((levels.length/2)*gap)+((levels.length/2)*temp.width));
		temp.x = start_x + ((i+1)*(temp.width + gap));
		level.childElements.push(temp);
	}

	mouse.ui = uiObjects;
	mouse.uiLayer = 0;
}

function startMenu()//create start menu and hide other scenes
{
    createStartMenu();
    hideStartContainer("start");
	cur_game_state = gameStatus.startMenu;
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


//////////	In-game UI control
function createIngameUI()
{
	for(var i = 0; i < ingameContainer.length; i++)
	{
		var temp = new ContainerObject(ingameContainer[i]);
		uiObjects.push(temp);
	}
	
	for(var i = 1; i <= FindContainer("build").uiInfo.indicators.length; i++)
	{
		var temp_button = FindButton("build"+i.toString());
		if(temp_button.uiInfo.display_level <= cur_level_index)
		{
			var temp = new IndicatorObject(FindContainer("build"), "cost", TowerInfo[temp_button.uiInfo.param].cost);
			console.log(temp.txt);
			temp.x = temp_button.x + IndicatorInfo["cost"].x;
			temp.y = temp_button.y + IndicatorInfo["cost"].y;
			temp.txt_x = temp.x+IndicatorInfo["cost"].width+IndicatorInfo["cost"].txt_x;
			temp.txt_y = temp.y+IndicatorInfo["cost"].txt_y;
			//temp.txt_x = temp.x+10;
			//temp.txt_y = temp.y-2;
			FindContainer("build").childElements.push(temp);
		}
	}
}
function buildButtonToggleOn(type)
{
	var build = FindButton(type);
	var toggle = FindButton("buildCancel");

	toggle.x = build.x;
	toggle.y = build.y;
	toggle.curImage = buttonImages[type].pressed.image;
	buttonImages["buildCancel"] = buttonImages[type];
	toggle.uiInfo.param = type;
	toggle.showUp();
	build.isVisible = false;
}
function buildButtonToggleOff()
{
	for(var i = 0; i < FindContainer("build").uiInfo.buttons.length; i++)
	{
		if(FindContainer("build").uiInfo.buttons[i] === "buildCancel")
		{
			FindButton(FindContainer("build").uiInfo.buttons[i]).isVisible = false;
		}
		else
		{
			var temp = FindButton(FindContainer("build").uiInfo.buttons[i]);
			temp.showUp();
			if(temp.uiInfo.display_level > cur_level_index)
				temp.isVisible = false;
		}
	}
}
function createMoneyIndicator(type, value, pos_x, pos_y)
{
	IndicatorInfo[type].x = pos_x;
	IndicatorInfo[type].y = pos_y;
	var temp = new IndicatorObject(null, type, value);
	
	uiObjects.push(temp);
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

function hideTimerButton(except)
{
	for(var i = 0; i < ContainerInfo["timer"].buttons.length; i++)
	{
		if(ContainerInfo["timer"].buttons[i] !== except &&
		ContainerInfo["timer"].buttons[i] !== "pause")
		{
			FindButton(ContainerInfo["timer"].buttons[i]).isVisible = false;
		}
		else
		{
			FindButton(ContainerInfo["timer"].buttons[i]).showUp();
		}
	}
}