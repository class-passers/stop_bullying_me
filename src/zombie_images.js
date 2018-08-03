var allZombieImages = {
    normal : {
        idle: {
            image_src: "img/zombie_idle.png",
            max_num_sprites: 15,
            num_sprites_horz: 4,
            num_sprites_vert: 4,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        walk: {
            image_src: "img/zombie_walk.png",
            max_num_sprites: 10,
            num_sprites_horz: 4,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        moveInTower: {
            image_src: "img/zombie_walk.png",
            max_num_sprites: 10,
            num_sprites_horz: 4,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        dying: {
            image_src: "img/zombie_dying.png",
            max_num_sprites: 12,
            num_sprites_horz: 2,
            num_sprites_vert: 6,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        },
        attack: {
            image_src: "img/zombie_attack.png",
            max_num_sprites: 8,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        }
    },
    fast : {
        idle: {
            image_src: "img/female_zombie_idle.png",
            max_num_sprites: 15,
            num_sprites_horz: 5,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        walk: {
            image_src: "img/female_zombie_walk.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        moveInTower: {
            image_src: "img/female_zombie_walk.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        dying: {
            image_src: "img/female_zombie_dying.png",
            max_num_sprites: 12,
            num_sprites_horz: 4,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        },
        attack: {
            image_src: "img/female_zombie_attack.png",
            max_num_sprites: 8,
            num_sprites_horz: 3,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        }
    },
    heavy : {
        idle: {
            image_src: "img/troll1_idle.png",
            max_num_sprites: 7,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        walk: {
            image_src: "img/troll1_walk.png",
            max_num_sprites: 7,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null

        },
        moveInTower: {
            image_src: "img/troll1_walk.png",
            max_num_sprites: 7,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null

        },
        dying: {
            image_src: "img/troll1_die.png",
            max_num_sprites: 7,
            num_sprites_horz: 3,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null

        },
        attack: {
            image_src: "img/troll1_attack.png",
            max_num_sprites: 7,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        }
    },
    ranged : {
        idle: {
            image_src: "img/ranged_orc_idle.png",
            max_num_sprites: 7,
            num_sprites_horz: 2,
            num_sprites_vert: 4,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        walk: {
            image_src: "img/ranged_orc_walk.png",
            max_num_sprites: 7,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        moveInTower: {
            image_src: "img/ranged_orc_walk.png",
            max_num_sprites: 7,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        dying: {
            image_src: "img/ranged_orc_dying.png",
            max_num_sprites: 7,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        },
        attack: {
            image_src: "img/ranged_orc_attack.png",
            max_num_sprites: 7,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null,
            scale : 1.0
        }
    },
    healer : {
        idle: {
            image_src: "img/orc1_idle.png",
            max_num_sprites: 7,
            num_sprites_horz: 7,
            num_sprites_vert: 1,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        walk: {
            image_src: "img/orc1_walk.png",
            max_num_sprites: 7,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        moveInTower: {
            image_src: "img/orc1_walk.png",
            max_num_sprites: 7,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        dying: {
            image_src: "img/orc1_die.png",
            max_num_sprites: 7,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        },
        attack: {
            image_src: "img/orc1_attack.png",
            max_num_sprites: 7,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        }
    },
    wizard : {
        idle: {
            image_src: "img/orc1_idle.png",
            max_num_sprites: 7,
            num_sprites_horz: 7,
            num_sprites_vert: 1,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        walk: {
            image_src: "img/orc1_walk.png",
            max_num_sprites: 7,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        moveInTower: {
            image_src: "img/orc1_walk.png",
            max_num_sprites: 7,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        dying: {
            image_src: "img/orc1_die.png",
            max_num_sprites: 7,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        },
        attack: {
            image_src: "img/orc1_attack.png",
            max_num_sprites: 7,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image: null
        }
    }
};


for( var type in allZombieImages ) {
    if( allZombieImages.hasOwnProperty(type) ) {
        for (var status in allZombieImages[type]) {
            if( allZombieImages[type].hasOwnProperty( status ) ) {
                //console.log("load zombie of " + status + " in " + type );
                allZombieImages[type][status].image = new Image();
                allZombieImages[type][status].image.src = allZombieImages[type][status].image_src;
                allZombieImages[type][status].image.onload = (function (type, it) {
                    return function () {
                        allZombieImages[type][it].sprite_width = Math.floor(allZombieImages[type][it].image.width / allZombieImages[type][it].num_sprites_horz);
                        allZombieImages[type][it].sprite_height = Math.floor(allZombieImages[type][it].image.height / allZombieImages[type][it].num_sprites_vert);
                    }
                }(type, status));
            }
        }
    }
}

