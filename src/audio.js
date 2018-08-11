
var music = {
    bgm : new Audio('audio/Beg.mp3'),
    bgm_played : false,

    effects : {
        towerBuild : new Audio('./audio/towerSound.mp3'),
        towerConstruction : new Audio('./audio/hammer.mp3'),
        fireBullet : new Audio('./audio/fire.wav'),
        won : new Audio('./audio/TaDa.wav'),
        lost : new Audio('./audio/sadTrombone.wav'),

        rangedAttack : new Audio('./audio/Flame_Arrow.mp3'),
        meleeAttack : new Audio('./audio/Punch.mp3'),
        bossAttack : new Audio('./audio/Kick.mp3'),
        fireball : new Audio('./audio/Small_Fireball.mp3'),
        heal : new Audio('./audio/enchant.ogg'),
        dying : new Audio('./audio/Dying.mp3'),
        destroy : new Audio('./audio/Tower_Destroy.mp3')
    }

};

music.bgm.preload = "auto";
music.bgm.loop = true;
music.bgm.volume = 0.9;
music.bgm.onloadeddata = function() { numLoadedAssets += 1; };
numAllAssets += 1;

for( var sound in music.effects )
{
    numAllAssets += 1;
    //console.log("sound = " + sound );
    music.effects[sound].volume = 0.2;
    music.effects[sound].onloadeddata = function() { numLoadedAssets += 1; }
}

function volumeOff()
{
    music.bgm.volume = 0.0;
    for( var sound in music.effects )
    {
        music.effects[sound].volume = 0.0;
    }
}

function volumeOn()
{
    music.bgm.volume = 0.9;
    for( var sound in music.effects )
    {
        music.effects[sound].volume = 0.2;
    }
}

