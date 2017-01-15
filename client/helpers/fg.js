Template.fgships.helpers({
  fergalships:function(){
      return Ships.find({$or:[{inwardpilot: "FG" },{outwardpilot: "FG" }]},{
      sort: {eta:-1}}).fetch();
  },

  formattedeta:function(){
    return this.boarding ? moment(this.boarding).format("ddd, DD-MM-YYYY") : 'Outward?'
  },

  'checked': function(){
          var isCompleted = this.confirmedIn;
          if(isCompleted){
              return "checked";
          } else {
              return "";
          }
      }

});

Template.fgships.events({
    /// events go here
    'change [type=checkbox]': function(){
      var documentId = this._id;
      var isCompleted = this.confirmedIn;
      if(isCompleted){
       Ships.update({ _id: documentId }, {$set: { confirmedIn: false }});
       console.log("Task marked as incomplete.");
      } else {
       Ships.update({ _id: documentId }, {$set: { confirmedIn: true }});
       console.log("Task marked as complete.");
   }
     }
});
