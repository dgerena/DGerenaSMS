var flashReady=function()
{
	$('#slider-vertical  .ui-slider-handle.ui-state-default.ui-corner-all').attr("id",'handleVol')
	var dom={
	//enter all your video functions and workings in here SMARTY
		playBtn:document.getElementById("play"),
		stopBtn:document.getElementById("stop"),
		pauseBtn:document.getElementById("pause"),
		recBtn:document.getElementById("record"),
		volumeBtn:document.getElementById("volume"),
		micOpt:document.getElementById("microphone"),
		camOpt:document.getElementById("camera"),
		volCntrl:document.getElementById("handleVol")
	}

	function playedOut(){
		$(dom.playBtn).click(function(e)// play button
		{
			playRec="play";
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
		var camArr=flash.getCameras();
		console.log(camArr.length);
		for(var i=0; i<camArr.length;i++){
			$(dom.camOpt).append('<option>'+camArr[i]+'</option>');
		}
		$(this).unbind();
	});
	$(dom.micOpt).click(function(e){
		var micArr=flash.getMicrophones();
		for(var i=0; i<micArr.length;i++){
			$(dom.micOpt).append('<option>'+micArr[i]+'</option>');
		}
		$(this).unbind();
	});
	var recToggle=true;
	$(dom.recBtn).click(function(e){
		
		console.log('recToggle',recToggle)
		if(recToggle){
			playRec="rec";
			flash.connect('rtmp://localhost/SMSServer');
			recToggle=false;
		}else{
			flash.stopRecording();
			recToggle=true;
		};
	});
	function vollyBear(){
		console.log(getVolume());
		$('#handleVol').css('bottom',getVolume()*100);
		$('#handleVol').click(function(e){
				console.log("help");
				flash.setVolume($("#handleVol").css('bottom')/198)
		});

	;}
		playedOut();
		vollyBear();
};
var playRec="";
function connected(success,error){
		if(success){

		
			console.log('playRec',playRec);
			if(playRec==="rec"){
				var intNum=1;
				flash.startRecording("test"+intNum,0,0)	
			}else{
				flash.startPlaying("hobbit_vp6.flv");
			};
		};
		console.log(succes);
		console.log(error);
};

//get mic code
//getMicrophones()
//@return microphones -(Array) a list of all available cameras
// video 
//getCameras()
//@return cameras -(array) a list of all the available cameras