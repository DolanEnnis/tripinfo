/*Template.ships.onRendered(function() {
    $('.datetimepicker').datetimepicker({
      locale:'ru'
    });
});*/



Template.due.helpers({
//was called Template.ships.helpers({ but renaming stopped error in console!22/6/16
/*
today :function() {
  //return dateToDateString(new Date);
   var date =(new Date);
   var m = (date.getMonth() + 1);
   if (m < 10) {
     m = "0" + m;
   };
   var d = date.getDate();
   if (d < 10) {
     d = "0" + d;
   };
   var h = date.getHours();
   if (h < 10) {
     h = "0" + h;
   }
    return date.getFullYear()+"-"+m+"-"+d+"T"+h+":"+date.getMinutes();

  // or use moment to avoid custom function
  // return moment().format("YYYY-MM-DD");
},
*/

  ships:function(){
    return Ships.find({},{
    sort: {eta:1}});
  },

  formattedeta:function(){
    return this.eta ? moment(this.eta).format("ddd,Do, HH:mm") : 'Error'
  }

});
