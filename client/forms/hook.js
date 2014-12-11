AutoForm.hooks({
	insertGameForm: {
		before: {
			insert: function(doc, template) {
				doc.members = [];
				doc.status = "Inactive";
				return doc;
			}
		},

	},
	insertQuestionForm: {
		before: {
			insert: function(doc, template) {
				doc.game_id = Session.get("currentGame");

				console.log("QE ", doc.game_id, doc, template);
				return doc;
			}
		},
		after: {
			insert: function(err, res, template) {
				Meteor.call("questionCount", function(error, result){
					Question.update({_id: res}, {$set: {order: result}});
					console.log("Rank returned ", result);
				});
			}
		}

	}
});