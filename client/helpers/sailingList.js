Template.sailingList.helpers({


  sailedships:function(){

    return Ships.find({stage:"Sailed" },{sort: {sailing:-1}});
  },



  formattedTime:function(){
    return this.sailing ? moment(this.eta).format("HH:mm") : 'Error'
  },

  formattedDate:function(){
    return this.sailing ? moment(this.eta).format("DD/MM/YY") : 'Error'
  }

});
