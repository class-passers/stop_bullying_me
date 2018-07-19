var allHumanImages = {
    normal : {
        idle: {
            image_src_left: "img/knight_idle_flip.png",
            image_src_right: "img/knight_idle.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image_left: null,
            image_right: null
        },
        walk: {
            image_src_left: "img/knight_walk_flip.png",
            image_src_right: "img/knight_walk.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image_left: null,
            image_right: null
        },
        moveInTower: {
            image_src_left: "img/knight_walk_flip.png",
            image_src_right: "img/knight_walk.png",
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
            image_src_left: "img/knight_dying_flip.png",
            image_src_right: "img/knight_dying.png",
            max_num_sprites: 10,
            num_sprites_horz: 2,
            num_sprites_vert: 5,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image_left: null,
            image_right: null
        },
        attack: {
            image_src_left: "img/knight_attack_flip.png",
            image_src_right: "img/knight_attack.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
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
            image_src_left: "img/knight_idle_flip.png",
            image_src_right: "img/knight_idle.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image_left: null,
            image_right: null
        },
        walk: {
            image_src_left: "img/knight_walk_flip.png",
            image_src_right: "img/knight_walk.png",
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
            image_src_left: "img/knight_dying_flip.png",
            image_src_right: "img/knight_dying.png",
            max_num_sprites: 10,
            num_sprites_horz: 2,
            num_sprites_vert: 5,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image_left: null,
            image_right: null
        },
        attack: {
            image_src_left: "img/knight_attack_flip.png",
            image_src_right: "img/knight_attack.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image_left: null,
            image_right: null
        }
    },
    heavy : {
        idle: {
            image_src_left: "img/knight_idle_flip.png",
            image_src_right: "img/knight_idle.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: true,
            image_left: null,
            image_right: null
        },
        walk: {
            image_src_left: "img/knight_walk_flip.png",
            image_src_right: "img/knight_walk.png",
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
            image_src_left: "img/knight_dying_flip.png",
            image_src_right: "img/knight_dying.png",
            max_num_sprites: 10,
            num_sprites_horz: 2,
            num_sprites_vert: 5,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image_left: null,
            image_right: null

        },
        attack: {
            image_src_left: "img/knight_attack_flip.png",
            image_src_right: "img/knight_attack.png",
            max_num_sprites: 10,
            num_sprites_horz: 5,
            num_sprites_vert: 2,
            sprite_width: 0,
            sprite_height: 0,
            repeat: false,
            image_left: null,
            image_right: null
        }
    }
};


for( var type in allHumanImages ) {
    if( allHumanImages.hasOwnProperty(type) ) {
        for (var status in allHumanImages[type]) {
            if( allHumanImages[type].hasOwnProperty( status ) ) {
                allHumanImages[type][status].image_left = new Image();
                allHumanImages[type][status].image_left.src = allHumanImages[type][status].image_src_left;
                allHumanImages[type][status].image_left.onload = (function (type, it) {
                    return function () {
                        allHumanImages[type][it].sprite_width = Math.floor(allHumanImages[type][it].image_left.width / allHumanImages[type][it].num_sprites_horz);
                        allHumanImages[type][it].sprite_height = Math.floor(allHumanImages[type][it].image_left.height / allHumanImages[type][it].num_sprites_vert);
                    }
                }(type, status));

                allHumanImages[type][status].image_right = new Image();
                allHumanImages[type][status].image_right.src = allHumanImages[type][status].image_src_right;
            }
        }
    }
}

