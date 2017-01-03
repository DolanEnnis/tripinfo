Template.fgships.helpers({
  fergalships:function(){
      return Ships.find({$or:[{inwardpilot: "FG" },{outwardpilot: "FG" }]},{
      sort: {eta:-1}}).fetch();
  },

  formattedeta:function(){
    return this.boarding ? moment(this.boarding).format("ddd, DD-MM-YYYY") : 'Outward?'
  },
});
