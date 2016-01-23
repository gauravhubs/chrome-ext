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
console.log("Loaded.");
var flag=0;
/* extract domain name from given URL. */
function extractDomainName(url) {
  /* works for http and https URLs only! */
  return url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
}
var script_tag="%3Cscript%3E";
var callback = function(details) {
  console.log(details.url);
  //console.log(details.method);
  //console.log(details.requestBody.formData);
  var method = details.method;
  if(method === 'GET'){
    console.log(details.method);
    //var formdata = details.requestBody.formData;
    if (details.url.indexOf(script_tag) != -1 ){
      return { cancel:true};
    }    
  }
  else if(method === 'POST'){
    //console.log(details);
    // xtract form data and look on posted vata and validate check for script tag
    //var formdata = details.requestBody.formData;
    //console.log(formdata);
    //for i in formdata
    //if (details.url.indexOf(script_tag) != -1 ){
    //  return { cancel:true};
    //}    
    if(flag==1){
      flag=0;
      cancel:true;
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
    //console.log(details.requestBody.formData);
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
          if(data1[i].indexOf(script_tag) != -1 ){
            flag=1;
          }
        }
        console.log(dictionary[key]);
      }
    }
    
    
            
    //console.log(details.requestBody.formData);
    
  }
};
var filter1 = {
    urls: ["<all_urls>"]
};
var opt_extraInfoSpec1 = ["requestBody"];



chrome.webRequest.onBeforeRequest.addListener(callback1, filter1, opt_extraInfoSpec1 );

