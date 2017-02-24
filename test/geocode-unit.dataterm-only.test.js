var tape = require('tape');
var Carmen = require('..');
var context = require('../lib/context');
var mem = require('../lib/api-mem');
var queue = require('d3-queue').queue;
var addFeature = require('../lib/util/addfeature'),
    queueFeature = addFeature.queueFeature,
    buildQueued = addFeature.buildQueued;

var conf = {
    address: new mem({maxzoom: 6, geocoder_address: 1, geocoder_name:'address'}, function() {})
};
var c = new Carmen(conf);

tape('index address (dataterm only)', function(t) {
    var address = {
        id:100,
        properties: {
            'carmen:text':'-',
            'carmen:center':[0,0],
            'carmen:addressnumber': ['100']
        },
        geometry: {
            type: 'MultiPoint',
            coordinates: [[0,0]]
        }
    };
    queueFeature(conf.address, address, t.end);
});
tape('build queued features', function(t) {
    var q = queue();
    Object.keys(conf).forEach(function(c) {
        q.defer(function(cb) {
            buildQueued(conf[c], cb);
        });
    });
    q.awaitAll(t.end);
});

tape('test address', function(t) {
    c.geocode('100', { limit_verify: 1 }, function(err, res) {
        t.ifError(err);
        t.equals(res.features.length, 0);
        t.end();
    });
});

tape('teardown', function(assert) {
    context.getTile.cache.reset();
    assert.end();
});