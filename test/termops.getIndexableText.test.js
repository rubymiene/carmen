var termops = require('../lib/util/termops');
var token = require('../lib/util/token');
var test = require('tape');

test('termops.getIndexableText', function(assert) {
    var replacer;
    var doc;
    var texts;

    replacer = token.createReplacer({});
    doc = { properties: { 'carmen:text': 'Main Street' } };
    texts = [
        { languages: [ 'all' ], tokens: [ 'main', 'street' ] }
    ];
    assert.deepEqual(termops.getIndexableText(replacer, [], doc), texts, 'creates indexableText');

    replacer = token.createReplacer({'Street':'St'});
    doc = { properties: { 'carmen:text': 'Main Street' } };
    texts = [
        { languages: [ 'all' ], tokens: [ 'main', 'st' ] }
    ];
    assert.deepEqual(termops.getIndexableText(replacer, [], doc), texts, 'creates contracted phrases using geocoder_tokens');

    replacer = token.createReplacer({'Street':'St'});
    doc = { properties: { 'carmen:text': 'Main Street, main st' } };
    texts = [
        { languages: [ 'all' ], tokens: [ 'main', 'st' ] }
    ];
    assert.deepEqual(termops.getIndexableText(replacer, [], doc), texts, 'dedupes phrases');

    replacer = token.createReplacer({'Street':'St', 'Lane':'Ln'});
    doc = { properties: { 'carmen:text': 'Main Street Lane' } };
    texts = [
        { languages: [ 'all' ], tokens: [ 'main', 'st', 'ln' ] }
    ];
    assert.deepEqual(termops.getIndexableText(replacer, [], doc), texts, 'dedupes phrases');

    replacer = token.createReplacer({'dix-huitième':'18e'});
    doc = { properties: { 'carmen:text': 'Avenue du dix-huitième régiment' } };
    texts = [
        { languages: [ 'all' ], tokens: [ 'avenue', 'du', '18e', 'régiment' ] }
    ];
    assert.deepEqual(termops.getIndexableText(replacer, [], doc), texts, 'hypenated replacement');

    replacer = token.createReplacer({});
    doc = {
        properties: {
            'carmen:text':'Main Street',
            'carmen:addressnumber': [[1, 10, 100, 200]]
        }
    };
    texts = [
        { languages: [ 'all' ], tokens: ['2##', 'main', 'street' ] },
        { languages: [ 'all' ], tokens: ['1##', 'main', 'street' ] },
        { languages: [ 'all' ], tokens: ['##', 'main', 'street' ] },
        { languages: [ 'all' ], tokens: ['#', 'main', 'street' ] },
    ];
    assert.deepEqual(termops.getIndexableText(replacer, [],  doc), texts, 'with range');

    replacer = token.createReplacer({});
    doc = { properties: { 'carmen:text': 'Main Street', 'carmen:text_es': 'El Main Street' } };
    texts = [
        { languages: [ 'default' ], tokens: [ 'main', 'street' ] },
        { languages: [ 'es' ], tokens: [ 'el', 'main', 'street' ] }
    ];
    assert.deepEqual(termops.getIndexableText(replacer, [], doc), texts, 'in the presence of translations, plain carmen:text has language "default" and translations are language-specific');

    replacer = token.createReplacer({});
    doc = { properties: { 'carmen:text': 'Latveria,Republic of Latveria' } };
    texts = [
        { languages: [ 'all' ], tokens: [ 'latveria' ] },
        { languages: [ 'all' ], tokens: [ 'republic', 'of', 'latveria' ] }
    ];
    assert.deepEqual(termops.getIndexableText(replacer, [], doc), texts, 'creates indexableText w/ synonyms');

    replacer = token.createReplacer({});
    doc = { properties: { 'carmen:text': 'New York', 'carmen:text_es': 'Nueva York', 'carmen:text_en': 'New York' } };
    texts = [
        { languages: [ 'default', 'en' ], tokens: [ 'new', 'york' ] },
        { languages: [ 'es' ], tokens: [ 'nueva', 'york' ] }
    ];
    assert.deepEqual(termops.getIndexableText(replacer, [], doc), texts, 'translations with phrase overlaps are properly grouped');

    assert.end();
});

