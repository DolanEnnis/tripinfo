Tests =new Mongo.Collection("test");

Tests.attachSchema(new SimpleSchema({
  testname:{
    type:String,
    label:"Test Name",
    max: 50
  },
  }));
