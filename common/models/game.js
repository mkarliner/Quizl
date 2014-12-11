Games = new Mongo.Collection("games");

Schemas = {};

Schemas.Game = new SimpleSchema({
	name: {
		type: String,
		label: "Name",
		max: 200
	},
	instructions: {
		type: String,
		label: "Instructions",
		optional: true,
		autoform: {
			rows: 5
		}
	},
	members: {
		type: [String],
		optional: true
	},
	scores: {
		type: [Object],
		optional: true,
		blackbox: true,
	},
	status: {
		type: String,
		optional: true,
		allowedValues: ['Active', 'Inactive'],
	    autoform: {
	      options: [
	        {label: "Active", value: "Active"},
			{label: "Inactive", value: "Inactive"}
	      ]
	    }
	  },
	  currentQuestion: {
	  		  type: Object,
	  		  blackbox: true,
	  		  optional: true
	  },
	  currentClue: {
		  type: Number,
		  optional: true
	  },
	  questionRunning: {
		  type: Boolean,
		  optional: true
	  },
	  timeLeft: {
		  type: Number,
		  optional: true
	  },
	  maxTime: {
		  type: Number,
	  	  defaultValue: 12
	  },
	  questionState: {
		  type: String,
		  optional: true,
		  allowedValues: ['Running', 'Paused', 'Idle'],
		  defaultValue: 'Idle'
	  },
	  answeredBy: {
		  type: String,
		  optional: true
	  }
});

Games.attachSchema(Schemas.Game);