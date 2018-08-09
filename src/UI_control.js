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

function changeSideSprite(defender, isOn)
{
	if(isOn == true)
	{
		FindIndicator("side"+defender+"Idle").isVisible = false;
		FindIndicator("side"+defender+"Attack").isVisible = true;
	}
	else
	{
		FindIndicator("side"+defender+"Idle").isVisible = true;
		FindIndicator("side"+defender+"Attack").isVisible = false;
	}
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

function towerTooltipOn(towerType)
{
	var tooltip = FindContainer("tooltip");
	var tooltipBackground = FindIndicator("tooltipBackground");
	var damage = FindIndicator("tooltipDamage");
	var range = FindIndicator("tooltipRange");
	var speed = FindIndicator("tooltipSpeed");
	tooltip.position.x = (mouse.x+tooltipBackground.width)>canvas.width?(mouse.x-tooltipBackground.width):mouse.x;
	tooltip.position.y = mouse.y;
	
	tooltipBackground.setPositionAgain();
	damage.setPositionAgain();
	range.setPositionAgain();
	speed.setPositionAgain();
	
	if(attacker_type === "human")
	{
		damage.txt = ZombieInfo[towerType].attackPower.toString();
		range.txt = ZombieInfo[towerType].attackRange.toString();
		speed.txt = ZombieInfo[towerType].attackSpeed.toString()+"/s";
	}
	else
	{
		damage.txt = HumanTroopInfo[towerType].attackPower.toString();
		range.txt = HumanTroopInfo[towerType].attackRange.toString();
		speed.txt = HumanTroopInfo[towerType].attackSpeed.toString()+"/s";
	}
	
	
	tooltip.isVisible = true;
}
function towerTooltipOff()
{
	FindContainer("tooltip").isVisible = false;
}

//////////////////	Tutorial
function showTutorial(role, side, index)
{
	if(!is_cleared_before())
	{
		turnOffBuildMode();
		pauseGame();
		var tutorial = FindContainer("tutorial");
		
		uiObjects.splice(uiObjects.indexOf(tutorial),1);
		uiObjects.push(tutorial);

		tutorial.isVisible = true;
		var name = "tutorial_"+role+"_"+side+"_"+index;
		FindIndicator(name).isVisible = true;
		mouse.uiLayer = tutorial.uiInfo.uiLayer;
	}
	else
	{
		resumeGame();
	}
};
function hideTutorial()
{
	var tutorial = FindContainer("tutorial");
	
	for(var i = 0; i < tutorial.uiInfo.indicators.length; i++)
	{
		console.log(tutorial.uiInfo.indicators[i]);
		FindIndicator(tutorial.uiInfo.indicators[i]).isVisible = false;
	}
	tutorial.isVisible = false;
	mouse.uiLayer = 0;
};
function setTutorialTiming()
{
	var defender = attacker_type === "human"?"zombie":"human";
	var tutorial = FindContainer("tutorial");
	var exit = FindButton("exitCircle");
	tutorial.childElements.splice(tutorial.childElements.indexOf(exit),1);
	tutorial.childElements.push(exit);
	if(cur_level_index === 0)
	{
		showTutorial("defender",defender,"01");
		Time.Wait(showTutorial, cur_level.populate_zombie_info[1].start, "attacker", attacker_type, "01");
		Time.Wait(showTutorial, cur_level.populate_boss_info[0].start+1, "attacker", attacker_type, "03");
	}
	else if(cur_level_index === 1)
	{
		showTutorial("defender", defender,"02");
		Time.Wait(showTutorial, cur_level.populate_zombie_info[2].start+5, "attacker", attacker_type, "02");
	}
};