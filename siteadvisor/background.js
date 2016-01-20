/*
 *
 *	Extension which uses Web Of Trust API.
 *
 *	Author	: Arun
 *	Date 	: 13/01/2016
 *
 *	WOT API key : 96500566cb7867e8542da77a40314f2f1e8b5539
 *
 *	https://www.mywot.com/wiki/API
 *
 * Sample API response : {
   	 "example.COM": {
	     "target": "example.com",
	     "0": [ 91, 53 ],
	     "categories": {
		       "501": 71,
		       "304": 37
		     }
   }
 *
 *
 *	Visit : smileycentral.com, www.topwallpapers.com, sickdownload.com
 *
 */

var cache_dict = {}; //Dictionary of already looked up domains.

/* Update the icon when tab is changed or activated. */
function update(tabId) {

	/* get the URL from tabId */
	chrome.tabs.get(tabId,function(tab) {
		// console.log(tab.url);
		var domain = extractDomainName(tab.url); //get the domain name from URL
		
		console.log(domain ); //print it to console for debugging

		if(domain.indexOf('.') == -1) {
			/* a domain should have a dot in it 
			 else it is not a valid domain.
			 change icon to grey and 
			 return if domain is not vaild! */
			changeIcon('grey');
			return;
		}

		if( domain in cache_dict) {
			/* if domain already exists in our cache, don't ask again*/
			var site_obj = cache_dict[domain][domain]; //See example API in comments
			var score = 0; //score of domain

			if("0" in site_obj) // 0 is an index in API response.
				score = site_obj[0][0];
			else {
				/* if 0th index doesn't exist, then API 
				doesn't have this domain with it. */
				changeIcon('grey');
				return;
			}

			console.log(score); // log the score for debugging
			// console.log(cache_dict[domain]);

			if(score >= 0 && score < 40) {
				//poor
				changeIcon('red');

				/* show a notification*/
				chrome.notifications.create("warn",{
					type:"image",
					iconUrl:"icons/grey.png",
					title:"Warning!",
					message:"The website ("+ domain +") is not safe! Trust value :" + score,
					imageUrl:"icons/red.png"
				},function(id){/*just an empty callback function*/});

			} else if(score >= 40 && score < 80) {
				//Unsatisfactory ~ satisfactory
				changeIcon('yellow');
			} else if(score >= 80 && score < 90) {
				//Good
				changeIcon('green_notick');
			} else if(score >= 90 && score < 100) {
				//Excellent
				changeIcon('green');
			} else {
				/* unknown score */
				changeIcon('grey');
			}
		} else {
			/* we dont have domain cached, so
			make a new API request. */
			makeWOTRequest(domain,tabId);
		}
	});
}

/* make a request to Web Of Trust API to get score of domain. */
function makeWOTRequest(domain,tabId) {

	if( domain in cache_dict) {
		/*if we already have it cached, dont ask again*/
		return cache_dict[domain];
	}

	var api_key = '96500566cb7867e8542da77a40314f2f1e8b5539'; //key required for API
	/* API URL requires key and domain name */
	var api_url = 'http://api.mywot.com/0.4/public_link_json2?key=' + api_key + '&hosts=';
	var ajax_url = api_url + domain + '/';

	/* AJAX in chrome is using XML Http Request API*/
	var xhr = new XMLHttpRequest(); //AJAX

	/* function which will be called when response is recevied */
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {	//value 4 means success	
			/* parse the JSON response received */
			var resp = JSON.parse(xhr.responseText); 
			// console.log(resp); // for debugging
			cache_dict[domain] = resp; // save the response in cache
			update(tabId); // call update
		}
	}

	xhr.open("GET", ajax_url, true); // make an asynchronous request to given URL.
	xhr.send();
}

/* Listener for tab updates. */
chrome.tabs.onUpdated.addListener(function (tabId, change_info, tabo) {
	// console.log('onUpdate ' + tabId);
	if( change_info.status == "complete") {
		/* if the status of page loading is complete */
		update(tabId);
	}
});

/* Listener when tab is activated or focused. */
chrome.tabs.onActivated.addListener(function( active) {
	update(active.tabId);
});

/* extract domain name from given URL. */
function extractDomainName(url) {
	/* works for http and https URLs only! */
	return url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
}

/* change the icon to given color */
function changeIcon(name) {
	chrome.browserAction.setIcon({path:"icons/" + name + ".png"});
}