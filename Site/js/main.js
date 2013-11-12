var flashReady=function()
{
	var dom={
	
	//enter all your video functions and workings in here SMARTY
	playBtn:document.getElementById("play"),
	stopBtn:document.getElementById("stop"),
	pauseBtn:document.getElementById("pause"),
	recordBtn:document.getElementById("record"),
	volumeBtn:document.getElementById("volume"),
	micOpt:document.getElementById("microphone"),
	camOpt:document.getElementById("camera")
	}
	playedOut();
	function playedOut(){
		$(dom.playBtn).click(function(e)// play button
		{
			e.preventDefault();
			flash.connect('rtmp://localhost/SMSServer');
			$(this).unbind();
		});
	};
	$(dom.stopBtn).click(function(e)
	{
		e.preventDefault();
		flash.stopPlaying();
		playedOut();
	});
	$(dom.pauseBtn).click(function(e){
		e.preventDefault();
		flash.playPause();
		playedOut();
	});
	$(dom.camOpt).click(function(e){
		flash.getCameras();
	});
	$(dom.micOpt).click(function(e){
		console.log("herro");
		var micArr=flash.getMicrophones();
		console.log(micArr.length);
		for(var i=0; i<micArr.length;i++){
			$(dom.micOpt).append('<option>'+micArr[i]+'</option>');
			console.log("shit");
		}
		$(this).unbind();
	});
	
};
function connected(success,error){
		if(success){
			flash.startPlaying("hobbit_vp6.flv");
			
		}
		console.log(error)
};
//get mic code
//getMicrophones()
//@return microphones -(Array) a list of all available cameras
// video 
//getCameras()
//@return cameras -(array) a list of all the available cameras