function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

Template.ContestantPage.helpers({
	myScore: function(){
		score=(Scores.findOne({gameId: this._id, userId: Meteor.userId()}));
		console.log("SCR:" ,score);
		return score ? pad(score.score,2) : "00";
	},
});

Template.Contestant.helpers({
	question: function(){
		// console.log("contestant question", this.name);
		// q = Session.get("currentQuestion");
		if(this.currentQuestion) {
			return this.currentQuestion.question;
		} else {
			return false
		}
	},

	answer: function() {
		if(this.currentQuestion) {
			this.currentQuestion.answer;
		}
	},
	
	percentLeft: function() {
		//console.log("left ",this.timeLeft);
		return (this.timeLeft/this.maxTime)*100;
	},
	running: function() {
		
		if(this.questionState==="Running") {
			console.log("QS: ", this.questionState)
			return true;
		} else {
			return false;
		}
	},
	answerer: function() {
		return Meteor.users.findOne({_id: this.answeredBy});
	},
	
});

Template.Contestant.events({
	'click #answer-button': function(ev, temp) {
		game = temp.data;
		console.log("Button!");
		Meteor.call('answerQuestion', game);
	}
})









