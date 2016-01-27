/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var thingsRouter = express.Router();

  var things = [{
    id: 1,
    name: "scissors",
    weight: "2"
  }, {
    id: 2,
    name: "thread",
    weight: "0.1"
  }];

  thingsRouter.get('/', function(req, res) {
    var data = [];
    things.forEach(function(item) {
      data.push({
        type: 'things',
        id: item.id.toString(),
        attributes: {
          name: item.name,
          weight: item.weight,
        }
      });
    });
    res.set('Content-Type', 'application/vnd.api+json');
    res.send({
      data: data
    });
  });

  thingsRouter.post('/', function(req, res) {
    var newThing = req.body.data.attributes;
    var newId = things.length + 1;
    newThing.id = newId;

    things.push({
      name: newThing.name,
      weight: newThing.weight,
      id: newId
    });

    res.set('Content-Type', 'application/vnd.api+json');
    res.send({
      data: {
        type: 'things',
        id: newId,
        attributes: newThing
      }
    });
  });

  thingsRouter.get('/:id', function(req, res) {
    var data = [];
    things.forEach(function(item) {
      console.log(item, item.id, req.params.id);

      if (item.id === parseInt(req.params.id)) {
        data.push({
          type: 'things',
          id: item.id.toString(),
          attributes: {
            name: item.name,
            weight: item.weight,
          }
        })
      }
    });
    res.set('Content-Type', 'application/vnd.api+json');
    res.send({
      data: data
    });
  });

  thingsRouter.patch('/:id', function(req, res) {
    var thingAttrs = req.body.data.attributes;
    var thingId = req.params.id;
    console.log("thingId", thingId);
    things.forEach(function(item) {
      if (item.id === parseInt(thingId)) {
        item.name = thingAttrs.name;
        item.weight = thingAttrs.weight;
      }
    })
    res.send({
      data: {
        type: 'things',
        id: thingId,
        attributes: thingAttrs
      }
    })
  })

  thingsRouter.put('/:id', function(req, res) {
    res.send({
      'things': {
        id: req.params.id
      }
    });
  });

  thingsRouter.delete('/:id', function(req, res) {
    var thingId = req.params.id;
    for (var i = 0; i < things.length; i++) {
      if (parseInt(thingId) === things[i].id) {
        things.splice(i, 1);
        break;
      }
    }
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  // app.use('/api/things', require('body-parser'));
  app.use('/api/things', thingsRouter);
};
