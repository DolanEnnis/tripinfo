Template.bdships.helpers({
  brinships:function(){
      return Ships.find({$or:[{inwardpilot: "BD" },{outwardpilot: "BD" }]},{
      sort: {eta:-1}}).fetch();
  },

  formattedeta:function(){
    return this.boarding ? moment(this.boarding).format("ddd, DD-MM-YYYY") : 'Outward?'
  },
});


//console.log(Users.find({$or: [{email: 'some@mail.com'},{city: 'atlanta'}]}).fetch());
