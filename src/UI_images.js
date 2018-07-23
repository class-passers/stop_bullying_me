var buttonImages = {
	levelSelection : {
		default : {
			image_src : "img/button_level_selection.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		},
		pressed : {
			image_src : "img/button_level_selection_pressed.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		}
	},
	startGame : {
		default : {
			image_src : "img/button_start.png",
			sprite_width : 360,
			sprite_height : 75,
			image : null
		},
		pressed : {
			image_src : "img/button_start_pressed.png",
			sprite_width : 360,
			sprite_height : 75,
			image : null
		}
	},
	back : {
		default : {
			image_src : "img/button_back.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		},
		pressed : {
			image_src : "img/button_back_pressed.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		}
	},
	credit : {
		default : {
			image_src : "img/button_credit.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		},
		pressed : {
			image_src : "img/button_credit_pressed.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		}
	},
	pause : {
		default : {
			image_src : "img/button_pause.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		},
		pressed : {
			image_src : "img/button_pause_pressed.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		}
	},
	next : {
		default : {
			image_src : "img/button_nextStage.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		},
		pressed : {
			image_src : "img/button_nextStage_pressed.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		}
	},
	replay : {
		default : {
			image_src : "img/button_replay.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		},
		pressed : {
			image_src : "img/button_replay_pressed.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		}
	},
	exit : {
		default : {
			image_src : "img/button_exit.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		},
		pressed : {
			image_src : "img/button_exit_pressed.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		}
	},
	build : {
		default : {
			image_src : "img/button_melee.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		},
		pressed : {
			image_src : "img/button_melee_pressed.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		}
	},
    build2 : {
        default : {
            image_src : "img/button_ranged.png",
            sprite_width : 70,
            sprite_height : 70,
            image : null
        },
        pressed : {
            image_src : "img/button_ranged_pressed.png",
            sprite_width : 70,
            sprite_height : 70,
            image : null
        }
    },
    build3 : {
        default : {
            image_src : "img/button_wizard.png",
            sprite_width : 70,
            sprite_height : 70,
            image : null
        },
        pressed : {
            image_src : "img/button_wizard_pressed.png",
            sprite_width : 70,
            sprite_height : 70,
            image : null
        }
    },
	resume : {
		default : {
			image_src : "img/button_resume.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		},
		pressed : {
			image_src : "img/button_resume_pressed.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		}
	},
	tabOut : {
		default : {
			image_src : "img/button_tab_out.png",
			sprite_width : 66,
			sprite_height : 192,
			image : null
		},
		pressed : {
			image_src : "img/button_tab_out_pressed.png",
			sprite_width : 66,
			sprite_height : 192,
			image : null
		}
	},
	tabIn : {
		default : {
			image_src : "img/button_tab_in.png",
			sprite_width : 66,
			sprite_height : 192,
			image : null
		},
		pressed : {
			image_src : "img/button_tab_in_pressed.png",
			sprite_width : 66,
			sprite_height : 192,
			image : null
		}
	}
}

var indicatorImages = {
	title : {
		image_src : "img/title.png",
		max_num_sprites : 1,
        num_sprites_horz: 1,
        num_sprites_vert: 1,
        sprite_width: 0,
        sprite_height: 0,
        image: null,
	},
	locked : {
		image_src : "img/button_level_selection_locked.png",
		max_num_sprites : 1,
        num_sprites_horz: 1,
        num_sprites_vert: 1,
        sprite_width: 0,
        sprite_height: 0,
        image: null,
	},
	levelSelectionTitle : {
		image_src : "img/title_level_selection.png",
		max_num_sprites : 1,
        num_sprites_horz: 1,
        num_sprites_vert: 1,
        sprite_width: 0,
        sprite_height: 0,
        image: null,
	},
	creditTitle : {
		image_src : "img/title_credit.png",
		max_num_sprites : 1,
        num_sprites_horz: 1,
        num_sprites_vert: 1,
        sprite_width: 0,
        sprite_height: 0,
        image: null,
	},
	money : {
		image_src : "img/coin.png",
		max_num_sprites : 10,
        num_sprites_horz: 10,
        num_sprites_vert: 1,
        sprite_width: 0,
        sprite_height: 0,
        image: null,
	},
	spend : {
		image_src : "img/coin.png",
		max_num_sprites : 10,
        num_sprites_horz: 10,
        num_sprites_vert: 1,
        sprite_width: 0,
        sprite_height: 0,
        image: null
	},
	earn : {
		image_src : "img/coin.png",
		max_num_sprites : 10,
        num_sprites_horz: 10,
        num_sprites_vert: 1,
        sprite_width: 0,
        sprite_height: 0,
        image: null
	},
	tab : {
		image_src : "img/background_create_tab.png",
		max_num_sprites : 1,
        num_sprites_horz: 1,
        num_sprites_vert: 1,
        sprite_width: 320,
        sprite_height: 660,
        image: null
	},
	paused : {
		image_src : "img/state_paused.png",
		max_num_sprites : 1,
        num_sprites_horz: 1,
        num_sprites_vert: 1,
        sprite_width: 300,
        sprite_height: 150,
        image: null
	},
	win : {
		image_src : "img/state_win.png",
		max_num_sprites : 1,
        num_sprites_horz: 1,
        num_sprites_vert: 1,
        sprite_width: 300,
        sprite_height: 150,
        image: null
	},
	lose : {
		image_src : "img/state_lose.png",
		max_num_sprites : 1,
        num_sprites_horz: 1,
        num_sprites_vert: 1,
        sprite_width: 300,
        sprite_height: 150,
        image: null
	}
};
//*
for(var type in indicatorImages)
{
	if(indicatorImages.hasOwnProperty(type))
	{
		indicatorImages[type].image = new Image();
		indicatorImages[type].image.src = indicatorImages[type].image_src;
		indicatorImages[type].image.onload = (function(type)
		{
			return function(){
				indicatorImages[type].sprite_width = Math.floor(indicatorImages[type].image.width / indicatorImages[type].num_sprites_horz);
				indicatorImages[type].sprite_height = Math.floor(indicatorImages[type].image.height / indicatorImages[type].num_sprites_vert);
			}
		}(type));
	}
}
//*/
for (var type in buttonImages)
{
	if(buttonImages.hasOwnProperty(type))
	{
		for(var status in buttonImages[type])
		{
			if(buttonImages[type].hasOwnProperty(status))
			{
				buttonImages[type][status].image = new Image();
				buttonImages[type][status].image.src = buttonImages[type][status].image_src;
				buttonImages[type][status].image.onload = (function(type, it) {
					return function(){
						buttonImages[type][it].sprite_height = buttonImages[type][it].image.width;
						buttonImages[type][it].sprite_height = buttonImages[type][it].image.height;
					}
				}(type, status));
			}
		}
	}
}