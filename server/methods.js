var timerId;

Meteor.methods({
	resetGame: function(gameId) {
		console.log("RESET: ", gameId);
		Games.update({_id: gameId}, {$set: {currentQuestion:  null, timeLeft: 0,  questionState: 'Idle',answeredBy: null}});
		Scores.update({gameId: gameId}, {$set: {score: 0}});
	},
	startTimer: function(game) {
		console.log("Started question", game.name);
		timerId = Meteor.setInterval(function(){
			Games.update({_id: game._id}, {$inc: { timeLeft: -1}, $set: {questionState: 'Running'}});
			game = Games.findOne(game._id);
			console.log("Timer: ", timerId._idleStart, game.timeLeft)
			if(game.timeLeft <= 0) {
				console.log("Clearing timer", timerId._idleStart);
				Games.update({_id: game._id}, { $set: {questionState: 'Idle', answeredBy: this.userId}});
				Meteor.clearInterval(timerId);
			}
		},1000);
	},
	stopTimer: function(game) {
		Meteor.clearInterval(timerId);
	},
	answerQuestion: function(game) {
		console.log("Stopped question", game);
		Meteor.clearInterval(timerId);
		Games.update({_id: game._id}, { $set: {questionState: 'Paused', answeredBy: this.userId}});
	},
	joinGame: function(gameId) {
			console.log("JG: ", gameId);
			n = Games.update({_id: gameId}, {$addToSet: {members: this.userId}});
			Scores.upsert({gameId: gameId, userId: this.userIdß}, {$set: {userId: this.userId, score: 0, gameId: gameId}});
			console.log("JG: ", n, gameId, this.userId)
	},
	changeScore: function(gameId, userId, amount) {
		n = Scores.upsert({gameId: gameId, userId: userId}, {$inc: {score: amount}})
		console.log("Change score: ", n, gameId, userId, amount);
	},
	questionCount: function() {
		rank = incrementCounter("questionCounter");
		console.log("Rank ", rank)
		return rank;
	}
});