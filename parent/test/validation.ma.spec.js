var expect = chai.expect;
describe("Unit Testing Cases", function () {
    //====making this for set interval functionalit
    beforeEach(function () {
        this.clock = sinon.useFakeTimers();
    });

    afterEach(function () {
        this.clock = sinon.restore();
    });


    this.timeout(15000000)
    describe("Validate Functionality for form New User Form", function () {
        //===defining parameter for new_user Form
        document.body.insertAdjacentHTML(
                'afterbegin',
                formNewUser
                );

        //===defining parameter for size chart
        document.body.insertAdjacentHTML(
                'afterbegin',
                sizecharts
                );


        it('Case When Only First Name is there and removed', function () {
            $("#new_user #user_first_name").val("archit")
            $("#new_user #user_first_name").blur();
            expect(objValidate.items["user_first_name"].status).to.be.true
            $("#new_user #user_first_name").val("")
            $("#new_user #user_first_name").blur();
            expect(objValidate.items["user_first_name"].status).to.be.false;
            //======just clicking size chart form to check the code
            $(".size-chart td").click();
        });

        it('Case When Only Last Name is there and removed', function () {
            $("#new_user #user_last_name").val("dugar")
            $("#new_user #user_last_name").blur();
            expect(objValidate.items["user_last_name"].status).to.be.true
            $("#new_user #user_first_name").val("")
            $("#new_user #user_first_name").blur();
            expect(objValidate.items["user_first_name"].status).to.be.false;
        });

       
        it('Case When Only Email is there and ajax call true', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('success', [true]);
            $("#new_user #user_email").val("dugararchit@gmail.com")
            $("#new_user #user_email").blur();
            expect(uniqueness_checked).to.be.equal(1);
            expect(emailPerfect).to.be.true;
            post.restore();
            done();

        });

        it('Case When Only Email is there and ajax call fails', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('success', [false]);
            $("#new_user #user_email").val("dugararchit@gmail.com")
            $("#new_user #user_email").blur();
            expect(uniqueness_checked).to.be.equal(0);
            expect(emailPerfect).to.be.false;
            post.restore();
            done();
        });
        
        
        it('Case When wrong email domain is entered', function () {
            $("#new_user #user_email").val("dugararchit@archit.actorsssss")
            $("#new_user #user_email").blur();
            expect(objValidate.items["user_email"].status).to.be.false
        });
        
        
        it('Case When right email domain is entered but different one ', function () {
            $("#new_user #user_email").val("dugararchit@archit.actor")
            $("#new_user #user_email").blur();
            expect(objValidate.items["user_email"].status).to.be.true
        });

        it('Case When email entered is not right', function () {
            $("#new_user #user_email").val("dugararchitgmail.com")
            $("#new_user #user_email").blur();
            expect(objValidate.items["user_email"].status).to.be.false
        });
        
        it('Case when us zip is not entered correctly', function () {
            $("#new_user #user_client_attributes_shipping_postcode").val("941075")
            $("#new_user #user_client_attributes_shipping_postcode").blur();
            expect(objValidate.items["user_client_attributes_shipping_postcode"].status).to.be.false
        });


        
        it('Case when all values are filled and form submitted', function (done) {
            $('#new_user').attr("action", "https://www.stitchfix.com/?utm_campaign=68ba126472fa2d9a8bb75a848dbd29cd&amp;&amp;utm_medium=other");
            var post = sinon.stub(jQuery, 'ajax');
            post.yieldsTo('success', {"success": true, "postal_code": null, "is_mobile": false});
            $("#new_user #user_first_name").val("archit")
            $("#new_user #user_last_name").val("dugar")
            $("#new_user #user_email").val("archiasd@gmail.com")
            $("#new_user #user_client_attributes_shipping_postcode").val("94107")
            $(".rbtn-scale[value=39]").parent().addClass("active");
            $(".rbtn-scale[value=39]").attr("checked", "checked");
            $("#new_user .submit").click();
            post.restore();
            done();
            this.clock.tick(550);
            expect(objValidate.status).to.be.true
        });
        
        it('Case when all values are filled but form not submitted', function (done) {
            var post = sinon.stub(jQuery, 'ajax');
            post.yieldsTo('success', {"success": true, "postal_code": null, "is_mobile": false});
            $("#new_user #user_first_name").val("archit")
            $("#new_user #user_last_name").val("dugar")
            //===wrong is entered
            $("#new_user #user_email").val("archiacom")
            $("#new_user #user_client_attributes_shipping_postcode").val("94107")
            $(".rbtn-scale[value=39]").parent().addClass("active");
            $(".rbtn-scale[value=39]").attr("checked", "checked");
            $("#new_user .submit").click();
            expect(objValidate.status).to.be.false
            post.restore();
            done();
            this.clock.tick(550);
        });
        
        it('Case when all values are filled and covering case with no query params', function (done) {
            $('#new_user').attr("action", "https://www.stitchfix.com/");
            var post = sinon.stub(jQuery, 'ajax');
            post.yieldsTo('success', {"success": true, "postal_code": null, "is_mobile": false});
            $("#new_user #user_first_name").val("archit")
            $("#new_user #user_last_name").val("dugar")
            //===wrong is entered
            $("#new_user #user_email").val("archia@gmail.com")
            $("#new_user #user_client_attributes_shipping_postcode").val("94107")
            $(".rbtn-scale[value=39]").parent().addClass("active");
            $(".rbtn-scale[value=39]").attr("checked", "checked");
            $("#new_user .submit").click();
            expect(objValidate.status).to.be.true
            post.restore();
            done();
            this.clock.tick(550);
        });
        



    });

    describe("Validate Functionality for form New User Pop Up Form", function () {
        //======cases for pop up form

        document.body.insertAdjacentHTML(
                'afterbegin',
                formNewUserPop
                );
        it('Case When Only First Name is there and removed', function () {
            $("#new_user_pop #user_first_name").val("dugar")
            $("#new_user_pop #user_first_name").blur();
            expect(objValidatePop.items["user_first_name"].status).to.be.true
            $("#new_user_pop #user_first_name").val("")
            $("#new_user_pop #user_first_name").blur();
            expect(objValidatePop.items["user_first_name"].status).to.be.false;
        });

        it('Case When Only Last Name is there and removed', function () {
            $("#new_user_pop #user_last_name").val("dugar")
            $("#new_user_pop #user_last_name").blur();
            expect(objValidatePop.items["user_last_name"].status).to.be.true
            $("#new_user_pop #user_last_name").val("")
            $("#new_user_pop #user_last_name").blur();
            expect(objValidatePop.items["user_last_name"].status).to.be.false;
        });

        it('Case When Only Email is there and removed', function () {
            $("#new_user_pop #user_email").val("dugararchit@gmail.com")
            $("#new_user_pop #user_email").blur();
            expect(objValidatePop.items["user_email"].status).to.be.true
            $("#new_user_pop #user_email").val("")
            $("#new_user_pop #user_email").blur();
            expect(objValidatePop.items["user_email"].status).to.be.false;
        });

      
        it('Case when all values are filled and form submitted', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('success', [true]);
            $('#new_user_pop').attr("action", "https://www.stitchfix.com/?utm_campaign=68ba126472fa2d9a8bb75a848dbd29cd&amp;&amp;utm_medium=other");
            $("#new_user_pop #user_first_name").val("archit")
            $("#new_user_pop #user_last_name").val("dugar")
            $("#new_user_pop #user_email").val("archiasd@gmail.com")
            $("#new_user_pop .submit").click();
            expect(objValidatePop.status).to.be.true
            post.restore();
            done();
            this.clock.tick(550);
        });
        
        it('Case when all values are filled and something went wrong', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('success', [true]);
            $("#new_user_pop #user_first_name").val("archit")
            $("#new_user_pop #user_last_name").val("dugar")
            $("#new_user_pop #user_email").val("archiasd")
            $("#new_user_pop .submit").click();
            expect(objValidatePop.status).to.be.false
            post.restore();
            done();
            this.clock.tick(550);
        });
        
        it('Case when all values are filled and form submitted with no query params in the action string', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('success', [true]);
            $('#new_user_pop').attr("action", "https://www.stitchfix.com/");
            $("#new_user_pop #user_first_name").val("archit")
            $("#new_user_pop #user_last_name").val("dugar")
            $("#new_user_pop #user_email").val("archiasd@gmail.com")
            //console.log($(".rbtn-scale-pop").parent())
            $(".rbtn-scale-pop").parent().removeClass("active");
            $(".rbtn-scale-pop").attr("checked","");
            $("#new_user_pop .submit").click();
            expect(objValidatePop.status).to.be.true
            post.restore();
            done();
            this.clock.tick(550);
        });
    });

});