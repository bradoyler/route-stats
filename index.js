var redis  = require('redis-url');
var pjson = require('./package.json');
var rClient = null;

if (!!process.env.REDIS_ENDPOINT) {
  rClient = redis.connect(process.env.REDIS_ENDPOINT);
  rClient.on('error', function(err) {
    console.warn('REDIS: Connection failed - ' + err);
  });
  rClient.on('connect', function() {
    console.info('REDIS: Connected at ' + process.env.REDIS_ENDPOINT);
  });
}
else {
  console.warn('No process.env.REDIS_ENDPOINT set, could not connect');
}

module.exports.logFor = function logFor(ttl) {
  return function(req, res, next) {
    var ua = req.headers['user-agent'] || '';
    var host = req.headers.host || '';

    if(rClient) {
      rClient.hincrby('stats:all', req.url, 1);
      rClient.expire('stats:all', ttl);
      rClient.hincrby('stats:hosts', host, 1);
      rClient.hset('stats:hosts', 'version', pjson.version);
      rClient.expire('stats:hosts', ttl);
    }
    next();
  };

};

module.exports.show = function show() {

  return function(req, res, next){
    if(rClient) {
      rClient.multi([
          ["hgetall", "stats:all"],
          ["hgetall", "stats:hosts"]
      ]).exec(function (err, replies) {
          res.stats = replies;
          next();
      });
    }
    else {
      next();
    }
  };
};
