 function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    url += keywords[getRandomInt(0,5)];
    url += "&paginationInput.pageNumber=";
    url += getRandomInt(1,100);
    url += "&paginationInput.entriesPerPage=1";
    url += "&sortOrder=WatchCountDecreaseSort"


	var testurl = "http://open.api.ebay.com/Shopping?callname=GetCategoryInfo&appid=" + appid 
   + "&siteid=1&CategoryID=293&version=981&responseencoding=JSON&callbackname=jsonpcallback" ;
	
	var testurl2 = "http://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=" + appid
	+ "&siteid=0&QueryKeywords=fun&version=1063&callbackname=jsonpcallback" ;
 	
 $.ajax({
   dataType: "jsonp",
   method: "GET",
   url: url,
   xhrFields: {
   withCredentials: false
      } 
 });
 
console.log(url);

}

 function jsonpcallback(jsdata) {
   
   console.log(jsdata);
   var items = jsdata.findItemsByKeywordsResponse[0].searchResult[0].item || [];
   var itemURL = items[0].viewItemURL;
   var picURL = items[0].galleryURL;
   var picTitle = items[0].title;
   console.log(itemURL);
   console.log(picURL);
   if(picURL.includes("http://thumbs1.ebaystatic.com/pict/04040_0.jpg")) {
   	redirect();
   	console.log("No picture")
   }
   else {
   	   $("#product_title").text(picTitle);
   	   $(".product_link").attr("href", itemURL);
       //$(".product_link").text("");
   	   $("#product_image").attr("src", picURL );
   }




   //window.location.href = itemURL;
   //window.open(itemURL, '_blank');

   $("#output").html();
 }

redirect();
