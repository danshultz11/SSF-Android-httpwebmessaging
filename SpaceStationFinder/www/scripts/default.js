var androidNs = (function () {
    "use strict";
var geocoder;

    document.addEventListener('DOMContentLoaded', function () { onDeviceReady(); });

function onDeviceReady() {
    
    while (google == null) {
        if (google != null) {
            break;
        }
    }

    geocoder = new google.maps.Geocoder();

    var test = "test";
    $("#txtAddressSplash").focus();

    $("#btnGetLatLon").click(function () { getLatLonViaGoogle(); });
    $("#btnUsePhoneLatLon").click(function () {
        getSpaceStationPassInfoWithPhoneCoordinates();
    });

    setLocalizedText(); //from localization.js
    $("#lblClearLocations").click(function () { removeStoredLocations(); });

    getPreviousLocationsFromLocalStorage();

    $("#waitAnim").attr("src", "images/Sputnik02.png");
    $("#waitAnim").attr("src", "images/Sputnik03.png");
    $("#waitAnim").attr("src", "images/Sputnik04.png");
    $("#friendlyMessage").click(function () { $("#friendlyMessage").text(""); });

    window.addEventListener('message', function (event) {
        alert('win heard event: ');
    });
    document.addEventListener('message', function (event) {
        alert('doc heard event: ');
    });

    navigator.geolocation.getCurrentPosition(onGeolocationSuccess, getCurrentPositionError,
        {
            maximumAge: 90000, timeout: 10000, enableHighAccuracy: false
        }
    );
};


var SPACE_STATION_ID = "25544";
var PM_AM = "PM";

function populateIFrame(qs) {
    var page = "results.html";
    if (qs.indexOf("page=main") > -1) {
        page = "index.html";
    }
    //Testing remove:

    page = "resultsWithReminder.html";
    var fullUrl = "https://spacestationfinder.com/" + page + qs;
    document.location = fullUrl + '&test=' + Math.random();
   
    
}

function getLatLonViaGoogle(desiredCity) {
    var address = desiredCity == null ? $("#txtAddress").val() : desiredCity;
    $("#locationText").text("Getting Location...");

    if (geocoder) {
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                $("#locationText").text(results[0].formatted_address);
                $("#lat").val(results[0].geometry.location.lat());
                $("#lng").val(results[0].geometry.location.lng());
                addToPreviousLocations(address);
                getSpaceStationPassInfo();
            }
            else {
                $("#locationText").text("Error: " + status);
                $("#friendlyMessage").text("Awww, SNAP! - " + friendlyGeocodeErrorMessage(status));
            }
        });

    }
}

function getSpaceStationPassInfoWithPhoneCoordinates() {
    getSpaceStationPassInfo();
}

function getSpaceStationPassInfo() {
    var satId = SPACE_STATION_ID;
    var lat = $("#lat").val();
    var lng = $("#lng").val();
    getCountryInfo();
}

function getCountryInfo() {
    $("#btnUsePhoneLatLon").attr("disabled", true);
    $("#btnGetLatLon").attr("disabled", true);
    var geocoder = new google.maps.Geocoder();
    var lat = parseFloat($("#lat").val());
    var lng = parseFloat($("#lng").val());
    var latlng = new google.maps.LatLng(lat, lng);
    if (!isNaN(lat) && !isNaN(lng)) {
        toggleWaitAnim(true);
        $("#specialMessage").text("Getting ISS Data...");
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var cityStateCountryDelimitedString = getCityStateCountryFromAddressComponents(results[0].address_components);
                    var cityStateCountryArray = cityStateCountryDelimitedString.split("|");
                    var city = cityStateCountryArray[0];
                    var state = cityStateCountryArray[1];
                    var country = cityStateCountryArray[2];
                    city = replaceDiacritics(city);
                    state = replaceDiacritics(state);
                    addToPreviousLocations(city);
                    populateIFrame("?loc=" + city + "%20" + state + "&src=and");
                }
            } else {
                populateIFrame("?page=main&src=and");
            }
        }
          )
    } else {
        populateIFrame("?page=main&src=and");
    }
    $("#btnUsePhoneLatLon").removeAttr("disabled");
    $("#btnGetLatLon").removeAttr("disabled");
    $("#specialMessage").text("");
}

