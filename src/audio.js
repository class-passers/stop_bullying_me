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

    buildSound : new Audio('./audio/hammer.mp3'),
    fireSound : new Audio('./audio/fire.wav')
};

music.bgm.preload = "auto";
music.bgm.loop = true;

music.buildSound.volume = 0.1;
music.fireSound.volume = 0.1;




/*chewSound.addEventListener('ended', function(){
                           this.currentTime = 0;
                           this.play();
                           }, false);*/


