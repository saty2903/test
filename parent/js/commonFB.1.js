//============initializing all the valiables
var response = "";
var fb_access_token = '';
//============setting fb response variable from outside for not blocking popups
var setFbresponse = setInterval(function () {
    //console.log("Checking if FB var is ready..."+counter+" Second");
    if (typeof (FB) != "undefined") {
        console.log("FB Login Ready");
        clearInterval(setFbresponse);
        FB.getLoginStatus(function (response1) {
            response = response1;
        });
    }
}, 100);

//============defining form name and postal code variable
$(document).on("focus", "#user_first_name, #user_last_name, #user_email", function () {
    var formname = $(this).closest("form").attr("id");
    var zipcode = $("#" + formname + " #user_client_attributes_shipping_postcode");
    if (zipcode.val().length == 0) {
        //zipcode.val(postalCode);
    }
});

//============initializing fb login
window.fbAsyncInit = function () {
    FB.init({
        appId: '377137202389790',
       // appId: '1601105783520660',
        cookie: true,
        xfbml: true,
        version: 'v2.5'
    });
};

//============Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//============function after clicking
function checkLoginState(buttonstats, formId) {
    if (formId == "undefined") {
        $(buttonstats).siblings(".submit").trigger("click");
        if ($(buttonstats).siblings(".submit").hasClass("gstarted") == true) {
            formId = "new_user";
        } else {
            formId = "new_user_pop";
        }
    }
   
   // if( typeof response.authResponse != 'undefined' && typeof response.authResponse.accessToken != 'undefined' )
   //     fb_access_token = response.authResponse['accessToken'];
    
    if (response.status != "connected") {
        FB.login(function (response) {
            if (response.status === 'connected') {
                //fb_access_token = response.authResponse['accessToken'];
                datafetched(formId);
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'email'})
    } else {
        datafetched(formId);
    }
}

//============final fetched data
function datafetched(formId) {
    FB.api('/me', {fields: "email, first_name, last_name"}, function (response) {
        var firstname = response["first_name"];
        var lastname = response["last_name"];
        var email = response["email"];
        $("#" + formId + " #user_first_name").val(firstname);
        $("#" + formId + " #user_last_name").val(lastname);
        $("#" + formId + " #user_email").val(email);
        //$("#" + formId + " #user_fb_oauth_token").val(fb_access_token);
        var checkfocus = 0;
        uniqueness_checked = 0;
        objValidatePop.status = true;
        objValidate.status = true;
        var formarray = new Array("user_first_name", "user_last_name", "user_email");
        for (tmp in formarray) {
            if (formId == "new_user_pop") {
                //var objValidatePop = new validate(itemsConfigPop);
                objValidatePop.applyValidation(formarray[tmp]);
            } else if (formId == "new_user") {
                //var objValidate = new validate(itemsConfig);
                objValidate.applyValidation(formarray[tmp]);
            }

            if ($("#" + formId + " #" + formarray[tmp]).val().trim() == "" && checkfocus == 0) {
                checkfocus = 1;
                $("#" + formId + " #" + formarray[tmp]).focus()
            }
        }
        if ($("#" + formId + " #user_client_attributes_shipping_postcode").val().length == 0) {
           // $("#" + formId + " #user_client_attributes_shipping_postcode").val(postalCode);
        }
        if ($("#" + formId + " .facebook-f-logo").length > 0) {
            $("#" + formId + " .facebook-f-logo").addClass("clicked");
            $("#" + formId + " #facebook_signup").addClass("clicked").text("FACEBOOK CONNECTED");
        }

        if (formId == "new_user") {
            var setIntervalform = setInterval(function () {
                if (uniqueness_checked == 1 && objValidate.status == true && emailPerfect == true) {
                    if ($(".rbtn-scale[type=radio]:checked").length > 0) {
                        clearInterval(setIntervalform);
                        $("#" + formId + " .submit").trigger("click");
                    }else{
                        clearInterval(setIntervalform);
                    }
                } else if (emailPerfect == false || objValidate.status == false) {
                    clearInterval(setIntervalform);
                }
            }, 30)
        } else if (formId == "new_user_pop") {
            var setIntervalformPop = setInterval(function () {
                if (uniqueness_checked == 1 && objValidatePop.status == true && emailPerfect == true) {
                    clearInterval(setIntervalformPop);
                    $("#" + formId + " .submit").trigger("click");
                } else if (emailPerfect == false || objValidatePop.status == false) {
                    clearInterval(setIntervalformPop);
                }
            }, 30)
        }
        //if (uniqueness_checked == 1 && objValidate.status == true && emailPerfect == true) {
        //$("#" + formId + " .submit").trigger("click");
        //}
    });
}
//============end of controlling fb login

