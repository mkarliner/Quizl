Template.Game.helpers({
	
	active: function() {
		return this.status == "Active";
	},
	scores: function(){
		return Scores.find({gameId: this._id});
	},
	username: function(uid) {
		u =  Meteor.users.findOne(uid).username;
		console.log("UN: ",uid, u);
		return u;
	}

});

var qtimer = null;

// Template.Game.events({
// 	'click #next-question': function(ev, temp){
// 		console.log(ev, (temp.data));
// 		game = temp.data;
// 		cq = temp.data.currentQuestion;
// 		console.log("CQ ", game.name, cq);
// 		if(cq) {
// 			//Get the next one
// 			console.log("Getting next question");
// 			q = Question.findOne({_id: {$gt: cq._id }, game_id: temp.data._id});
// 		} else {
// 			//get the first one
// 			console.log("Getting first question")
// 			q = Question.findOne({game_id: temp.data._id});
// 		}
//
// 		console.log("Next question", cq, q);
// 		n = Games.update({_id: game._id}, {$set: {currentQuestion:  q}});
// 		console.log("UG:",Games.findOne(game._id));
// 		console.log("UP ", n);
// 		qtimer = Meteor.setTimeout(function() {
// 			console.log("Time's up")
// 		}, 10000);
// 	},
// 	'click #reset-question': function(ev, temp){
// 		game = temp.data;
// 		Games.update({_id: game._id}, {$set: {currentQuestion:  null}});
// 	}
// });

timer = null;

function startTimer(game) {
	
}



Template.Game.events({
	'click #next-question': function(ev, temp){
		console.log(ev, (temp.data));
		Meteor.call('stopTimer', game);
		game = temp.data;
		Session.set("currentClue", 0);
		cq = this.currentQuestion;
		if(cq) {
			//Get the next one
			console.log("Getting next question");
			q = Question.findOne({order: {$gt: cq.order }, game_id: temp.data._id});
		} else {
			//get the first one
			console.log("Getting first question")
			q = Question.findOne({game_id: temp.data._id}, {sort: {order: 1}});
			Session.set('currentQuestion', q._id);
		}
		if(q == undefined) {
			console.log("END OF GAME");
			return;
		}
		q.answer = null;
		clues = q.clues;
		q.clues = [];
		q.totClues = clues ? clues.length : null;
		Games.update({_id: game._id}, {$set: {
			currentQuestion:  q, timeLeft: 
			game.maxTime, questionState: 'Idle', 
			answeredBy: null
			}});
		switch(game.type) {
		case "Simple":
			startTimer(game);
		}
		console.log("NC: ", clues);
		if(!clues) {
			Meteor.call('startTimer', game);
		}
		// quizStream.emit("question", q);
	},
	'click #next-clue': function(ev, temp) {
			q = Question.findOne(this.currentQuestion._id);
			q.answer = "";
			num_clues = q.clues.length;
			clueidx = Session.get("currentClue") || 0;
						console.log("NC: ", q, num_clues, clueidx);
			clues = q.clues.slice(0, clueidx+1);
			q.clues = clues;
			Games.update({_id: game._id}, {$set: {currentQuestion: q}});
			Session.set("currentClue", clueidx+1);
			console.log("Session set", clueidx );
			if(clueidx+1 == num_clues || num_clues == undefined){
				Meteor.call('startTimer', game);
			}
					
	},
	'click #reveal-answer': function(ev, temp) {
		console.log("Reveal")
		game = temp.data;
		q = Question.findOne(this.currentQuestion._id);
		Games.update({_id: game._id}, {$set: {currentQuestion: q}});
	},
	'click #wrong-answer': function(ev, temp) {
		Sounds['klaxon'].play();
		game = temp.data;
		q = Question.findOne(this.currentQuestion._id);
		Meteor.call("changeScore", game._id, game.answeredBy, -1);
		
	},
	'click #correct-answer': function(ev, temp) {
		Sounds['klaxon'].play();
		game = temp.data;
		q = Question.findOne(this.currentQuestion._id);
		Meteor.call("changeScore", game._id, game.answeredBy, 1);
	},
	'click #reset-question': function(ev, temp){
		game = temp.data;
		
		Meteor.call("resetGame", game._id)
		Meteor.clearInterval(timer);
	}
});


Template.ActiveGame.helpers({
	timer: function() {
		console.log("QT:", qtimer)
		return qtimer;
	},
	fullQuestion: function(g){
		if(this.currentQuestion) {
			return Question.findOne(this.currentQuestion._id);
		} else {
			return {};
		}
		
	},
	activeQuestion: function(q) {
		game = Games.findOne({_id: this.game_id});
		if(game.currentQuestion && q._id == game.currentQuestion._id) {
		// if(q._id == Session.get("currentQuestion")) {
			return "active";
		} else {
			return "";
		}
	},
	questions: function(){
		return Question.find({game_id: this._id}, {sort: {order: 1}});
	},
	moreQuestions: function() {
		cq = this.currentQuestion;
		if(cq == null) {
			return true;
		}
		q = Question.findOne({order: {$gt: cq.order }, game_id: this._id});
		return q;
	},
	answerer: function() {
		console.log("ANS: ", this.answeredBy)
		return Meteor.users.findOne({_id: this.answeredBy}).username;
	},
	clues: function(){
		if(this.currentQuestion) {
			return  Question.findOne(this.currentQuestion._id).clues || [];
		} else {
			return [];
		}
		
	}, 

	
	
});