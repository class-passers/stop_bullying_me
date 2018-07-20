gameMusic = new Audio('./audio/Beg.mp3');
gameMusic.addEventListener('ended', function(){
                         this.currentTime = 0;
                         this.play();
  }, false);

gameMusic.play();

buildSound = new Audio('./audio/hammer.mp3');
buildSound.volume = 0.1;

fireSound = new Audio('./audio/fire.wav');
fireSound.volume = 0.1;




/*chewSound.addEventListener('ended', function(){
                           this.currentTime = 0;
                           this.play();
                           }, false);*/


