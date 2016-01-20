// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function click_handler(event) {
  chrome.tabs.executeScript(null,
      {code:"document.body.style.backgroundColor='" + event.target.id + "'"});
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {

  document.getElementById('red').addEventListener('click',click_handler);
  document.getElementById('blue').addEventListener('click',click_handler);
  document.getElementById('green').addEventListener('click',click_handler);
  document.getElementById('yellow').addEventListener('click',click_handler);

  /*
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
  */
});
