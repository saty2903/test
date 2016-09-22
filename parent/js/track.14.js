//live
//  Facebook
!function (f, b, e, v, n, t, s) {
    if (f.fbq)
        return;
    n = f.fbq = function () {
        n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    };
    if (!f._fbq)
        f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s)
}(window,
        document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1788766331342814');
fbq('trackCustom', "LandingPageVisit");

//Google Analytics

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');


function getUtmQParams() {
    var q = site_q;
    var q_params = getQueryParams(site_q);
    q_params["utm_campaign"] = utmToken;
    var c_params = getCookie("utm_params");
    c_params = c_params != "" ? JSON.parse(c_params) : {};
    if (site_q == "" || site_q == "?" || Object.keys(q_params).length == 0 || !("utm_campaign" in q_params)) {
        if ("utm_id" in c_params) {
            c_params["utm_campaign"] = c_params["utm_id"];
            delete c_params["utm_id"];
        }

        q_params = c_params;
    } else {
        if ("utm_id" in c_params) {
            q_params["utm_campaign"] = c_params["utm_id"];
            delete c_params["utm_id"];
        }
    }


    q_params["utm_source"] = "ampush";
    if (!("utm_medium" in q_params)) {
        q_params["utm_medium"] = 'other';
    }

    if( "utm_content" in q_params ){
        delete q_params["utm_content"];
    }
    
    return q_params;
}
var utmQParams = getUtmQParams();
var utmQParamsC = JSON.parse(JSON.stringify(utmQParams));

//sanfrancisco detail code-----state:CA; areacode:415; zip:94107
//var postalCode = "94107";
var DefaultPostalCode = "94107",
    postalCode = "";
!function () {
    var t = document.createElement("script");
    t.setAttribute("type", "text/javascript");
    t.setAttribute("src", "//files.ampush.io/tracker.js?" + (new Date).valueOf());
    "undefined" != typeof t && document.getElementsByTagName("head")[0].appendChild(t);
    t.onload = function () {
        var ampt_parmas = {"extra": 1, "test": testCases[0], "variant": ABalytics.variantName};
        var q_params = getUtmQParams();
        for (var x in q_params) {
            if ($.inArray(x, allowedParams) >= 0) {
                ampt_parmas[x] = q_params[x];
            }
        }
        ampt.getPinCodeResponse = function () {
            $.ajax({
                type: "GET",
                url: "https://ampush.io/track?extra=1",
                success: function (data, textStatus, xhr) {
                    if (data["success"] == true) {
                        if (data["postal_code"] != null) {
                            DefaultPostalCode = data["postal_code"];
                            postalCode = data["postal_code"];
                        }
                    }
                    $("body #user_client_attributes_shipping_postcode").each(function () {
                        if ($(this).attr("type") == "hidden") {
                            $(this).val(DefaultPostalCode)
                        }
                    })
                },
                error: function (xhr, status, error) {
                    console.log(xhr, status, xhr.responseText)
                }
            });
        };
        ampt.init("stitchfix"), ampt.pageview(ampt_parmas)
        ampt.getPinCodeResponse();
        //fire google page view
        ga('create', 'UA-81042412-1', 'auto');
        var dimensionValue = ABalytics.variantName;
        ga('set', 'dimension1', dimensionValue);
        ga('send', 'pageview');
    }
}();

// Bing
(function (w, d, t, r, u) {
    var f, n, i;
    w[u] = w[u] || [], f = function () {
        var o = {ti: "5284076"};
        o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad")
    }, n = d.createElement(t), n.src = r, n.async = 1, n.onload = n.onreadystatechange = function () {
        var s = this.readyState;
        s && s !== "loaded" && s !== "complete" || (f(), n.onload = n.onreadystatechange = null)
    }, i = d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n, i)
})(window, document, "script", "//bat.bing.com/bat.js", "uetq");
// Google
/* <![CDATA[ */
goog_snippet_vars = function () {
    var w = window;
    w.google_conversion_id = 879950942;
    w.google_conversion_label = "pdxBCLr0jmgQ3vjLowM";
    w.google_remarketing_only = false;
}
// DO NOT CHANGE THE CODE BELOW.
goog_report_conversion = function (url) {
    goog_snippet_vars();
    window.google_conversion_format = "3";
    var opt = new Object();
    opt.onload_callback = function () {
        if (typeof (url) != 'undefined') {
            window.location = url;
        }
    }
    var conv_handler = window['google_trackConversion'];
    if (typeof (conv_handler) == 'function') {
        conv_handler(opt);
    }
}


$(document).ready(function () {
    $("body").find(".linkFB, #fb-button").each(function () {
        var formid = $(this).closest("form").attr("id");
        $(this).attr("href", "javascript:void(0)");
        $(this).attr("onclick", "checkLoginState(this, '" + formid + "')");
    });
    
    $(".linkFB, #fb-button").click(function () {
        ampt.click('FBSignUp');
    });

    $(".get-started").click(function () {
        ampt.click('getStarted');
    });
    
    $(".getStart-pop-close").click(function () {
        ampt.click('QuizBegin_pop_close');
    });
});

function eventONSubmit(formData) {
    var formData = formData || '';
    // Facebook Pixel Code for navigating to the Style Quiz
    fbq('trackCustom', 'QuizBegin');
    goog_report_conversion();
    ampt.click('QuizBegin', {"formData": formData});
    //Bing
    (function (w, d, t, r, u) {
        var f, n, i;
        w[u] = w[u] || [], f = function () {
            var o = {ti: "5284077"};
            o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad")
        }, n = d.createElement(t), n.src = r, n.async = 1, n.onload = n.onreadystatechange = function () {
            var s = this.readyState;
            s && s !== "loaded" && s !== "complete" || (f(), n.onload = n.onreadystatechange = null)
        }, i = d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n, i)
    })(window, document, "script", "//bat.bing.com/bat.js", "uetq");
}

function chReferer() {
    if (site_url.indexOf("?") > 0) {
        var clean_url = site_url.substring(0, site_url.indexOf("?"));
        window.history.replaceState({}, document.title, clean_url);
    }
}