function replaceDiacritics(cityStateCountry) {
    var diacriticsArray = /[ÀÁÂÃÄÅàáâãäåÈÉÊËèéêëÌÍÎÏìíîïÒÓÔÕÖØòóôõöøÙÚÛÜùúûü]/;
    var diacriticExists = $.each(diacriticsArray, function (i, diacritic) {
        var retVal = false;
        if (cityStateCountry.indexOf(diacritic) > -1) {
            retVal = true;
            return false;//breaks loop, doesn't return false from the function
        }
        return retVal;
    });

    if (diacriticExists) {
        cityStateCountry = cityStateCountry.replace(/[ÀÁÂÃÄÅ]/, "A");
        cityStateCountry = cityStateCountry.replace(/[àáâãäå]/, "a");
        cityStateCountry = cityStateCountry.replace(/[ÈÉÊË]/, "E");
        cityStateCountry = cityStateCountry.replace(/[èéêë]/, "e");
        cityStateCountry = cityStateCountry.replace(/[ÌÍÎÏ]/, "I");
        cityStateCountry = cityStateCountry.replace(/[ìíîï]/, "i");
        cityStateCountry = cityStateCountry.replace(/[ÒÓÔÕÖØ]/, "O");
        cityStateCountry = cityStateCountry.replace(/[òóôõöø]/, "o");
        cityStateCountry = cityStateCountry.replace(/[ÙÚÛÜ]/, "U");
        cityStateCountry = cityStateCountry.replace(/[ùúûü]/, "u");
    }
    return cityStateCountry;
}

function getCityStateCountryFromAddressComponents(addressComponents) {
    // iterate through address_component array and pull out city, state country
    var city = "";
    var state = "";
    var country = "";
    $.each(addressComponents, function (i, address_component) {

        if (address_component.types[0] == "country") {
            country = address_component.long_name.replace(/ /g, "_");;
        }
        if (address_component.types[0] == "locality") {
            city = address_component.long_name.replace(/ /g, "_");
        }
        if (address_component.types[0] == "administrative_area_level_1") {
            state = address_component.long_name.replace(/ /g, "_");;
        }
    });
    return city + "|" + state + "|" + country;
}

// onError Callback receives a PositionError object
//
function onGeolocationError(error) {
    toggleWaitAnim(false);
    var message = "";
    // Check for known errors
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "This website does not have permission to use " +
                      "the Geolocation API";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "The current position could not be determined. " +
                    "Check your internet connection";
            break;
        case error.POSITION_DENIED_TIMEOUT:
            message = "The current position could not be determined " +
                      "within the specified timeout period.";
            break;
        case error.TIMEOUT:
            message = "The current position could not be determined " +
                      "within the specified timeout period.";
            break;
    }
    if (message != "") {
        alert('Can\'t get latitude and longitude information from this device - but you can still enter a city or ZIP code. \n\n' + message);
        $("#btnUsePhoneLatLon").hide();
        $("#txtAddress").focus();
        return;
    }
}

function friendlyGeocodeErrorMessage(errorCode) {
    switch (errorCode) {//message string variables are from localization.js
        case google.maps.GeocoderStatus.ZERO_RESULTS:
            return geocodeZeroResults;
            break;
        case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
            return geocodeOverQueryLimit;
            break;
        case google.maps.GeocoderStatus.REQUEST_DENIED:
            return geocodeRequestDenied;
            break;
        case google.maps.GeocoderStatus.INVALID_REQUEST:
            return geocodeInvalidRequest;
            break;
        default:
            return geocodeGeneric + errorCode;
    }
}

function friendlyNasaErrorMessage(errorCode) {
    toggleWaitAnim(false);
    return (errorCode);
}

// onSuccess Geolocation
//
function onGeolocationSuccess(position) {
    $("#lat").val(position.coords.latitude);
    $("#lng").val(position.coords.longitude); 
    $("#btnUsePhoneLatLon").show();
}

function getCurrentPositionError(error) {
    //$("#enableLocation").show();
}

/*********************************HTML5 Local Storage code***********************************/
function addToPreviousLocations(address) {
    var storedLocations = localStorage.getItem("storedLocations"); //returns triple pipe (|||) delimited string.
    if (storedLocations == null || !locationAlreadyExistsInLocalStorage(address, storedLocations)) {
        storedLocations = address.replace('|', '') + '|||' + storedLocations;
        storedLocations = trimToFiveLocations(storedLocations);
        localStorage.setItem("storedLocations", storedLocations);
    }
}

