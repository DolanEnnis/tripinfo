Template.ShipList.created =  function() {
  Session.set("board", "newship");
AutoForm.debug();
};


Template.ShipList.helpers({
  active: function() {
    return Session.get('board');
  }
});



Template.due.helpers({

  dueships:function(){
    return Ships.find({stage: "Due" },{
    sort: {eta:1}});
  },
  waitingships:function(){
    return Ships.find({stage: "Waiting Berth" });
  },
  formattedeta:function(){
    return this.eta ? moment(this.eta).format("ddd,Do, HH:mm") : 'Error'
  },
  formattedtimeStamp:function(){
    return this.timeStamp ? moment(this.timeStamp).format("ddd,Do, HH:mm") : 'No Updates'
  },

});



Template.due.events ( {
  'click .btn-success': function (event) {
     event.preventDefault();
     Session.set('board', event.target.id);
     Session.set('shipId',this._id);

   }
} );

Template.Awaitingberth.helpers({
  waitingships:function(){
    return Ships.find({stage: "Waiting Berth" },{
    sort: {boarding:1}});
  },

  formattedetb:function(){
    return this.boarding ? moment(this.boarding).format("ddd,Do, HH:mm") : 'Awaiting Advice'
  },
  formattedtimeStamp:function(){
    return this.timeStamp ? moment(this.timeStamp).format("ddd,Do, HH:mm") : 'Error'
  },
});

Template.Awaitingberth.events ( {
  'click .btn-success': function (event) {
     event.preventDefault();
     this.boarding = this.eta;
     this.inwardpilot = this.inwardpilot;
     Session.set('board', event.target.id);
     Session.set('shipId',this._id);

   }
} );


Template.Alongside.helpers({
  alongsideships:function(){
    return Ships.find({stage: "Alongside" },{
    sort: {sailing:1}});
  },
  formatEts:function(){
    return this.sailing ? moment(this.sailing).format("ddd,Do, HH:mm") : 'When she is going?'
  },
  formattedtimeStamp:function(){
    return this.timeStamp ? moment(this.timeStamp).format("ddd,Do, HH:mm") : 'Error'
  },
});

Template.Alongside.events ( {
  'click .btn-success': function (event) {
     event.preventDefault();
     Session.set('board', event.target.id);
     Session.set('shipId',this._id);
   }
} );
