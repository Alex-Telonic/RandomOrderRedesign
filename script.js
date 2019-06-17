var geo_options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
};

var currentPostalCode;

var wpid = navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



function geo_error() {
  alert("Entschuldigung, keine Positionsinformationen sind verfügbar.");
}

function geo_success(position) {
  console.log(position.coords.latitude, position.coords.longitude);
  $("#cord").text("Lat: " + position.coords.latitude + " Long: " + position.coords.longitude)
  getZipCode(position);
}

function getZipCode(position) {
    var geonames_api = "http://api.geonames.org/findNearbyPostalCodesJSON?";


    geonames_api = geonames_api + "lat=" + position.coords.latitude + "&" + "lng=" + position.coords.longitude + "&username=alex1895"
    console.log(geonames_api);
    $.ajax({
    dataType: "json",
    method: "GET",
    url: geonames_api,
    xhrFields: {
      withCredentials: false
    },
    success : function(data) {              
      //console.log(data);
      currentPostalCode = data.postalCodes[0].postalCode;

      $("#current_plz").text("Current Position is: " + currentPostalCode);

      $("#plz").val(currentPostalCode);

      redirect();
    },
  });

}

function update_plz() {
  currentPostalCode = $("#plz").val();
  redirect();
}

function getLocation() {
  var wpid = navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
}



function redirect() {

  var appid = "Alexande-RandomOr-PRD-8ea94fa4c-cec0f5ed";

  var keywords = ["fun", "useless", "joke", "prank", "crazy", "great"];


  var url = "https://svcs.ebay.com/services/search/FindingService/v1";
  url += "?OPERATION-NAME=findItemsByKeywords";
  url += "&SERVICE-VERSION=1.0.0";
  url += "&SECURITY-APPNAME=Alexande-RandomOr-PRD-8ea94fa4c-cec0f5ed";
  url += "&GLOBAL-ID=EBAY-US";
  url += "&RESPONSE-DATA-FORMAT=JSON";
  url += "&callback=jsonpcallback";
  url += "&REST-PAYLOAD";
  url += "&keywords=";
  url += keywords[getRandomInt(0, 5)];
  url += "&paginationInput.pageNumber=";
  url += getRandomInt(1, 100);
  url += "&paginationInput.entriesPerPage=1";
  url += "&sortOrder=WatchCountDecreaseSort"


  var geo_url = "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=Alexande-RandomOr-PRD-8ea94fa4c-cec0f5ed&GLOBAL-ID=EBAY-DE&RESPONSE-DATA-FORMAT=JSON&callback=jsonpcallback&REST-PAYLOAD&keywords=bike&paginationInput.pageNumber=13&paginationInput.entriesPerPage=1&sortOrder=Distance&";


  geo_url = geo_url + "buyerPostalCode=";
  geo_url = geo_url + currentPostalCode;
  geo_url = geo_url + "&itemFilter(0).name=LocalSearchOnly&itemFilter(0).value=true&itemFilter(1).name=MaxDistance&itemFilter(1).value=100";


  //   var testurl = "http://open.api.ebay.com/Shopping?callname=GetCategoryInfo&appid=" + appid +
  //     "&siteid=1&CategoryID=293&version=981&responseencoding=JSON&callbackname=jsonpcallback";

  // var testurl2 = "http://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=" + appid +
  //   "&siteid=0&QueryKeywords=fun&version=1063&callbackname=jsonpcallback";

  $.ajax({
    dataType: "jsonp",
    method: "GET",
    url: geo_url,
    xhrFields: {
      withCredentials: false
    }
  });

  console.log(geo_url);

}

function jsonpcallback(jsdata) {

  console.log(jsdata);
  var items = jsdata.findItemsByKeywordsResponse[0].searchResult[0].item || [];
  var itemURL = items[0].viewItemURL;
  var picURL = items[0].galleryURL;
  var picTitle = items[0].title;
  console.log(itemURL);
  console.log(picURL);
  if (picURL.includes("http://thumbs1.ebaystatic.com/pict/04040_0.jpg")) {
    redirect();
    console.log("No picture")
  } else {
    $("#product_title").text(picTitle);
    $(".product_link").attr("href", itemURL);
    //$(".product_link").text("");
    $("#product_image").attr("src", picURL);
  }



  //window.location.href = itemURL;
  //window.open(itemURL, '_blank');

  $("#output").html();
}

redirect();