Template.Scoreboard.helpers({
	members: function(){
		console.log("Members", this);
		if(this.members != undefined) {
			 return  Meteor.users.find({_id: {$in: this.members}});
		} else {
		console.log("No members")
	    }
	},
	score: function(member) {
		sc =  Scores.findOne({userId: member._id});
		return sc ? sc.score : "00";
	}
	
});