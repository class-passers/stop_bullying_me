var allZombieImageSources = {
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
            num_sprites_horz: 1,
            num_sprites_vert: 7,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        walk: {
            image_src: "img/troll1_walk.png",
            max_num_sprites: 7,
            num_sprites_horz: 1,
            num_sprites_vert: 7,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null

        },
        dying: {
            image_src: "img/troll1_dying.png",
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
            image: null,
            scale : 1.2
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
            scale : 1.2
        }
    },
    healer : {
        idle: {
            image_src: "img/orc1_idle.png",
            max_num_sprites: 7,
            num_sprites_horz: 1,
            num_sprites_vert: 7,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        walk: {
            image_src: "img/orc1_walk.png",
            max_num_sprites: 7,
            num_sprites_horz: 2,
            num_sprites_vert: 4,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        dying: {
            image_src: "img/orc1_dying.png",
            max_num_sprites: 7,
            num_sprites_horz: 1,
            num_sprites_vert: 7,
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
            num_sprites_horz: 1,
            num_sprites_vert: 7,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        walk: {
            image_src: "img/orc1_walk.png",
            max_num_sprites: 7,
            num_sprites_horz: 2,
            num_sprites_vert: 4,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image: null
        },
        dying: {
            image_src: "img/orc1_dying.png",
            max_num_sprites: 7,
            num_sprites_horz: 1,
            num_sprites_vert: 7,
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

var allZombieImages = {
    normal : {
        idle: allZombieImageSources["normal"]["idle"],
        walk: allZombieImageSources["normal"]["walk"],
        moveInTower: allZombieImageSources["normal"]["walk"],
        moveOutTower: allZombieImageSources["normal"]["walk"],
        dying: allZombieImageSources["normal"]["dying"],
        attack: allZombieImageSources["normal"]["attack"]
    },
    fast : {
        idle: allZombieImageSources["fast"]["idle"],
        walk: allZombieImageSources["fast"]["walk"],
        moveInTower: allZombieImageSources["fast"]["walk"],
        moveOutTower: allZombieImageSources["fast"]["walk"],
        dying: allZombieImageSources["fast"]["dying"],
        attack: allZombieImageSources["fast"]["attack"]
    },
    heavy : {
        idle: allZombieImageSources["heavy"]["idle"],
        walk: allZombieImageSources["heavy"]["walk"],
        moveInTower: allZombieImageSources["heavy"]["walk"],
        moveOutTower: allZombieImageSources["heavy"]["walk"],
        dying: allZombieImageSources["heavy"]["dying"],
        attack: allZombieImageSources["heavy"]["attack"]
    },
    ranged : {
        idle: allZombieImageSources["ranged"]["idle"],
        walk: allZombieImageSources["ranged"]["walk"],
        moveInTower: allZombieImageSources["ranged"]["walk"],
        moveOutTower: allZombieImageSources["ranged"]["walk"],
        dying: allZombieImageSources["ranged"]["dying"],
        attack: allZombieImageSources["ranged"]["attack"]
    },
    healer : {
        idle: allZombieImageSources["healer"]["idle"],
        walk: allZombieImageSources["healer"]["walk"],
        moveInTower: allZombieImageSources["healer"]["walk"],
        moveOutTower: allZombieImageSources["healer"]["walk"],
        dying: allZombieImageSources["healer"]["dying"],
        attack: allZombieImageSources["healer"]["attack"]
    },
    wizard : {
        idle: allZombieImageSources["wizard"]["idle"],
        walk: allZombieImageSources["wizard"]["walk"],
        moveInTower: allZombieImageSources["wizard"]["walk"],
        moveOutTower: allZombieImageSources["wizard"]["walk"],
        dying: allZombieImageSources["wizard"]["dying"],
        attack: allZombieImageSources["wizard"]["attack"]
    }
};


for( var type in allZombieImageSources ) {
    for (var status in allZombieImageSources[type]) {
        //console.log("load zombie of " + status + " in " + type );
        allZombieImageSources[type][status].image = new Image();
        allZombieImageSources[type][status].image.src = allZombieImageSources[type][status].image_src;
        allZombieImageSources[type][status].image.onload = (function (type, it) {
            return function () {
                allZombieImageSources[type][it].sprite_width = Math.floor(allZombieImageSources[type][it].image.width / allZombieImageSources[type][it].num_sprites_horz);
                allZombieImageSources[type][it].sprite_height = Math.floor(allZombieImageSources[type][it].image.height / allZombieImageSources[type][it].num_sprites_vert);
                numLoadedAssets++;
            }
        }(type, status));
        numAllAssets++;
    }
}

