Meteor.startup(function () {
  // code to run on server at startup
	
	users = Meteor.users.find({}).fetch();
	if(users.length == 1) {
		superuser = users[0];
		console.log("Only user so far.!");
		 Roles.addUsersToRoles(superuser._id, ['superuser', 'quizmaster']);
	}

});


