var buttonImages = {
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
			image_src : "img/button_tower.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		},
		pressed : {
			image_src : "img/button_tower_pressed.png",
			sprite_width : 70,
			sprite_height : 70,
			image : null
		}
	},
    build2 : {
        default : {
            image_src : "img/button_tower.png",
            sprite_width : 70,
            sprite_height : 70,
            image : null
        },
        pressed : {
            image_src : "img/button_tower_pressed.png",
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
	}
}

var indicatorImages = {
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