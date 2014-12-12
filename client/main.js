Sounds = []

Meteor.startup(function () {

  });
  

	Sounds['klaxon'] = new buzz.sound('/sounds/klaxon.mp3');
	Sounds['boing'] = new buzz.sound('/sounds/boing.mp3');
	Sounds['ding'] = new buzz.sound('/sounds/ding.mp3');
	Sounds['doorbell'] = new buzz.sound('/sounds/doorbell.mp3');
	//Sounds['truck'] = new buzz.sound('/sounds/truck.mp3');
	
	Games.find({_id: Session.get("currentGame")}).observeChanges({
		changed: function(id, fields){
			if(fields.currentQuestion != null) {
				Sounds['ding'].play();
			}
			if(fields.answeredBy != null) {
				console.log("Answered!");
				Sounds['doorbell'].play();
			}
			if(fields.timeLeft == 0) {
				Sounds['klaxon'].play();
			}
			console.log("CHANGED: ", id, fields);
			
		}
	});


//
// quizStream.on("question", function(msg){
// 	Session.set("currentQuestion", msg)
// 	console.log("Question", msg.question);
// });
//
// quizStream.on("reset", function(msg) {
// 	console.log("Reset received");
// 	Session.set("currentQuestion", null)
// });

