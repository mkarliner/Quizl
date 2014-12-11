Template.deleteQuestionButton.helpers({
	
	beforeRemove: function() {
		return function(collection, id) {
			var doc = Question.findOne(id);
			if (confirm('Really delete "' + doc.question + '"?')) {
				this.remove();
			}
		};
	}
});