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
  if(method === 'POST'){
    console.log(details.method);
    // xtract form data and look on posted vata and validate check for script tag
    //var formdata = details.requestBody.formData;
    //if (details.url.indexOf(script_tag) != -1 ){
    //  return { cancel:true};
    //}    
  }
  
  else
    return {cancel:false};
};
var filter = {
    urls: ["<all_urls>"]
};
var opt_extraInfoSpec = ["blocking"];

chrome.webRequest.onBeforeRequest.addListener(callback, filter, opt_extraInfoSpec );

