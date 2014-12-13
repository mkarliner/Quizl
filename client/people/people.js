Template.People.events({
	'click #promote-btn': function(ev, temp) {
		console.log("Promte: ", ev, temp.data, this);
		Meteor.call('promoteUser', this._id);
	} 
});



