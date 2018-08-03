/*
gameMusic = new Audio('./audio/Beg.mp3');
gameMusic.addEventListener('ended', function(){
                         this.currentTime = 0;
                         this.play();
  }, false);

gameMusic.play();
*/

var music = {
    bgm : new Audio('audio/Beg.mp3'),
    bgm_played : false,

    towerSound : new Audio('./audio/towerSound.mp3'),
    buildSound : new Audio('./audio/hammer.mp3'),
    fireSound : new Audio('./audio/fire.wav'),
    winSound : new Audio('./audio/TaDa.wav'),
    loseSound : new Audio('./audio/zombiSound.wav')

};

music.bgm.preload = "auto";
music.bgm.loop = true;
music.bgm.volume = 0.9;
music.bgm.onloadeddata = function() { numLoadedAssets += 1; }

music.towerSound.volume = 0.2;
music.towerSound.onloadeddata = function() { numLoadedAssets += 1; }
music.buildSound.volume = 0.1;
music.buildSound.onloadeddata = function() { numLoadedAssets += 1; }
music.fireSound.volume = 0.1;
music.fireSound.onloadeddata = function() { numLoadedAssets += 1; }
music.winSound.volume = 0.2;
music.winSound.onloadeddata = function() { numLoadedAssets += 1; }
music.loseSound.volume = 0.2;
music.loseSound.onloadeddata = function() { numLoadedAssets += 1; }

numAllAssets += 6;



/*chewSound.addEventListener('ended', function(){
                           this.currentTime = 0;
                           this.play();
                           }, false);*/


