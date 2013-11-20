
var flashReady=function()
{	

	$( "#slider" ).slider({change:function(e)
		{
			var xpos=e.pageX - $(this).offset().left;
			var setSeek=xpos/$("#slider").width();
			var time=setSeek * durdur;
			flash.setTime(time.toFixed(2));
		}
	});
	$( "#slider-vertical" ).slider({ 
		orientation: "vertical", 
		range: "min", 
		min: 0, 
		max: 1, 
		value: 1, 
		step: 0.1,
		change: function(e,ui){
			flash.setVolume(ui.value);//seting the volume to said number
		}
	  });
	$( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );
	$('#slider-vertical  .ui-slider-handle.ui-state-default.ui-corner-all').attr("id",'handleVol');
	$('#slider  .ui-slider-handle.ui-state-default.ui-corner-all').attr("id",'handleTime');
	//works======================
	var dom={
	//enter all your video functions and workings in here SMARTY
		playBtn:$("#play"),
		stopBtn:document.getElementById("stop"),
		pauseBtn:document.getElementById("pause"),
		recBtn:document.getElementById("record"),
		volumeBtn:document.getElementById("volume"),
		micOpt:document.getElementById("microphone"),
		camOpt:document.getElementById("camera"),
		volCntrl:document.getElementById("handleVol"),
		tmeHndl:document.getElementById("handleTime"),
		tmeLne:document.getElementById("timeline")
	}
	//works======================
		dom.playBtn.click(function(e)// play button
		{
			playRec="play";
			flash.connect('rtmp://localhost/SMSServer');
		});
	//works======================
	$(dom.stopBtn).click(function(e)
	{
		e.preventDefault();
		flash.stopPlaying();
		playedOut();
	});
	//works======================  pause play btn
	$(dom.pauseBtn).click(function(e){
		e.preventDefault();
		flash.playPause();
		playedOut();
	});
	//works======================= camera options
	$(dom.camOpt).click(function(e){
		flash.getCameras();
		var camArr=flash.getCameras();
		console.log(camArr.length);
		for(var i=0; i<camArr.length;i++){
			$(dom.camOpt).append('<option>'+camArr[i]+'</option>');
		}
		$(this).unbind();
	});
	//works==========================  microphone options
	$(dom.micOpt).click(function(e){
		var micArr=flash.getMicrophones();
		for(var i=0; i<micArr.length;i++){
			$(dom.micOpt).append('<option>'+micArr[i]+'</option>');
		}
		$(this).unbind();
	});
	//works but cant be clicked on in chrome === recording toggle
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
};

var globalError = function(message){
	console.log('message:',message);
};
	//timeline... or scrubber ... or whatever you call it.
var durdur;//duration holding var ========= works so far
var pcntVal;//percent of the bar holding var
var getDuration= function(duration){//============ currently returns undefined
	durdur=duration;	
};
var seekTime= function(time){
	pcntVal=time/durdur;
	$("#handleTime").css("left",pcntVal*674);//you were setting the id to a value  you need to set the left position ya derp. Glad you got it though.
};
//attemtp at a seek bar movement to timeline.
$
var playRec="";
function connected(success,error){
		if(success){
			if(playRec==="rec"){
				var intNum=1;
				flash.startRecording("test"+intNum,0,0)	
			}else{
				var str = $("#handleVol").css('bottom');
				str = str.substring(0, str.length-2);
				console.log('startPlaying');

				flash.startPlaying("hobbit_vp6.flv");
				flash.getVolume(str);

			};
		};
		console.log(succes);
		console.log(error);
};
//============ FIRE BASE===============
//=============== chat messages ==============
      var myDataRef = new Firebase('https://darkstarmedia.firebaseio.com');
      $('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
          var name = $('#nameInput').val();
          var text = $('#messageInput').val();
          myDataRef.push({name: name, text: text});
          $('#messageInput').val('');
        };
      });
      myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
      });
      function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      };
//====== firebase authentication
var chatRef = new Firebase('https://darkstarmedia.firebaseio.com');
var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
  if(user){
	  $("#nameInput").val(user.name);
  }
  console.log(user);
});
$("#twitter").click(function(e){
	auth.login('twitter');
});
$("#facebook").click(function(e){
	auth.login('facebook');
});