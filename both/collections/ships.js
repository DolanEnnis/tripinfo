
Ships =new Mongo.Collection("ships");

//NoteSchema = nem SimpleSchema({});

Ships.attachSchema(new SimpleSchema({
  shipname:{
    type:String,
    label:"Ship's Name",
    max: 50
  },
  note:{
    type:String,
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

  assignedpilot:{
    type:'String',
    label:'Pilot (assigned)',
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

  gt:{
    type:Number,
    label:"Gross Tonnage",
    optional:true,
    min: 100
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

  confirmedOut:{
    type:Boolean,
    optional:true,
    label:"Outward Confirmed",
  },

//might make this array of each edit
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

Ships.allow({
  insert:function(userId,doc){
    return doc && doc.userId === userId;
  },
  update: function(userId,doc){
    return doc && doc.userId === userId;
  }
})
