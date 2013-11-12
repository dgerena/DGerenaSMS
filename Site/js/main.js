
var flashReady= function()
{
	//enter all your video functions and workings in here SMARTY
	var playBtn = document.getElementById("#play").onclick();
	var stopBtn = document.getElementById("#stop").onclick();
	var pauseBtn = document.getElementById("#pause").onclick();
	var recordBtn = document.getElementById("#record").onclick();
	var volumeBtn = document.getElementById("#volume").onkeydown();
	playBtn.startPlayback();
	document.getElementById('play').onclick = function() {
  alert('click!')
}

/*
	function play(Event, click){
		startPlayback();
	};
*/

}
var flashReady=function()
{
	$('button').on('click',function(e)
	{
		connect('rtmp://localhost/SMSServer')
	})	
}
//get mic code
//getMicrophones()
//@return microphones -(Array) a list of all available cameras
// video 
//getCameras()
//@return cameras -(array) a list of all the available cameras