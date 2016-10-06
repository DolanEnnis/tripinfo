Meteor.publish('ships',function(){
  return Ships.find();
  //Scope data here!!!
});
