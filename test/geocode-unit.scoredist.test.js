// scoredist unit test

var tape = require('tape');
var Carmen = require('..');
var index = require('../lib/index');
var mem = require('../lib/api-mem');
var addFeature = require('../lib/util/addfeature');
var queue = require('queue-async');

(function() {

var conf = {
    address: new mem(null, function() {}),
};
var c = new Carmen(conf);
tape('index address (signal 1)', function(t) {
    addFeature(conf.address, {
        _id:200,
        _text:'main st',
        _zxy:['6/0/0'],
        _score:1000,
        _center:[-179.99,85]
    }, t.end);
});
tape('index address (signal 2)', function(t) {
    addFeature(conf.address, {
        _id:201,
        _text:'main st',
        _zxy:['6/35/32'],
        _score:1000,
        _center:[20,0]
    }, t.end);
});
tape('index address (noise)', function(t) {
    var q = queue(1);
    for (var i = 1; i < 100; i++) q.defer(function(i, done) {
        addFeature(conf.address, {
            _id:i,
            _text:'main st',
            _zxy:['6/32/32'],
            _score:50,
            _center:[0,0]
        }, done);
    }, i);
    q.awaitAll(t.end);
});
tape('geocode proximity=10,10 => superscored', function(t) {
    c.geocode('main st', { proximity:[10,10] }, function (err, res) {
        t.ifError(err);
        t.equals(res.features[0].id, 'address.200', 'found address.200');
        t.end();
    });
});
tape('geocode proximity=20,0 => nearest', function(t) {
    c.geocode('main st', { proximity:[20,0] }, function (err, res) {
        t.ifError(err);
        t.equals(res.features[0].id, 'address.201', 'found address.201');
        t.end();
    });
});
tape('index.teardown', function(assert) {
    index.teardown();
    assert.end();
});

})();
