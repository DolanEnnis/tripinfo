Router.configure({
  layoutTemplate: 'layout',
  waitOn: function(){
    Meteor.subscribe('ships');
  }
});

// Makes ShipList the home tamplate, Shiplist is in the due file
Router.route('/', 'ShipList');

Router.route('/allShips', 'allships');

// Clicking on an indivdual ship brings up an individual page
Router.route("/ships/:_id", function(){
  var item=Ships.findOne({_id: this.params._id});
  this.render('shipEdit', {data: item});
},
    { name: 'shipEdit.show'}
  );

//This ship indivdual page is specialy for ship already alongside
Router.route("/shipsAlingside/:_id", function(){
    var item=Ships.findOne({_id: this.params._id});
    this.render('shipEditAlongside', {data: item});
  },
      { name: 'shipEditAlongside.show'}
    );


//Router.route('/ships','ships'); all ships has taken over from this page!

// A list of all ships that have arrived in the river, based on pats book
Router.route('/station','station');

// This page gives a copy of Day Diary alongside form to add new ships
Router.route('/addShip','addShip');

// Page set up for position page when it works
Router.route('/position','position');

// This page Shows a copy of google drive tide
Router.route('/tide','tide');
