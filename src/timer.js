var timer = setInterval(countTimer, 1000);
var totalSec = 0;
function countTimer() 
{
   ++totalSec;
   var hour = Math.floor(totalSec /3600);
   var min = Math.floor((totalSec - hour*3600)/60);
   var sec = totalSec - (hour*3600 + min*60);

   document.getElementById("game_frame").innerHTML = hour + ":" + min + ":" + sec;
}
