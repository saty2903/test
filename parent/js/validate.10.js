/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var ifblur = 0; var pretld='com';
var uniqueness_checked = 0;
var emailPerfect = true;
function check_uniqueness_bottom(item) {
    check_uniqueness(item, "#new_user");
}

function check_uniqueness_pop(item) {
    check_uniqueness(item, "#new_user_pop");
}

function check_uniqueness(item, frmSelector) {
    var selector = item.selector;
    var tmpu = $(".login").first().attr("href").split("?");
    var offsetQ = "";
    if (tmpu.length > 1) {
        offsetQ = tmpu[1];
    }
    var msg = 'Email is already taken. <a href="https://www.stitchfix.com/login?' + offsetQ + '" title="Log In">Sign in?</a>';
    var targetUrl = "http://localhost/amp/html/stitchfix_new/validate_uniqueness.php";
    targetUrl = "http://localhost:3000/validate_uniqueness";
    if (window.location.hostname != 'localhost') {
        targetUrl = "https://ab.ampush.design/validate_uniqueness";
    }
    targetUrl = 'https://www.stitchfix.com/users/validate_uniqueness';
    //targetUrl = "http://stitchfixlocalhost.com/validate_uniqueness.php";
    var sData = $(frmSelector).serializeArray();
    var data = {};
    for (var x in sData) {
        var item = sData[x];
        data[item.name] = item.value;
    }
    //console.log(data);
    //console.log(data);
    data = JSON.stringify(data);
    data = $(frmSelector).serialize();
    var cu = $.ajax({
        type: "POST",
        beforeSend: function (request)
        {
            //   request.setRequestHeader("Host", 'www.stitchfix.com');
        },
        url: targetUrl,
        data: data,
        "method": "post",
        success: function (r) {
            if (r == 'false' || r == false) {
                uniqueness_checked = 0;
                emailPerfect = false;
                setErrMsg(selector, msg);
            } else{
                emailPerfect = true;
                uniqueness_checked = 1;
                setErrMsg(selector, '');
            }
            //console.log(msg);


        }
    });
    cu.fail(function (jqXHR, textStatus) {
        //setErrMsg(selector, '');
        setErrMsg(selector, 'Server Error');
    });

}

function getErrTag(msg) {
    return "<div class='error-msg' style='color:#ff5c61;font-size:11pt'><em><span>" + msg + "</span></em></div>";
}
function emptyErrTag(item) {
    return $(item).parent().find(".error-msg").find("span").html("");
}
function setErrMsg(item, msg) {
    if ($(item).parent().find(".error-msg").length) {
        $(item).parent().find(".error-msg").find("span").html(msg);
    } else {
        $(item).parent().append(getErrTag(msg));
    }
    return true;
}

var itemsConfig = {
    "user_first_name": {
        "selector": "#new_user #user_first_name"
        , "rules": {"empty": {"message": "This is a required field"}}
        , "validate_on_blur": true
    },
    "user_last_name": {
        "selector": "#new_user #user_last_name"
        , "rules": {"empty": {"message": "This is a required field"}}
    },
    "user_email": {
        "selector": "#new_user #user_email"
        , "rules": {
            "empty": {"message": "This is a required field"},
            "email": {"message": "Email is not a valid email address."},
            "branded_email": {"message": "You must enter a valid email address. Please check your entry."},
            "success_callback": {"name": "check_uniqueness_bottom"},
        },
    },
    "client_scale": {
        "selector": "input[type='radio'].rbtn-scale"
        , "rules": {
            "radio_empty": {"message": "This is a required field"},
        },
    },
    "user_client_attributes_shipping_postcode": {
        "selector": "#new_user #user_client_attributes_shipping_postcode"
        , "rules": {
            "empty": {"message": "This is a required field"},
            "us_zip": {"message": "Zip Code is not a valid U.S. postal code. Currently, we only ship to U.S. addresses."},
        }
    },
};
var tmpItemName = "";
function validate(items) {
    this.items = items;
    this.status = false;
    this.tmpItemName = "";
    this.init = function () {
        if (Object.keys(this.items).length) {
            for (var itemName in this.items) {
                this.items[itemName]["status"] = false;
            }
        }
    };
}




