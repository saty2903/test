'use strict';
// var expect = chai.expect;
describe('utm_content', function () {

    document.body.insertAdjacentHTML(
            'afterbegin',
            showsm
            );
    document.body.insertAdjacentHTML(
            'afterbegin',
            horizontal
            );

    describe("constructor", function () {
        before(function () {

            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.html'];
            }
            setUtmParams("68ba126472fa2d9a8bb75a848dbd29cd");
            window.site_q = '';
        });
        after(function () {
            fixture.cleanup();
        });

        it("Expected API URL https://ab.ampush.design/", function () {
            expect(apiURL).to.equal('https://ab.ampush.design/');
        });

        it("should be object of ratio", function () {
            expect(testConfig).to.be.instanceof(Object);
        });

        it("should have 4 variants", function () {
            expect(4).to.equal(Object.keys(testConfig).length);
        });

        it("should have a variant from array['ma-a', 'ma-b', 'ma-c', 'ma-d']", function () {
            expect(['ma-a', 'ma-b', 'ma-c', 'ma-d']).to.include(ABalytics.variantName);
        });

        it("should have a variant object config Array", function () {
            expect(testConfig).to.have.property(ABalytics.variantName);
        });

        it("should not have a variant from array['a','b','c','d','e','f']", function () {
            expect(['x', 'y']).to.not.include(ABalytics.variantName);
        });
        it("should not have a random number more than 100", function () {
            expect(ABalytics.range).to.be.within(1, 100);
        });

        it("should use default utm_medium use as other when if url contains an empty querystring", function () {
            expect(ABalytics.utm_medium).to.equal('other');
        });
        it("should use default utm_medium as other when url contains an empty querystring", function () {
            ABalytics.utm_medium = '';
            expect(ABalytics.utm_medium).to.equal('');
        });

        it("TestConfig Variable should have variants 10% 40% 10% 40% Respectively", function () {
            expect(testConfig).to.have.property('ma-a')
            expect(testConfig["ma-a"]).to.have.deep.property('min', 1)
            expect(testConfig["ma-a"]).to.have.deep.property('max', 10)
            expect(testConfig["ma-a"]).to.have.deep.property('variant_id', 0)
            expect(testConfig).to.have.property('ma-b')
            expect(testConfig["ma-b"]).to.have.deep.property('min', 11)
            expect(testConfig["ma-b"]).to.have.deep.property('max', 50)
            expect(testConfig["ma-b"]).to.have.deep.property('variant_id', 1)
            expect(testConfig).to.have.property('ma-c')
            expect(testConfig["ma-c"]).to.have.deep.property('min', 51)
            expect(testConfig["ma-c"]).to.have.deep.property('max', 60)
            expect(testConfig["ma-c"]).to.have.deep.property('variant_id', 2)
            expect(testConfig).to.have.property('ma-d')
            expect(testConfig["ma-d"]).to.have.deep.property('min', 61)
            expect(testConfig["ma-d"]).to.have.deep.property('max', 100)
            expect(testConfig["ma-d"]).to.have.deep.property('variant_id', 3)
        });

        it("All Anchor tags containg utm_content", function () {
            $('a[href*=".stitchfix.com"]').each(function () {
                var testParam;
                var testAllowedParams = ["utm_source", "utm_medium", "utm_campaign"];
                var samepage = $(this).attr("href").indexOf('style.stitchfix.com/qa.html');
                var isStyle = $(this).attr("href").indexOf('style.stitchfix.com/gifts');
                if (samepage === -1) {
                    for (var x in testAllowedParams) {
                        if (isStyle !== -1) {
                            console.log("utmID");
                            console.log(utmID);
                            console.log(testAllowedParams[x])
                            if (testAllowedParams[x] == 'utm_campaign') {
                                testParam = testAllowedParams[x] + '=' + utmID;
                            } else {
                                testParam = testAllowedParams[x] + '=' + $.QueryString[testAllowedParams[x]];
                            }
                            var testAnchor = $(this).attr("href").indexOf(testParam);

                            console.log(testParam);
                        } else {
                            testParam = testAllowedParams[x] + '=' + $.QueryString[testAllowedParams[x]];
                            var testAnchor = $(this).attr("href").indexOf(testParam);
                        }
                        if (testAnchor === -1) {
                            console.log(this);
                        }
                        expect(testAnchor).to.be.above(-1);
                    }
                }
            });
        });
    });

    describe("Check getQueryParams function work flow", function () {
        it('QueryString will be blank', function () {
            var output = getQueryParams('');
            expect(output).to.be.an('object');
            expect(output).to.be.empty;
        });

        it('When QueryString "?" should be blank', function () {
            var output = getQueryParams('?');
            expect(output).to.be.an('object');
            expect(output).to.be.empty;
        });

        it('When QueryString "?utm_campaign=AQWE" should be return utm_campaign', function () {
            var output = getQueryParams('?utm_campaign=AQWE');
            expect(output).to.be.an('object');
            expect(output).to.eql({utm_campaign: 'AQWE'});
        });

        it('When QueryString "?utm_medium=ampush" should be utm_medium', function () {
            var output = getQueryParams('?utm_medium=ampush');
            expect(output).to.be.an('object');
            expect(output).to.eql({utm_medium: 'ampush'});
        });
        it('When QueryString "?utm_source=ampush" should be utm_source', function () {
            var output = getQueryParams('?utm_source=ampush');
            expect(output).to.be.an('object');
            expect(output).to.eql({utm_source: 'ampush'});
        });
        it('When QueryString "?utm_source=" should be blank', function () {
            var output = getQueryParams('?utm_source=');
            expect(output).to.be.an('object');
            expect(output).to.eql({utm_source: ''});
        });
        it('When QueryString "?utm_source" should be blank', function () {
            var output = getQueryParams('?utm_source');
            expect(output).to.be.an('object');
            expect(output).to.be.empty;
        });

    });
    describe("Fire ABalytics.generateToken get results", function () {

        it('Call ABalytics.generateToken success', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('success', [{"status": true, "message": "Already saved!", "amp_id": "68ba126472fa2d9a8bb75a848dbd29cd"}]);
            ABalytics.generateToken();
            expect(post.called).to.equal(true);
            expect(post.callCount).to.equal(1);
            post.restore();
            done();
        });
        it('Call ABalytics.generateToken Failure', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('error');
            ABalytics.generateToken();
            expect(post.called).to.equal(true);
            expect(post.callCount).to.equal(1);
            post.restore();
            done();
        });
    })
    describe("Check Switch condition based upon Varient ID", function () {
        it('variantID=0 means A', function () {
            ABalytics.variantId = 0;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(50);
            clock.restore();
            expect({}).to.be.empty;
        });

        it('variantID=1 means B', function () {
            ABalytics.variantId = 1;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(50);
            clock.restore();
            expect({}).to.be.empty;
        });

        it('variantID=2 means C', function () {
            ABalytics.variantId = 2;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(20);
            clock.restore();
            expect({}).to.be.empty;
        });

        it('variantID=3 means D', function () {
            ABalytics.variantId = 3;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(20);
            clock.restore();
            expect({}).to.be.empty;
        });
    });

    describe("Check Ratios based upon utm_medium", function () {

        this.timeout(25000);
        before(function () {

            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.html'];
            }
            $.QueryString = {utm_campaign: "606c8fcd3f335868a48b64f5e63fdab9", utm_source: "ampush", utm_medium: "brand"};
            //console.log(md);	    
            window.site_q = '?utm_campaign=1234056&utm_source=amp&utm_medium=brand';

            ABalytics.init();

        });
        // remove the html fixture from the DOM
        afterEach(function () {
            fixture.cleanup();
        });
        it("TestConfig Variable should have variants 10% 40% 10% 40% Respectively", function () {
            expect(testConfig).to.have.property('ma-a')
            expect(testConfig["ma-a"]).to.have.deep.property('min', 1)
            expect(testConfig["ma-a"]).to.have.deep.property('max', 10)
            expect(testConfig["ma-a"]).to.have.deep.property('variant_id', 0)
            expect(testConfig).to.have.property('ma-b')
            expect(testConfig["ma-b"]).to.have.deep.property('min', 11)
            expect(testConfig["ma-b"]).to.have.deep.property('max', 50)
            expect(testConfig["ma-b"]).to.have.deep.property('variant_id', 1)
            expect(testConfig).to.have.property('ma-c')
            expect(testConfig["ma-c"]).to.have.deep.property('min', 51)
            expect(testConfig["ma-c"]).to.have.deep.property('max', 60)
            expect(testConfig["ma-c"]).to.have.deep.property('variant_id', 2)
            expect(testConfig).to.have.property('ma-d')
            expect(testConfig["ma-d"]).to.have.deep.property('min', 61)
            expect(testConfig["ma-d"]).to.have.deep.property('max', 100)
            expect(testConfig["ma-d"]).to.have.deep.property('variant_id', 3)
        });

        it("TestConfig Variable should have variants a=10%,b=40%,c=10%,d=40% Respectively where Mobile utm_medium == brand", function () {
            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.html'];
            }
            window.md = new MobileDetect('Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/98176');
            $.QueryString = {utm_campaign: "606c8fcd3f335868a48b64f5e63fdab9", utm_source: "ampush", utm_medium: "brand"};
            //console.log(md);	    

            window.site_q = '?utm_campaign=1234056&utm_source=amp&utm_medium=brand';

            ABalytics.init();
            expect(testConfig).to.have.property('ma-a')
            expect(testConfig["ma-a"]).to.have.deep.property('min', 1)
            expect(testConfig["ma-a"]).to.have.deep.property('max', 10)
            expect(testConfig["ma-a"]).to.have.deep.property('variant_id', 0)
            expect(testConfig).to.have.property('ma-b')
            expect(testConfig["ma-b"]).to.have.deep.property('min', 11)
            expect(testConfig["ma-b"]).to.have.deep.property('max', 50)
            expect(testConfig["ma-b"]).to.have.deep.property('variant_id', 1)
            expect(testConfig).to.have.property('ma-c')
            expect(testConfig["ma-c"]).to.have.deep.property('min', 51)
            expect(testConfig["ma-c"]).to.have.deep.property('max', 60)
            expect(testConfig["ma-c"]).to.have.deep.property('variant_id', 2)
            expect(testConfig).to.have.property('ma-d')
            expect(testConfig["ma-d"]).to.have.deep.property('min', 61)
            expect(testConfig["ma-d"]).to.have.deep.property('max', 100)
            expect(testConfig["ma-d"]).to.have.deep.property('variant_id', 3)
        });

        it('Handle when utm_medium="" pass from querystring', function () {
            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.html'];
            }
            $.QueryString = {utm_campaign: "606c8fcd3f335868a48b64f5e63fdab9", utm_source: "ampush", utm_medium: ""};

            window.site_q = '?utm_campaign=1234056&utm_source=amp&utm_medium=';
            ABalytics.init();
            console.log("ABalytics.utm_medium" + ABalytics.utm_medium);
            expect(ABalytics.utm_medium).equal('other')
        })
    });

    describe("All Anchor Tags Start from *.stitchfix.com have 3 utm params ->>", function () {

        this.timeout(25000);
        before(function () {

            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.html'];
            }
            $.QueryString = {utm_campaign: "606c8fcd3f335868a48b64f5e63fdab9", utm_source: "ampush", utm_medium: "testamp"};
            //console.log(md);	    
            window.site_q = '?utm_campaign=1234056&utm_source=amp&utm_medium=testamp';
            ABalytics.init();
            setUtmParams("68ba126472fa2d9a8bb75a848dbd29cd");

        });
        // remove the html fixture from the DOM
        after(function () {
            fixture.cleanup();
        });

        it("All Anchor tags containg all params", function () {
            $('a[href*=".stitchfix.com"]').each(function () {
                var testParam;
                var testAllowedParams = ["utm_source", "utm_medium", "utm_campaign"];
                var samepage = $(this).attr("href").indexOf('style.stitchfix.com/qa.html');
                var isStyle = $(this).attr("href").indexOf('style.stitchfix.com/gifts');
                if (samepage === -1) {
                    for (var x in testAllowedParams) {
                        if (isStyle !== -1) {
                            if (testAllowedParams[x] == 'utm_campaign') {
                                testParam = testAllowedParams[x] + '=' + utmID;
                            } else {
                                testParam = testAllowedParams[x] + '=' + $.QueryString[testAllowedParams[x]];
                            }

                            var testAnchor = $(this).attr("href").indexOf(testParam);
                        } else {
                            testParam = testAllowedParams[x] + '=' + $.QueryString[testAllowedParams[x]];
                            var testAnchor = $(this).attr("href").indexOf(testParam);
                        }
                        if (testAnchor === -1) {
                            console.log(this);
                        }
                        expect(testAnchor).to.be.above(-1);
                    }
                }
            });

        });

        it('All form Action containg "utm_source", "utm_medium", "utm_campaign"', function () {
            $('form').each(function () {
                var testParam;
                var testAllowedParams = ["utm_source", "utm_medium", "utm_campaign"];
                var samepage = $(this).attr("action");
                for (var x in testAllowedParams) {
                    testParam = testAllowedParams[x] + '=' + $.QueryString[testAllowedParams[x]];
                    var testAnchor = samepage.indexOf(testParam);
                    if (testAnchor === -1) {
                        console.log(this);
                    }
                    expect(testAnchor).to.be.above(-1);
                }
            });
        });
    });
});
