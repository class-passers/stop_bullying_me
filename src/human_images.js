var allHumanImageSources = {
    normal : {
        idle: {
            image_src: "img/knight_idle.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        walk: {
            image_src: "img/knight_walk.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        dying: {
            image_src: "img/knight_dying.png",
            max_num_sprites: 10,
            num_sprites_horz: 2,
            num_sprites_vert: 5,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        },
        attack: {
            image_src: "img/knight_attack.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        }
    },
    fast : {
        idle: {
            image_src: "img/female_human_idle.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        walk: {
            image_src: "img/female_human_run.png",
            max_num_sprites: 8,
            num_sprites_horz: 3,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        dying: {
            image_src: "img/female_human_dying.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        },
        attack: {
            image_src: "img/female_human_attack.png",
            max_num_sprites: 3,
            num_sprites_horz: 3,
            num_sprites_vert: 1,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        }
    },
    ranged : {
        idle: {
            image_src: "img/ninja_idle.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        walk: {
            image_src: "img/ninja_run.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        dying: {
            image_src: "img/ninja_die.png",
            max_num_sprites: 10,
            num_sprites_horz: 4,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        },
        attack: {
            image_src: "img/ninja_attack.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        }
    },
    heavy : {
        idle: {
            image_src: "img/heavy_knight_idle.png",
            max_num_sprites: 7,
            num_sprites_horz: 3,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        walk: {
            image_src: "img/heavy_knight_walk.png",
            max_num_sprites: 7,
            num_sprites_horz: 3,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null

        },
        dying: {
            image_src: "img/heavy_knight_dying.png",
            max_num_sprites: 6,
            num_sprites_horz: 2,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null

        },
        attack: {
            image_src: "img/heavy_knight_attack.png",
            max_num_sprites: 7,
            num_sprites_horz: 3,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        }
    },
    wizard : {
        idle: {
            image_src: "img/wizard_idle.png",
            max_num_sprites: 5,
            num_sprites_horz: 5,
            num_sprites_vert: 1,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        walk: {
            image_src: "img/wizard_walk.png",
            max_num_sprites: 5,
            num_sprites_horz: 2,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        dying: {
            image_src: "img/wizard_die.png",
            max_num_sprites: 5,
            num_sprites_horz: 5,
            num_sprites_vert: 1,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        },
        attack: {
            image_src: "img/wizard_attack.png",
            max_num_sprites: 5,
            num_sprites_horz: 3,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        }
    },
    healer : {
        idle: {
            image_src: "img/wizard_idle.png",
            max_num_sprites: 5,
            num_sprites_horz: 5,
            num_sprites_vert: 1,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        walk: {
            image_src: "img/wizard_walk.png",
            max_num_sprites: 5,
            num_sprites_horz: 2,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        dying: {
            image_src: "img/wizard_die.png",
            max_num_sprites: 5,
            num_sprites_horz: 5,
            num_sprites_vert: 1,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        },
        attack: {
            image_src: "img/wizard_attack.png",
            max_num_sprites: 5,
            num_sprites_horz: 3,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        }
    }
};

var allHumanImages = {
    normal : {
        idle: allHumanImageSources["normal"]["idle"],
        walk: allHumanImageSources["normal"]["walk"],
        moveInTower: allHumanImageSources["normal"]["walk"],
        moveOutTower: allHumanImageSources["normal"]["walk"],
        dying: allHumanImageSources["normal"]["dying"],
        attack: allHumanImageSources["normal"]["attack"]
    },
    fast : {
        idle: allHumanImageSources["fast"]["idle"],
        walk: allHumanImageSources["fast"]["walk"],
        moveInTower: allHumanImageSources["fast"]["walk"],
        moveOutTower: allHumanImageSources["fast"]["walk"],
        dying: allHumanImageSources["fast"]["dying"],
        attack: allHumanImageSources["fast"]["attack"]
    },
    ranged : {
        idle: allHumanImageSources["ranged"]["idle"],
        walk: allHumanImageSources["ranged"]["walk"],
        moveInTower: allHumanImageSources["ranged"]["walk"],
        moveOutTower: allHumanImageSources["ranged"]["walk"],
        dying: allHumanImageSources["ranged"]["dying"],
        attack: allHumanImageSources["ranged"]["attack"]
    },
    heavy : {
        idle: allHumanImageSources["heavy"]["idle"],
        walk: allHumanImageSources["heavy"]["walk"],
        moveInTower: allHumanImageSources["heavy"]["walk"],
        moveOutTower: allHumanImageSources["heavy"]["walk"],
        dying: allHumanImageSources["heavy"]["dying"],
        attack: allHumanImageSources["heavy"]["attack"]
    },
    wizard : {
        idle: allHumanImageSources["wizard"]["idle"],
        walk: allHumanImageSources["wizard"]["walk"],
        moveInTower: allHumanImageSources["wizard"]["walk"],
        moveOutTower: allHumanImageSources["wizard"]["walk"],
        dying: allHumanImageSources["wizard"]["dying"],
        attack: allHumanImageSources["wizard"]["attack"]

    },
    healer : {
        idle: allHumanImageSources["healer"]["idle"],
        walk: allHumanImageSources["healer"]["walk"],
        moveInTower: allHumanImageSources["healer"]["walk"],
        moveOutTower: allHumanImageSources["healer"]["walk"],
        dying: allHumanImageSources["healer"]["dying"],
        attack: allHumanImageSources["healer"]["attack"]
    }
};


for( var type in allHumanImageSources ) {
    if( allHumanImageSources.hasOwnProperty(type) ) {
        for (var status in allHumanImageSources[type]) {
            if( allHumanImageSources[type].hasOwnProperty( status ) ) {
                allHumanImageSources[type][status].image = new Image();
                allHumanImageSources[type][status].image.src = allHumanImages[type][status].image_src;
                allHumanImageSources[type][status].image.onload = (function (type, it) {
                    return function () {
                        allHumanImageSources[type][it].sprite_width = Math.floor(allHumanImageSources[type][it].image.width / allHumanImageSources[type][it].num_sprites_horz);
                        allHumanImageSources[type][it].sprite_height = Math.floor(allHumanImageSources[type][it].image.height / allHumanImageSources[type][it].num_sprites_vert);
                        numLoadedAssets++;
                    }
                }(type, status));
                numAllAssets++;
            }
        }
    }
}