function trimToFiveLocations(storedLocations) {
    var storedLocationArray = storedLocations.split('|||');
    var len = storedLocationArray.length - 1;
    if (len > 5) {
        storedLocationArray = storedLocationArray.slice(0, len);
        return storedLocationArray.join("|||");
    }
    return storedLocations;
}

function locationAlreadyExistsInLocalStorage(address, storageString) {
    return (storageString.indexOf(address) > -1);
}

function getPreviousLocationsFromLocalStorage() {
    //if (Modernizr.localstorage) {
        $(".storedLocation").remove();
        var storedLocations = localStorage.getItem("storedLocations") != null ? localStorage.getItem("storedLocations").split('|||') : "";
        var upToMax = storedLocations.length > 5 ? 5 : storedLocations.length;
        for (var counter = 0; counter < upToMax; counter++) {
            if (counter == 0) { $("#txtAddress").val(storedLocations[0]) };
            $("#storedLocations").append("<div class='storedLocation'>" + storedLocations[counter] + "</div>");
        }
        $(".storedLocation").click(function () { $("#txtAddress").val($(this).text()); getLatLonViaGoogle(); });
    //}
}

function removeStoredLocations() {
    if (Modernizr.localstorage) {
        if (confirm(doYouReallyWantToRemoveLocalizedText)) {//from localization.js
            localStorage.setItem("storedLocations", "");
            $(".storedLocation").remove();
        }
    }
}
/*********************************End HTML5 Local Storage code***********************************/
/***************************************** Wait Animation code **************************************/

var waitAnimHandle = "";
var waitImage
function toggleWaitAnim(start) {
    waitImage = $("#waitAnim");
    if (start) {
        if (waitAnimHandle == "") {//don't start an anim if one's already running.
            var divElement = document.createElement('div');
            divElement.setAttribute("id", "searchingText");
            divElement.textContent = "Searching..."
            $("#waitAnimContainer").append(divElement);
            $("#waitAnimContainer").css("opacity", "1.0");
            waitAnimHandle = setInterval(waitAnimIncrementFrame, 100, false);
        }
    }
    else {
        clearInterval(waitAnimHandle);
        waitAnimHandle = "";
        $("#searchingText").remove();
        $("#waitAnimContainer").css("opacity", "0.1");
    }
}

var currAnimFrame = 1;
var incr = true;
function waitAnimIncrementFrame() {
    incr ? currAnimFrame++ : currAnimFrame--;
    if (currAnimFrame == 1) { incr = true; }
    else if (currAnimFrame == 4) { incr = false; };
    waitImage.attr('src', 'images/Sputnik0' + currAnimFrame + '.png')
}


/*****************************************End  Wait Animation code **************************************/


/***************************************** Begin Alert code **************************************/


    // snooze...
//window.wakeuptimer.snooze(successCallback,
//    errorCallback,
//    {
//        alarms: [{
//            type: 'snooze',
//            time: { seconds: 60 }, // snooze for 60 seconds 
//            extra: {'Waking up!!!'}, // json containing app-specific information to be posted when alarm triggers
//            message: this.get('message'),
//            sound: this.get('sound'),
//            action: this.get('action')
//        }]
//    }
// );

    // example of a callback method
var alertSuccessCallback = function (result) {
    if (result.type && result.type === 'wakeup') {
        navigator.notification.alert(JSON.parse(result.extra).message, null, 'ISS Alert:', 'Got it');
        navigator.notification.beep(4);//beep 3 times;
        navigator.vibrate([500, 500, 500, 500, 1000, 1000, 3000, 500, 500]);//vibration pattern - milliseconds to alternate vibration/pause.
    } else if (result && result.type === 'set') {
        console.log('ISS Sighting alarm set for ' + new Date(result.alarm_date));
        navigator.notification.alert('ISS Sighting alarm set for ' + new Date(result.alarm_date), null, 'Alert set', 'OK');
    } else {
        navigator.notification.alert('ISS Sighting alarm has been set', null, 'Alert set', 'OK');
    }
};

var alertErrorCallback = function (result) {
    alert("error");
}


})();