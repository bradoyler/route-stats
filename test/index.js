
var request = require('supertest'),
    should = require('should'),
    routeStats = require('../index'),
    express = require('express');

 var app = express();
 var testindex = 0;
 var homeindex = 0;

describe('# Route Stats middleware test', function(){
  var app = express();
  app.use(routeStats.logFor(3));

  app.get('/home', function(req, res){
  	 homeindex++;
     res.send('home ' + homeindex);
  });

  app.get('/test', function(req, res){
     testindex++;
     res.send('test ' + testindex);
  });

  app.get('/stats', routeStats.show(), function (req, res) {
    console.log(res.stats);
    res.send(res.stats[0]);
  });

  var agent = request.agent(app);

  it('GET #1: Home 1', function(done){
    agent
    .get('/home')
    .expect('home 1', done);
  });

  it('GET #3: Home 2', function(done){
    agent
    .get('/home')
    .expect('home 2', done);
  });

  it('GET #2: Test 1', function(done){
    agent
    .get('/test')
    .expect('test 1', done);
  });

  it('GET stats', function(done){
      agent
	    .get('/stats')
	    .expect('{"/home":"2","/test":"1","/stats":"1"}', done);
  });
});
