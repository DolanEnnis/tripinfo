Template.station.helpers({


  arrivedships:function(){
    console.log("station.js line 5");
    return Ships.find({stage:{ $not: "Due"} },{sort: {eta:-1}});
  },



  formattedTime:function(){
    return this.eta ? moment(this.eta).format("HH:mm") : 'Error'
  },

  formattedDate:function(){
    return this.eta ? moment(this.eta).format("DD/MM/YY") : 'Error'
  }

});
