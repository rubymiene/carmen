var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var assert = require('assert');
var termops = require('../lib/util/termops');
var token = require('../lib/util/token');
var tape = require('tape');

module.exports = benchmark;

function benchmark(cb) {
    if (!cb) cb = function() {};
    console.log('# replace tokens');

    suite.add('Permutations all together of 1 token', function() {
        var replacer = token.createReplacer({'Street':'St', 'North':'N'});
        assert.deepEqual(termops.replaceTokenPermutations(replacer, 'North Main Street').sort(), ['North Main Street', 'N Main St', 'North Main St', 'N Main Street'].sort()
        );
    })
    .add('Permutation all together of 3 tokens', function() {
        replacer = token.createReplacer({'Street':'St', 'North':'N', 'Main':'Mn'});
        assert.deepEqual(termops.replaceTokenPermutations(replacer, 'North Main Street').sort(), ['North Main Street', 'N Mn St','N Main St', 'N Mn Street','North Main St', 'N Main Street', 'North Mn Street'].sort());
    })
    .add('SPLIT: (1)create token replacer', function() {
        replacer = token.createReplacer({'First': '1st','Second': '2nd','Third': '3rd','Fourth': '4th','Fifth': '5th','Sixth': '6th','Seventh': '7th','Eigth': '8th','Ninth': '9th','Tenth': '10th','Eleventh': '11th','Twelfth': '12th','Thirteenth': '13th','Fourteenth': '14th','Fifteenth': '15th','Sixteenth': '16th','Seventeenth': '17th','Eighteenth': '18th','Nineteenth': '19th','Twentieth': '20th','Alley': 'Aly','Arcade': 'Arc','Avenue': 'Ave','Bayoo': 'Byu','Beach': 'Bch','Bluff': 'Blf','Bottom': 'Btm','Boulevard': 'Blvd','Branch': 'Br','Bridge': 'Brg','Brook': 'Brk','Brooks': 'Brks','Burg': 'Bg','Burgs': 'Bgs','Bypass': 'Byp','Calle': 'Cll','Camp': 'Cp','Canyon': 'Cyn','Cape': 'Cpe','Causeway': 'Cswy','Center': 'Ctr','Centers': 'Ctrs','Circle': 'Cir','Circles': 'Cirs','Cliff': 'Clf','Cliffs': 'Clfs','Club': 'Clb','Common': 'Cmn','Corner': 'Cor','Course': 'Crse','Court': 'Ct','Courts': 'Cts','Cove': 'Cv','Creek': 'Crk','Crescent': 'Cres','Crest': 'Crst','Crossing': 'Xing','Curve': 'Curv','Dale': 'Dl','Dam': 'Dm','Divide': 'Dv','Drive': 'Dr','Drives': 'Drs','East': 'E','Estate': 'Est','Estates': 'Ests','Expressway': 'Expy','Extension': 'Ext','Extensions': 'Exts','Falls': 'Fls','Ferry': 'Fry','Field': 'Fld','Fields': 'Flds','Flat': 'Flt','Flats': 'Flts','Ford': 'Frd','Forest': 'Frst','Forge': 'Frg','Forges': 'Frgs','Fork': 'Frk','Fort': 'Ft','Freeway': 'Fwy','Grade': 'Grd','Green': 'Grn','Harbor': 'Hbr','Harbors': 'Hbrs','Haven': 'Hvn','Heights': 'Hts','Highway': 'Hwy','Hill': 'Hl','Hills': 'Hls','Hollow': 'Holw','Industrial': 'Ind','Interstate': 'I','Island': 'Is','Islands': 'Iss','Junction': 'Jct','Junctions': 'Jcts','Junior': 'Jr','Key': 'Ky','Keys': 'Kys','Knoll': 'Knl','Knolls': 'Knls','Lake': 'Lk','Lakes': 'Lks','Landing': 'Lndg','Lane': 'Ln','Lieutenant': 'Lt','Light': 'Lgt','Lights': 'Lgts','Loaf': 'Lf','Lock': 'Lck','Locks': 'Lcks','Lodge': 'Ldg','Mall': 'Mal','Manor': 'Mnr','Manors': 'Mnrs','Meadow': 'Mdw','Meadows': 'Mdws','Mill': 'Ml','Mission': 'Msn','Moorhead': 'Mhd','Motorway': 'Mtwy','Mountain': 'Mtn','Mount': 'Mt','Neck': 'Nck','Northeast': 'NE','North': 'N','Northwest': 'NW','Orchard': 'Orch','Overpass': 'Ovps','Parkway': 'Pky','Passage': 'Psge','Place': 'Pl','Plain': 'Pln','Plains': 'Plns','Plaza': 'Plz','Point': 'Pt','Points': 'Pts','Port': 'Prt','Ports': 'Prts','Prairie': 'Pr','Private': 'Pvt','Radial': 'Radl','Ranch': 'Rnch','Rapid': 'Rpd','Rapids': 'Rpds','Rest': 'Rst','Ridge': 'Rdg','Ridges': 'Rdgs','River': 'Riv','Road': 'Rd','Roads': 'Rds','Route': 'Rte','Saint': 'St','Senior': 'Sr','Sergeant': 'Sgt','Shoal': 'Shl','Shoals': 'Shls','Shore': 'Shr','Shores': 'Shrs','Skyway': 'Sky','Southeast': 'SE','South': 'S','Southwest': 'SW','Spring': 'Spg','Springs': 'Spgs','Square': 'Sq','Squares': 'Sqs','Station': 'Sta','Stream': 'Strm','Streets': 'Sts','Street': 'St','Summit': 'Smt','Terrace': 'Ter','Thoroughfare': 'Thfr','Thruway': 'Thwy','Trace': 'Trce','Trafficway': 'Tfwy','Trail': 'Trl','Tunnel': 'Tunl','Turnpike': 'Tpke','Underpass': 'Unp','Unions': 'Uns','Union': 'Un','Valleys': 'Vlys','Valley': 'Vly','Viaduct': 'Via','Views': 'Vws','View': 'Vw','Villages': 'Vlgs','Village': 'Vlg','Ville': 'Vl','Vista': 'Vis','Walkway': 'Wlky','West': 'W','San Francisco': 'sf'});
    })
    .add('SPLIT (2): filtering tokens', function() {
        replacer = token.tokenReplacerFilter(replacer,'North Main Street');
    })
    .add('SPLIT (3): Permutation of US index tokens', function() {
        assert.deepEqual(termops.replaceTokenPermutations(replacer, 'North Main Street').sort(), [ 'North Main Street','N Main St','N Main Street','North Main St' ].sort());
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        cb(null, suite);
    })
    .run();
}

if (!process.env.runSuite) benchmark();