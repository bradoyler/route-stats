
var request = require('supertest'),
    should = require('should'),
    routeStats = require('../index'),
    express = require('express');

 var app = express();
 var testindex = 0;

describe('# Route Stats middleware test', function(){
  var app = express();

  app.get('/hello', routeStats.logFor(3), function(req, res){
  	 testindex++;
     res.send('Hello ' + testindex);
  });

  app.get('/stats', routeStats.show());

  var agent = request.agent(app);

  it('GET #1: Hello 1', function(done){
    agent
    .get('/hello')
    .expect('Hello 1', done);
  });

  it('GET #2: Hello 2', function(done){
    agent
    .get('/hello')
    .expect('Hello 2', done);
  });

  it('GET #3: Hello 3', function(done){
    agent
    .get('/hello')
    .expect('Hello 3', done);
  });

  it('GET stats', function(done){
      agent
	    .get('/stats')
	    .expect('{"/hello":"3"}', done);
  });
});
