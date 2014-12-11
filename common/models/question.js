Question = new Mongo.Collection("questions");

Schemas = {};

Schemas.Question = new SimpleSchema({
	question: {
		type: String,
		label: "Question",
		max: 200
	},
	clues: {
		type: [String],
		label: "Clues",
		optional: true
	},
	answer: {
		type: String,
		label: "Answer",
		max: 200
	},
	moreinfo: {
		type: String,
		label: "More Information",
		optional: true,
	},
	points: {
		type: Number,
		defaultValue: 1
	},
	type: {
		type: String,
		optional: true,
		allowedValues: ['Picture', 'OddOneOut', 'Simple'],
		defaultValue: 'Simple',
		autoform: {
			options: [{
				label: "Simple",
				value: "Simple"
			}, {
				label: "OddOneOut",
				value: "OddOneOut"
			}]
		}
	},
	order: {
		type: Number,
		optional: true
	},
	game_id: {
		type: String,
		optional: true
	}
});

Question.attachSchema(Schemas.Question);
