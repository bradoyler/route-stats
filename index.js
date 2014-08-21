var redis  = require('redis-url');
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

module.exports.logFor = function logFor(ttl) {
  return function(req, res, next) {
    var ua = req.headers['user-agent'] || '';
    if(rClient) {
      rClient.hincrby('sitestats', req.url, 1);
      rClient.expire('sitestats', ttl);
    }
    next();
  };

};

module.exports.show = function show() {
//  type = type ||'';
  return function(req, res, next){
    if(rClient) {
      rClient.hgetall('sitestats', function(err, replies) {
          res.send(replies);
      });
    }
    else {
      next();
    }
  };
};
