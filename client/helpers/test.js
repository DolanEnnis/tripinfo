

Template.test.events({
  "submit form": function(event){
    event.preventDefault();
     console.log("Submitted");
     var testinfoVar = event.target.testInfo.value;
     Tests.insert({
       testname:testinfoVar
     })
  }
});
