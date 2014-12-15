Router.configure({

	layoutTemplate: function() {
		// console.log("LO: ", (Roles.userIsInRole(Meteor.userId(), "quizmaster")));
		if (Roles.userIsInRole(Meteor.userId(), "quizmaster")) {
			return 'QuizmasterLayout';
		} else if(Meteor.userId()) {
			return 'ContestantLayout';
		} else {
			return "EntryLayout";
		}
	}
});


// Router.onBeforeAction(function() {
// 	console.log("Signup");
// 	if (!Meteor.user()) {
// 		Router.go("/login");
// 		this.next();
// 	} else {
// 		this.next();
// 	}
// }, { except: ["signup"]});





Router.route('/start', function() {
	this.layout('EntryLayout');
	this.render('Start', {
		data: function() {
			games = Games.find({});
			console.log("GAMES: ", games);
			return games;
		}
	});
});


Router.route('/', function() {
	this.layout('EntryLayout');
	Router.go('/start');
});

Router.route('/scoreboard', function() {
	this.render('Scoreboard');
});

Router.route('/admin/people', function() {
	this.render('People', {
		data: function() {
			console.log("People");
			return Meteor.users.find({});
		}
	});
});

Router.route('/admin/games', function() {
	this.render('AdminGames', {
		data: function() {
			return Games.find({});
		}
	});
});

Router.route('/games/:id', function() {
	this.render('Game', {
		data: function() {
			game = Games.findOne({
				_id: this.params.id
			});
			Session.set("currentGame", this.params.id);
			return game;
		}
	});
});

Router.route('/games/:id/edit', function() {
	this.render('EditGame', {
		data: function() {
			game = Games.findOne({
				_id: this.params.id
			});

			return game;
		}
	});
});

Router.route('/games/:id/questions', function() {
	this.render('Questions', {
		data: function() {
			game = Games.findOne({
				_id: this.params.id
			});
			Session.set("currentGame", this.params.id);
			return game;
		}
	});
});

Router.route("/contestant/:id", function() {
	this.layout('ContestantLayout');
	this.render("ContestantPage", {
		data: function() {
			game = Games.findOne({
				_id: this.params.id
			});
			Session.set("currentGame", this.params.id);
			return game;
		}
	});
});

Router.route("/scoreboard/:id", function() {
	this.render("Scoreboard", {
		data: function() {
			game = Games.findOne({
				_id: this.params.id
			});
			Session.set("currentGame", this.params.id);
			return game;
		}
	});
});

Router.route("/help", function(){
	this.layout('ContestantLayout');
	this.render("Help");
}) ;