validate.prototype.fire = function () {
    this.status = true;
    if (Object.keys(this.items).length) {
        for (var itemName in this.items) {
            //var item = this.items[itemName];
            this.applyValidation(itemName);
        }
    }
    return this.status;
};
validate.prototype.applyValidation = function (itemName) {
    var item = this.items[itemName];
    for (var ruleName in item.rules) {
        var rule = item.rules[ruleName];
        var status = true;
        switch (ruleName) {
            case "empty":
                status = this.checkEmpty(itemName, rule.message);
                break;
            case "radio_empty":
                status = this.checkRadioEmpty(itemName, rule.message);
                break;
            case "email":
                status = this.checkEmail(itemName, rule.message);
                break;
            case "branded_email":
                status = this.checkBrandedEmail(itemName, rule.message);
                break;
            case "us_zip":
                status = this.checkUSZip(itemName, rule.message);
                break;
            case "success_callback":
                var callback_function = new Function(rule.name);
                //status = new Function(rule.name);
                window[rule.name](item);
                break;
        }
        if (!status) {
            console.log("status false for: " + itemName);
            this.status = false;
            break;
        }
    }
};
validate.prototype.checkEmpty = function (itemName) {
    var item = this.items[itemName];
    var status = false;
    var selector = item.selector;
    var msg = item.rules.empty.message;

    if ($.trim($(selector).val()) == "") {


        setErrMsg(selector, msg);


    } else {
        if ($(selector).parent().find(".error-msg").length) {
            emptyErrTag(selector);
        }
        status = true;
    }
    item.status = status;
    return item.status;
};
validate.prototype.checkRadioEmpty = function (itemName) {
    var item = this.items[itemName];
    var status = false;
    var selector = item.selector;
    var msg = item.rules.radio_empty.message;
    var errElem = $(selector).first().parent().parent();
    if (typeof $(selector + ":checked").val() == "undefined" || $(selector + ":checked").val() == "") {
        setErrMsg(errElem, msg);
    } else {
        if ($(errElem).parent().find(".error-msg").length) {
            emptyErrTag(errElem);
        }
        status = true;
    }
    item.status = status;
    return item.status;
};
validate.prototype.checkEmail = function (itemName) {
    var item = this.items[itemName];
    var selector = item.selector;
    var msg = item.rules.email.message;
    var str = $.trim($(selector).val());
    var patt = new RegExp(/^[A-Za-z0-9._%+\-']+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/);
    var status = patt.test(str);
    if (status) {
        emptyErrTag(selector);
    } else {
        setErrMsg(selector, msg);
    }

    item.status = status;
    return item.status;
};
validate.prototype.checkBrandedEmail = function (itemName) {
    var item = this.items[itemName];
    var selector = item.selector;
    var msg = item.rules.branded_email.message;
    var str = $.trim($(selector).val());
    e = ["ac", "academy", "accountants", "actor", "ad", "ae", "aero", "af", "ag", "agency", "ai", "airforce", "al", "am", "an", "ao", "aq", "ar", "archi", "arpa", "as", "asia", "associates", "at", "au", "audio", "autos", "aw", "ax", "axa", "az", "ba", "bar", "bargains", "bayern", "bb", "bd", "be", "beer", "berlin", "best", "bf", "bg", "bh", "bi", "bid", "bike", "biz", "bj", "black", "blackfriday", "blue", "bm", "bn", "bo", "boutique", "br", "bs", "bt", "build", "builders", "buzz", "bv", "bw", "by", "bz", "ca", "cab", "camera", "camp", "capital", "cards", "care", "career", "careers", "cash", "cat", "catering", "cc", "cd", "center", "ceo", "cf", "cg", "ch", "cheap", "christmas", "church", "ci", "citic", "ck", "cl", "claims", "cleaning", "clinic", "clothing", "club", "cm", "cn", "co", "codes", "coffee", "college", "cologne", "com", "community", "company", "computer", "condos", "construction", "consulting", "contractors", "cooking", "cool", "coop", "country", "cr", "credit", "creditcard", "cruises", "cu", "cv", "cw", "cx", "cy", "cz", "dance", "dating", "de", "democrat", "dental", "desi", "diamonds", "digital", "directory", "discount", "dj", "dk", "dm", "dnp", "do", "domains", "dz", "ec", "edu", "education", "ee", "eg", "email", "engineering", "enterprises", "equipment", "er", "es", "estate", "et", "eu", "eus", "events", "exchange", "expert", "exposed", "fail", "farm", "feedback", "fi", "finance", "financial", "fish", "fishing", "fitness", "fj", "fk", "flights", "florist", "fm", "fo", "foo", "foundation", "fr", "frogans", "fund", "furniture", "futbol", "ga", "gal", "gallery", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gift", "gl", "glass", "globo", "gm", "gmo", "gn", "gop", "gov", "gp", "gq", "gr", "graphics", "gratis", "gripe", "gs", "gt", "gu", "guide", "guitars", "guru", "gw", "gy", "haus", "hiphop", "hk", "hm", "hn", "holdings", "holiday", "homes", "horse", "house", "hr", "ht", "hu", "id", "ie", "il", "im", "immobilien", "in", "industries", "info", "ink", "institute", "insure", "int", "international", "investments", "io", "iq", "ir", "is", "it", "je", "jetzt", "jm", "jo", "jobs", "jp", "juegos", "kaufen", "ke", "kg", "kh", "ki", "kim", "kitchen", "kiwi", "km", "kn", "koeln", "kp", "kr", "kred", "kw", "ky", "kz", "la", "land", "lb", "lc", "lease", "li", "life", "lighting", "limited", "limo", "link", "lk", "loans", "london", "lr", "ls", "lt", "lu", "luxe", "luxury", "lv", "ly", "ma", "maison", "management", "mango", "marketing", "mc", "md", "me", "media", "meet", "menu", "mg", "mh", "miami", "mil", "mk", "ml", "mm", "mn", "mo", "mobi", "moda", "moe", "monash", "moscow", "motorcycles", "mp", "mq", "mr", "ms", "mt", "mu", "museum", "mv", "mw", "mx", "my", "mz", "na", "nagoya", "name", "nc", "ne", "net", "neustar", "nf", "ng", "ni", "ninja", "nl", "no", "np", "nr", "nu", "nyc", "nz", "okinawa", "om", "onl", "org", "pa", "paris", "partners", "parts", "pe", "pf", "pg", "ph", "photo", "photography", "photos", "pics", "pictures", "pink", "pk", "pl", "plumbing", "pm", "pn", "post", "pr", "pro", "productions", "properties", "ps", "pt", "pub", "pw", "py", "qa", "qpon", "quebec", "re", "recipes", "red", "reise", "reisen", "ren", "rentals", "repair", "report", "rest", "reviews", "rich", "rio", "ro", "rocks", "rodeo", "rs", "ru", "ruhr", "rw", "ryukyu", "sa", "saarland", "sb", "sc", "schule", "sd", "se", "services", "sexy", "sg", "sh", "shiksha", "shoes", "si", "singles", "sj", "sk", "sl", "sm", "sn", "so", "social", "sohu", "solar", "solutions", "soy", "sr", "st", "su", "supplies", "supply", "support", "surgery", "sv", "sx", "sy", "systems", "sz", "tattoo", "tax", "tc", "td", "technology", "tel", "tf", "tg", "th", "tienda", "tips", "tj", "tk", "tl", "tm", "tn", "to", "today", "tokyo", "tools", "town", "toys", "tp", "tr", "trade", "training", "travel", "tt", "tv", "tw", "tz", "ua", "ug", "uk", "university", "uno", "us", "uy", "uz", "va", "vacations", "vc", "ve", "vegas", "ventures", "versicherung", "vg", "vi", "viajes", "villas", "vision", "vn", "vodka", "vote", "voting", "voto", "voyage", "vu", "wang", "watch", "webcam", "wed", "wf", "wien", "wiki", "works", "ws", "wtc", "wtf", "xn", "xxx", "xyz", "yachts", "ye", "yokohama", "yt", "za", "zm", "zone", "zw"];
    
    var domain = str.split("@")[1]
    var tldArray = domain.split(".")
    var tld = tldArray[tldArray.length - 1]
    if ( $.inArray(tld, e) == -1) {
        var status = false;
        setErrMsg(selector, msg);
    } else {
        if(pretld !== tld ){
            pretld = tld;            
            msg = "Please confirm that the email address you have entered above is correct.";
        }else{
            ifblur = 0;
        }
        var status = true;
        var patt = new RegExp(/\.(com|edu|net|biz|org|us|ca|gov|uk)$/);
        var warning = patt.test(str);
        if (warning) {
            emptyErrTag(selector);
        } else {
            if(ifblur == 1){
                setErrMsg(selector, msg);
            }else{
                setErrMsg(selector, '');
            }
        }
        ifblur = 0;
        //setErrMsg(selector, msg)
        //emptyErrTag(selector);
    }

    item.status = status;
    return item.status;
};
validate.prototype.checkUSZip = function (itemName) {
    var item = this.items[itemName];
    var selector = item.selector;
    var msg = item.rules.us_zip.message;
    var str = $.trim($(selector).val());
    var patt = new RegExp(/^\d{5}(-?\d{4})?$/);
    var status = patt.test(str);
    if (status) {
        emptyErrTag(selector);
    } else {
        setErrMsg(selector, msg);
    }

    item.status = status;
    return item.status;
};
validate.prototype.checkCustomExp = function (itemName) {
    var item = this.items[itemName];
    var selector = item.selector;
    var msg = item.rules.custom_exp.message;
    var str = $.trim($(selector).val());
    var patt = new RegExp(regexVal);
    var status = patt.test(str);
    if (status) {
        emptyErrTag(selector);
    } else {
        setErrMsg(selector, msg);
    }

    item.status = status;
    return item.status;
};
var objValidate = new validate(itemsConfig);

$(document).on('blur', itemsConfig.user_first_name.selector, function (event) {
    objValidate.applyValidation("user_first_name");
});

$(document).on('blur', itemsConfig.user_last_name.selector, function (event) {
    objValidate.applyValidation("user_last_name");
});

$(document).on('blur', itemsConfig.user_email.selector, function (event) {
    ifblur = 1;
    objValidate.applyValidation("user_email");
});
$(document).on('blur', itemsConfig.user_client_attributes_shipping_postcode.selector, function (event) {
    objValidate.applyValidation("user_client_attributes_shipping_postcode");
});

$(document).on('click', "#new_user .btn-group", function (event) {
    objValidate.applyValidation("client_scale");
});
//$(document).on('submit', "#new_user", function (event) {
$(document).on('click', "#new_user .submit", function (event) {
    //mouseflow.formSubmitAttempt('#new_user');
    event.preventDefault();
    uniqueness_checked = 0;
    objValidate.fire();
    console.log(objValidate.status);
    var check = setInterval(function () {
        if (uniqueness_checked == 1 && objValidate.status == true && emailPerfect == true) {
            clearInterval(check);
            var url = $('#new_user').attr("action");
            var urlParams = getQueryParams(url);
            if (!("utm_source" in urlParams) || urlParams["utm_source"] != "ampush") {
                if ($.trim(url).indexOf("?") >= 0) {
                    urlParams["utm_source"] = "ampush";
                    var urlParamsStr = getQueryStr(urlParams);
                    url = urlParamsStr != "" ? stitchfixUrl + "?" + urlParamsStr : stitchfixUrl;
                } else {
                    url = url + "?utm_source=ampush";
                }
            }
            $('#new_user').attr("action", url);
            if (objValidate.status) {
                $(this).find("input[type=submit]").val("SIGNING UP...");
                // mouseflow.formSubmitSuccess('#new_user');
                eventONSubmit($("#new_user").serialize());
                chReferer();
            } else {
                // mouseflow.formSubmitFailure('#new_user');
            }
            $("#new_user").submit();
            return objValidate.status;
        } else if (emailPerfect == false || objValidate.status == false) {
            clearInterval(check);
        }
    }, 300)
});

var itemsConfigPop = {
    "user_first_name": {
        "selector": "#new_user_pop #user_first_name"
        , "rules": {"empty": {"message": "This is a required field"}}
        , "validate_on_blur": true
    },
    "user_last_name": {
        "selector": "#new_user_pop #user_last_name"
        , "rules": {"empty": {"message": "This is a required field"}}
    },
    "user_email": {
        "selector": "#new_user_pop #user_email"
        , "rules": {
            "empty": {"message": "This is a required field"},
            "email": {"message": "Email is not a valid email address."},
            "branded_email": {"message": "You must enter a valid email address. Please check your entry."},
            "success_callback": {"name": "check_uniqueness_pop"},
        },
    },
    "client_scale": {
        "selector": "input[type='radio'].rbtn-scale-pop"
        , "rules": {
            "radio_empty": {"message": "This is a required field"},
        },
    },
    "user_client_attributes_shipping_postcode": {
        "selector": "#new_user_pop #user_client_attributes_shipping_postcode"
        , "rules": {
            "empty": {"message": "This is a required field"},
            "us_zip": {"message": "Zip Code is not a valid U.S. postal code. Currently, we only ship to U.S. addresses."},
        }
    },
};
var selectedForm = "";
$("#sizeChart-pop").on('show.bs.modal', function () {

});

$(document).on('click', '.size-chart td', function (event) {
    var validClass = {"xs": 37, "s": "38", "m": 39, "l": 40, "xl": 41};
    for (var cc in validClass) {
        if ($(this).hasClass(cc)) {
            $(".rbtn-scale-pop").parent().removeClass("active");
            $(".rbtn-scale-pop[value=" + validClass[cc] + "]").attr("checked", "checked");
            $(".rbtn-scale-pop[value=" + validClass[cc] + "]").parent().addClass("active");
            $(".rbtn-scale").parent().removeClass("active");
            $(".rbtn-scale[value=" + validClass[cc] + "]").attr("checked", "checked");
            $(".rbtn-scale[value=" + validClass[cc] + "]").parent().addClass("active");
            break;
        }
    }
    $("#sizeChart-pop").modal('hide');
});
var objValidatePop = new validate(itemsConfigPop);
$(document).on('blur', itemsConfigPop.user_first_name.selector, function (event) {
    objValidatePop.applyValidation("user_first_name");
});

$(document).on('blur', itemsConfigPop.user_last_name.selector, function (event) {
    objValidatePop.applyValidation("user_last_name");
});

$(document).on('blur', itemsConfigPop.user_email.selector, function (event) {
    ifblur = 1;
    objValidatePop.applyValidation("user_email");
});
$(document).on('blur', itemsConfigPop.user_client_attributes_shipping_postcode.selector, function (event) {
    objValidatePop.applyValidation("user_client_attributes_shipping_postcode");
});
//$(document).on('submit', "#new_user_pop", function (event) {
$(document).on('click', "#new_user_pop .submit", function (event) {
    uniqueness_checked = 0;
    if ($(".rbtn-scale-pop[type=radio]:checked").length < 1) {
        $(".rbtn-scale-pop").parent().removeClass("active");
        $(".rbtn-scale-pop[value=39]").attr("checked", "checked");
        $(".rbtn-scale-pop[value=39]").parent().addClass("active");
    }
    $("#popupsize").val($(".rbtn-scale-pop[type=radio]:checked").val());
    event.preventDefault();
    objValidatePop.fire();
    var checkForm = setInterval(function () {
        if (uniqueness_checked == 1 && objValidatePop.status == true && emailPerfect == true) {
            clearInterval(checkForm);
            var url = $('#new_user_pop').attr("action");
            var urlParams = getQueryParams(url);
            if (!("utm_source" in urlParams) || urlParams["utm_source"] != "ampush") {
                if ($.trim(url).indexOf("?") >= 0) {
                    urlParams["utm_source"] = "ampush";
                    var urlParamsStr = getQueryStr(urlParams);
                    url = urlParamsStr != "" ? stitchfixUrl + "?" + urlParamsStr : stitchfixUrl;
                } else {
                    url = url + "?utm_source=ampush";
                }
            }
            $('#new_user_pop').attr("action", url);
            //alert($('#new_user_shop').attr("action"));
            
            //mouseflow.formSubmitAttempt('#new_user_pop');
            
            $(this).find("input[type=submit]").val("SIGNING UP...");
            //mouseflow.formSubmitSuccess('#new_user_pop');
            eventONSubmit($("#new_user_pop").serialize());
            chReferer();
            $("#new_user_pop").submit();
            return objValidatePop.status;
            
        } else if (emailPerfect == false || objValidatePop.status == false) {
            clearInterval(checkForm);
            //mouseflow.formSubmitFailure('#new_user_pop');
        }
    }, 300)
   // return objValidatePop.status;
});