var shipHooks = {
  before:{
    insert: function(doc){
      if(Meteor.userId()){
        doc.userId = Meteor.userId();
        doc.stage="Due"
      }
      return doc;
    }
  }
}

AutoForm.addHooks('insertShipForm',shipHooks)
