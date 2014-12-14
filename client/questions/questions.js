Template.Questions.helpers({
	questions: function(){
		return Question.find({game_id: this._id});
	}
});

// Template.ActiveQuestion.helpers({
// 	test: function(){
// 		console.log("CAtive", this)
// 	},
// 	question: function(){
// 		Question.findOne(Session.get("currentQuestion"));
// 	}
// });