
Ships =new Mongo.Collection("ships");

//NoteSchema = nem SimpleSchema({});

Ships.attachSchema(new SimpleSchema({
  shipname:{
    type:String,
    label:"Ship's Name",
    max: 50
  },
  imo:{
      type:Number,
      label:"IMO number",
   		min:  5000000,
      optional:true,
    },

  gt:{
      type:Number,
      label:"Gross Tonnage",
      optional:true,
      min: 100
    },

  note:{
    type:'String',
    label:"Note",
    optional:true,
  },

  port:{
    type: 'String',
    label: 'Port',
    allowedValues: ['Anchorage','Cappa','Moneypoint'
    ,'Tarbert','Foynes','Aughinish','Shannon','Limerick','Nil'],
    autoform: {
      options:[
        {label:'Anchorage',value:'Anchorage'},
        {label:'Cappa',value:'Cappa'},
        {label:'Moneypoint',value:'Moneypoint'},
        {label:'Tarbert',value:'Tarbert'},
        {label:'Foynes',value:'Foynes'},
        {label:'Aughinish',value:'Aughinish'},
        {label:'Shannon',value:'Shannon'},
        {label:'Limerick',value:'Limerick'},
        {label:'Nil',value:'Nil'},
      ]
    }
  },

  agent:{
    type:'String',
    label:'Agent',
    allowedValues: ['Argosea','DSG','Mullocks','Scotts','Hamilton','Other'],
    optional:true,
    autoform: {
      options:[
        {label:'Argosea',value:'Argosea'},
        {label:'DSG',value:'DSG'},
        {label:'Mullocks',value:'Mullocks'},
        {label:'Scotts',value:'Scotts'},
        {label:'Hamilton',value:'Hamilton'},
        {label:'Other',value:'Other'},
      ]
    }

},


  eta:{
    type:Date,
    label:'ETA/Arrived',
    optional:true,
    autoform:{
      afFieldInput:{
        type:"datetime-local",
        format: "YYYY-MM-DD"
      }
    }
  },

  stage:{
    type:'String',
    label: 'Status',
    allowedValues: ['Due','Waiting Berth','Alongside','Sailed','Delete?'],
    autoform: {
      options:[
        {label:'Due',value:'Due'},
        {label:'Waiting Berth',value:'Waiting Berth'},
        {label:'Alongside',value:'Alongside'},
        {label:'Sailed',value:'Sailed'},
        {label:'Delete?',value:'Delete?'},
      ]
    }
  },


  inwardpilot:{
    type:'String',
    label:'Pilot (Inward)',
    allowedValues: ['FG','BD','PB','Fin','MS','DB','PG','CB'],
    optional:true,
    autoform: {
      options:[
        {label:'Fergal',value:'FG'},
        {label:'Brian',value:'BD'},
        {label:'Peter',value:'PB'},
        {label:'Fintan',value:'Fin'},
        {label:'Mark',value:'MS'},
        {label:'Dave',value:'DB'},
        {label:'Paddy',value:'PG'},
        {label:'Cyril',value:'CB'},
      ]
    }
  },
  outwardpilot:{
    type:'String',
    label:'Pilot (Outward)',
    allowedValues: ['FG','BD','PB','Fin','MS','DB','PG','CB'],
    optional:true,
    autoform: {
      options:[
        {label:'Fergal',value:'FG'},
        {label:'Brian',value:'BD'},
        {label:'Peter',value:'PB'},
        {label:'Fintan',value:'Fin'},
        {label:'Mark',value:'MS'},
        {label:'Dave',value:'DB'},
        {label:'Paddy',value:'PG'},
        {label:'Cyril',value:'CB'},
      ]
    }
  },
  arrivalnote:{
    type:String,
    label:"Notes",
    optional:true,
  },
  boarding:{
    type:Date,
    label:'Boarding',
    optional:true,
    autoform:{
      afFieldInput:{
        type:"datetime-local",
        format: "YYYY-MM-DD"
      }
    }
  },
  sailing:{
    type:Date,
    label:'ETS/Sailed',
    optional:true,
    autoform:{
      afFieldInput:{
        type:"datetime-local",
        format: "YYYY-MM-DD"
      }
    }
  },


  outwardnote:{
    type:String,
    label:"Note",
    optional:true,
  },

  confirmedIn:{
    type:Boolean,
    optional:true,
    label:"In Confirmed",
  },

  Extrain:{
    type:String,
    label:"Extra In",
    optional:true,
  },

  confirmedOut:{
    type:Boolean,
    optional:true,
    label:"Outward Confirmed",
  },

  Extraout:{
    type:String,
    label:"Extra Out",
    optional:true,
  },

  updateSource:{
    type:'String',
    label:'Update Received From',
    allowedValues: ['Sheet','AIS','Good Guess','Agent','Pilot','Other'],
    optional:true,
    autoform: {
      options:[
        {label:'Sheet',value:'Sheet'},
        {label:'AIS',value:'AIS'},
        {label:'Good Guess!',value:'Good Guess'},
        {label:'Agent',value:'Agent'},
        {label:'Pilot',value:'Pilot'},
        {label:'Other',value:'Other'},
      ]
    }
},

//Information only relates to Brian's Ships
  Bdrefno:{
    type:Number,
    label:"Brian's Ref No",
    optional:true,
    min: 1000,
    max: 2227},

  monthNo:	{
    type:String,
    label:"Month No",
    optional:true,
  },

  timeoff:	  {
    type:Date,
    label:'Time Off',
    optional:true,
    autoform:{
      afFieldInput:{
        type:"datetime-local",
        format: "YYYY-MM-DD"
      }
    }
  },

  Car:			{
    type:String,
    label:"Car",
    optional:true,},

  Good:			{
    type:String,
    label:"Good   (1-Report, 3-Average, 5-Well Done)",
    optional:true,
    min: 1,
    max:5,},


//------------------------------------

  //Automatic Information about updates
timeStamp:{
  type:Date,
  label:"Updated"
},

  userId: {
    type: String,
    label:"Title"
  },

}));


TabularTables = {};

TabularTables.Ships = new Tabular.Table({
  name: "Ships",
  collection: Ships,
  columns: [
    {data: "shipname", title: "Name"},
    {data: "eta",title: "ETA/Arrived",},
    {data: "note", title: "Note"},
    {data: "port", title: "Port"},
    {data: "stage", title: "Status"},


    {
      tmpl: Meteor.isClient && Template.shipCheckOutCell
    }

  ]
});

Meteor.methods({
  editShip:function(){
     Ships.update(ship.id, {$set:{
       shipname: ship.name
     }});
  }
});
// Use matb33:collection-hooks
Ships.before.insert( function (user, doc) {
    doc.timeStamp = new Date(); // Date.now();
    doc.userId = user;
});


Ships.before.update(function (user, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.timeStamp = new Date();
  modifier.$set.userId = user;
});

Ships.allow({
  insert:function(userId,doc){
    return doc && doc.userId === userId;
  },
  update: function(userId,doc){
    return doc ;
  }
})
