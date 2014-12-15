Template.GameList.helpers({
	members: function(){
		console.log("Members", this);
		if(this.members != undefined) {
			 return  Meteor.users.find({_id: {$in: this.members}});
	} else {
		console.log("No members")
	}
	},
	userStatus: function(user) {
		console.log("USER: ", user);
		if(user.status && user.status.online) {
			return "on-line";
		} else {
			return "";
		}
	}
});


Template.GameList.events({
	'click': function(ev, temp) {
		console.log("CLK")
		game = Blaze.getData(ev.target);
		Meteor.call("joinGame", game._id);
		
		if(Roles.userIsInRole(Meteor.userId(), "quizmaster")) {
			Router.go("/games/"+game._id);
		} else {
			Router.go("/contestant/"+game._id);
		}
		
	}
});