Meteor.publish(null, function (){ 
  return Meteor.roles.find({})
});


Meteor.publish("allUserData", function () {
    return Meteor.users.find({}, {fields: {'roles': 1}});
});