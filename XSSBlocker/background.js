// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */

// onBeforeSendHeaders
var count=0;

console.log("Loaded.");
var flag=0;
/* extract domain name from given URL. */
function extractDomainName(url) {
  /* works for http and https URLs only! */
  return url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
}
var script_tag="%3Cscript%3E";
var script_tag_normal="<script>";
var callback = function(details) {
  //console.log(details.url);
  //console.log(details.method);
  //console.log(details.requestBody.formData);
  var method = details.method;
  if(method === 'GET'){
    //console.log(details.method);
    console.log("test this");
    console.log(details.url.toString().toUpperCase());
    //var formdata = details.requestBody.formData;
    if (decodeURIComponent(details.url.toString()).match(/({%3C*}|<)[^*]?[\s\S]*?script[\s\S]*?({%3E}|>)[\s\S]*?({%3C}|<)[\s\S]*?\/[\s\S]*?script[\s\S]*?({%3E}|>)/gi) != null ){
      count++;
      //notif();
      alert("Request blocked");
      return { cancel:true};

    }    
  }
  else if(method === 'POST'){
    console.log("post method onBeforeSendHeaders");
    // xtract form data and look on posted vata and validate check for script tag
    //var formdata = details.requestBody.formData;
    //console.log(formdata);
    //for i in formdata
    //if (details.url.indexOf(script_tag) != -1 ){
    //  return { cancel:true};
    //}    
    if(flag==1){
      flag=0;
      count++;
				//notif();    
				alert("Request blocked");
        return {cancel:true};
    }
  }
  
  else
    return {cancel:false};
};
var filter = {
    urls: ["<all_urls>"]
};
var opt_extraInfoSpec = ["blocking", "requestHeaders"];

chrome.webRequest.onBeforeSendHeaders.addListener(callback, filter, opt_extraInfoSpec );

// for post 


var callback1 = function(details) {
  //console.log(details.url);
  //console.log(details.method);
  //console.log(details.requestBody.formData);
  var method = details.method;
  
  if(method === 'POST'){
    console.log(details.requestBody.formData);
    // xtract form data and look on posted vata and validate check for script tag
    //var formdata = details.requestBody.formData;
    //console.log(formdata);
    //for i in formdata
    //if (details.url.indexOf(script_tag) != -1 ){
    //  return { cancel:true};
    //} 
    
    //for (var i = 0; i < details.requestBody.formData.length; ++i) {
            //if (details.requestBody.formData[i].indexOf(script_tag) != -1 ) {
              //console.log(details);
            //  flag=1; 
            //  break;
            //}

            //  console.log(details.requestBody.formData);
    //}

    var keys = [];
    var dictionary = details.requestBody.formData;
    for (var key in dictionary) {
      if (dictionary.hasOwnProperty(key)) {
        //keys.push(key);
        var data1 = dictionary[key];
        for (var i = 0; i < data1.length; ++i) {
          if(data1[i].toString().toUpperCase().match(/({%3C*}|<)[^*]?[\s\S]*?script[\s\S]*?({%3E}|>)[\s\S]*?({%3C}|<)[\s\S]*?\/[\s\S]*?script[\s\S]*?({%3E}|>)/gi) != null ){
            
          	console.log(data1[i].toString().indexOf(script_tag_normal));
          	flag=1;
          	break;
          	//return {cancel:true};
          }

          //console.log(data1[i]);
        }
        if(flag==1) break;
        //console.log(data1[0].toString().indexOf(script_tag));
        //console.log(dictionary[key]);
      }
    }
    
// var text2 = text1.toLowerCase();     
            
    //console.log(details.requestBody.formData);
    
  }
};
var filter1 = {
    urls: ["<all_urls>"]
};
var opt_extraInfoSpec1 = ["requestBody"];



chrome.webRequest.onBeforeRequest.addListener(callback1, filter1, opt_extraInfoSpec1 );

/* show a notification*/
var notif = function() {
chrome.notifications.create("warn",{
          type:"image",
          iconUrl:"icon.png",
          title:"Warning!",
          message:"Number of sites blocked : " + count,
          imageUrl:"icon.png"
        },function(id){/*just an empty callback function*/});   
};