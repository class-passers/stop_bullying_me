var allZombieImages = {
    normal : {
        idle: {
            image_src_left: "img/zombie_idle_flip.png",
            image_src_right: "img/zombie_idle.png",
            max_num_sprites: 15,
            num_sprites_horz: 4,
            num_sprites_vert: 4,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image_left: null,
            image_right: null
        },
        walk: {
            image_src_left: "img/zombie_walk_flip.png",
            image_src_right: "img/zombie_walk.png",
            max_num_sprites: 10,
            num_sprites_horz: 4,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image_left: null,
            image_right: null
        },
        dying: {
            image_src_left: "img/zombie_dying_flip.png",
            image_src_right: "img/zombie_dying.png",
            max_num_sprites: 12,
            num_sprites_horz: 2,
            num_sprites_vert: 6,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image_left: null,
            image_right: null
        },
        attack: {
            image_src_left: "img/zombie_attack_flip.png",
            image_src_right: "img/zombie_attack.png",
            max_num_sprites: 8,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image_left: null,
            image_right: null
        }
    },
    fast : {
        idle: {
            image_src_left: "img/female_zombie_idle_flip.png",
            image_src_right: "img/female_zombie_idle.png",
            max_num_sprites: 15,
            num_sprites_horz: 5,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image_left: null,
            image_right: null
        },
        walk: {
            image_src_left: "img/female_zombie_walk_flip.png",
            image_src_right: "img/female_zombie_walk.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image_left: null,
            image_right: null
        },
        dying: {
            image_src_left: "img/female_zombie_dying_flip.png",
            image_src_right: "img/female_zombie_dying.png",
            max_num_sprites: 12,
            num_sprites_horz: 4,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image_left: null,
            image_right: null
        },
        attack: {
            image_src_left: "img/female_zombie_attack_flip.png",
            image_src_right: "img/female_zombie_attack.png",
            max_num_sprites: 8,
            num_sprites_horz: 3,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image_left: null,
            image_right: null
        }
    },
    heavy : {
        idle: {
            image_src_left: "img/zombie_idle_flip.png",
            image_src_right: "img/zombie_idle.png",
            max_num_sprites: 15,
            num_sprites_horz: 4,
            num_sprites_vert: 4,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image_left: null,
            image_right: null
        },
        walk: {
            image_src_left: "img/zombie_walk_flip.png",
            image_src_right: "img/zombie_walk.png",
            max_num_sprites: 10,
            num_sprites_horz: 4,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image_left: null,
            image_right: null

        },
        dying: {
            image_src_left: "img/zombie_dying_flip.png",
            image_src_right: "img/zombie_dying.png",
            max_num_sprites: 12,
            num_sprites_horz: 2,
            num_sprites_vert: 6,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image_left: null,
            image_right: null

        },
        attack: {
            image_src_left: "img/zombie_attack_flip.png",
            image_src_right: "img/zombie_attack.png",
            max_num_sprites: 8,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image_left: null,
            image_right: null

        }
    },
    healer : {
        idle: {
            image_src_left: "img/zombie_idle_flip.png",
            image_src_right: "img/zombie_idle.png",
            max_num_sprites: 15,
            num_sprites_horz: 4,
            num_sprites_vert: 4,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image_left: null,
            image_right: null
        },
        walk: {
            image_src_left: "img/zombie_walk_flip.png",
            image_src_right: "img/zombie_walk.png",
            max_num_sprites: 10,
            num_sprites_horz: 4,
            num_sprites_vert: 3,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image_left: null,
            image_right: null

        },
        dying: {
            image_src_left: "img/zombie_dying_flip.png",
            image_src_right: "img/zombie_dying.png",
            max_num_sprites: 12,
            num_sprites_horz: 2,
            num_sprites_vert: 6,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image_left: null,
            image_right: null

        },
        attack: {
            image_src_left: "img/zombie_attack_flip.png",
            image_src_right: "img/zombie_attack.png",
            max_num_sprites: 8,
            num_sprites_horz: 4,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image_left: null,
            image_right: null

        }
    }
};


for( var type in allZombieImages ) {
    if( allZombieImages.hasOwnProperty(type) ) {
        for (var status in allZombieImages[type]) {
            if( allZombieImages[type].hasOwnProperty( status ) ) {
                //console.log("load zombie of " + status + " in " + type );
                allZombieImages[type][status].image_left = new Image();
                allZombieImages[type][status].image_left.src = allZombieImages[type][status].image_src_left;
                allZombieImages[type][status].image_left.onload = (function (type, it) {
                    return function () {
                        allZombieImages[type][it].sprite_width = Math.floor(allZombieImages[type][it].image_left.width / allZombieImages[type][it].num_sprites_horz);
                        allZombieImages[type][it].sprite_height = Math.floor(allZombieImages[type][it].image_left.height / allZombieImages[type][it].num_sprites_vert);
                    }
                }(type, status));

                allZombieImages[type][status].image_right = new Image();
                allZombieImages[type][status].image_right.src = allZombieImages[type][status].image_src_right;
            }
        }
    }
}

