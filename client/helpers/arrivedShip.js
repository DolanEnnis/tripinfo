

Template.arrivedShip.helpers({
  selectedShipDoc: function () {
      return Ships.findOne(Session.get("shipId"));
    },
});

Template.berthed.helpers({
  selectedShipDoc: function () {
      return Ships.findOne(Session.get("shipId"));
    },
});

Template.sailed.helpers({
  selectedShipDoc: function () {
      return Ships.findOne(Session.get("shipId"));
    },
});
