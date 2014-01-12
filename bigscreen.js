// bigscreen.js
// javascript to switch the visible panel in the bigscreen display

/*jslint browser: true, plusplus: true, maxerr: 1000, indent: 3 */
/*global
   AutoPics, Math, SETTINGS, jQuery, hideTopPanel: true
*/
/*properties
    '-', CHANGETIME, DROPBOX, EFFECTTIME, Options, REFRESHTIME, SHOWURL,
    addClass, blind, bounce, click, clip, drop, effect, explode, floor, fold,
    fold2, hasOwnProperty, hide, highlight, horizFirst, html, length, location,
    match, name, none, percent, pop, puff, push, random, ready, reload,
    removeClass, replace, scale, shake, show, size, slide
*/

"use strict";

var idx = 0;
var stop = false;
var bReloadFlag = false;
var loadedURL;

// We will add the dropbox location later to this string in initURLs()
var NO_INTERNET_IMAGE = "/Photos/big-screen/HIDDEN/got-internet.png";

var URLs = [
   // your build screen here
   'http://blog.stevienova.com/wp-content/uploads/2010/10/screen_01b.png',
   'COMPANY',

   // perhaps your team's open defect chart here?
   'http://blogs.atlassian.com/wp-content/uploads/image2013-11-8-11-38-57-600x359.png',

   'MISC',

   // perhaps your burndown/or kanban cumulative flow chart here?
   'https://confluence.atlassian.com/download/attachments/391087259/Kanban%20CFD.png',

   'ART',

   // perhaps your team's scrum/kanban wall or code coverage?
   'http://www.targetprocess.com/userguides/guides/user-guide/kanban_board.png',

   // Marks the end of array to prevent comma syntax errors, is skipped when processing
   '-'
];
URLs.pop();

// Your company website pages to check
var companyURLs = [
   'http://www.ontology.com',
   'http://www.ontology.com/solutions/support-and-training/',
   'http://www.ontology.com/news-and-media/?tag=news',

   // Marks the end of array to prevent comma syntax errors, is skipped when processing
   '-'
];
companyURLs.pop();

var miscURLs = [
   'http://apod.nasa.gov/apod/astropix.html',
   //'http://google.com', refuses to load in a frame -- no checking for a new google doodle :-(
   'http://bitcoincharts.com/markets/',

   "http://slashdot.org/",
   "http://www.theregister.co.uk/software/",
   "http://www.wired.com/",
   "http://www.deathclock.com/dw.cfm?Day=1&Month=1&Year=1987&Sex=Male&Mode=Normal&bmi=-25&smoker=0",

   //"http://itkanban.com", refuses to load in a frame

   // Marks the end of array to prevent comma syntax errors, is skipped when processing
   '-'
];
miscURLs.pop();

var artURLs = [];

var fixedEffect = 'bounce';
var Effects = {
   'none': {},
   'blind': {},
   'bounce': {},
   'clip': {},
   'drop': {},
   'explode': {},
   'fold': { size: 200 },
   'fold2': { size: 200, horizFirst: true },
   'highlight': {},
   'puff': {},
//   'pulsate': {},
   'scale': { percent: 0 },
   'shake': {},
//   'size': { to: { width: 0, height: 200 } },
   'slide': {},

   '-': []
};

function noInternet(rArray) {
   var idxLoop;
   return; // disable this line to simply show the NO INTERNET image
   for (idxLoop = rArray.length - 1; idxLoop >= 0; --idxLoop) {
      if (rArray[idxLoop].match(/^http/)) {
         rArray[idxLoop] = NO_INTERNET_IMAGE;
      }
   }
   //alert(rArray.join("\n"));
}

function initURLs() {
   NO_INTERNET_IMAGE = SETTINGS.DROPBOX + NO_INTERNET_IMAGE;
   artURLs = AutoPics;
   noInternet(companyURLs);
   noInternet(miscURLs);
   noInternet(artURLs);
}

function initEffects() {
   var key;
   for (key in Effects) {
      if (Effects.hasOwnProperty(key) && key !== '-') {
         Effects['-'].push(key);
      }
   }
}

function choose(rArray) {
   var idxNow = idx++ % rArray.length;
   if (bReloadFlag && (0 === idxNow)) {
      window.location.reload(true);
   }
   return rArray[idxNow];
}

function chooseRandom(rArray) {
   var URL = rArray[Math.floor(Math.random() * rArray.length)];
   return URL;
}

function chooseContent() {
   var URL = choose(URLs);
   if (URL === 'COMPANY') {
      URL = chooseRandom(companyURLs);
   } else if (URL === 'ART') {
      URL = chooseRandom(artURLs);
   } else if (URL === 'MISC') {
      URL = chooseRandom(miscURLs);
   }
   return URL;
}

function chooseEffect() {
   var effect, TheEffect = {};
   effect = Effects['-'][Math.floor(Math.random() * Effects['-'].length)];

//effect = fixedEffect;

   TheEffect.name = effect;
   TheEffect.Options = Effects[effect];
   effect = effect.replace(/\d+$/, '');
   TheEffect.effect = effect;
   return TheEffect;
}

function setFloatURL(url) {
   var rFloat = jQuery('#floatURL');
   if (url) {
      rFloat.html('<code><b>' + url + '</b></code>');
      if (SETTINGS.SHOWURL) {
         rFloat.removeClass('hidden');
      } else {
         rFloat.addClass('hidden');
      }
   }
}

function loadContent(idImg) {
   var html = '', URL = chooseContent(), idPanel = idImg.replace(/img/, 'panel'), rNode = jQuery('#' + idPanel);
   if (URL.match(/\.(jpg|gif|png)$/i)) {
      html = '<' + 'img id="' + idImg + '" src="' + URL + '" alt="' + URL + '"/>';
//      html = "<" + "img id='" + idImg + "' width='" + SETTINGS.WIDTH + "' height='" + SETTINGS.HEIGHT + "' src='" + URL + "'\/>";
//      html = "<" + "img id='" + idImg + "' width='" + SETTINGS.WIDTH + "' height='" + SETTINGS.HEIGHT + "' src='" + URL + '" alt="' + URL + "'\/>";

   } else {
      html = '<' + 'iframe id="' + idImg + '" src="' + URL + '"><\/iframe>';
   }
   loadedURL = URL;
   rNode.html(html);
}

function onBottomPanelHidden() {
   if (!stop) {
      setFloatURL(loadedURL);
      setTimeout(function () {
         hideTopPanel();
      }, SETTINGS.CHANGETIME);
   }
   loadContent('img2');
}

function showTopPanel() {
   var Options, TheEffect = chooseEffect();
   Options = TheEffect.Options;
   if (Options.percent !== undefined) {
      Options.percent = 100;
   }
   if (TheEffect.effect === 'none') {
      jQuery('#panel1').show();
      onBottomPanelHidden();
   } else {
      jQuery('#panel1').show(TheEffect.effect, Options, SETTINGS.EFFECTTIME, onBottomPanelHidden);
   }
}

function onTopPanelHidden() {
   if (!stop) {
      setFloatURL(loadedURL);
      setTimeout(function () {
         showTopPanel();
      }, SETTINGS.CHANGETIME);
   }
   loadContent('img1');
}

function hideTopPanel() {
   var Options, TheEffect = chooseEffect();
   Options = TheEffect.Options;
   if (Options.percent !== undefined) {
      Options.percent = 0;
   }
   if (TheEffect.effect === 'none') {
      jQuery('#panel1').hide();
      onTopPanelHidden();
   } else {
      jQuery('#panel1').hide(TheEffect.effect, Options, SETTINGS.EFFECTTIME, onTopPanelHidden);
   }
}

function freeze() {
   stop = true;
}

function thaw() {
   stop = false;
   jQuery('#panel1').show();
   setTimeout(function () {
      hideTopPanel();
   }, SETTINGS.CHANGETIME);
}

function setPageReloadTimeout() {
   if (SETTINGS.REFRESHTIME) {
      setTimeout(function () {
         bReloadFlag = true;
      }, SETTINGS.REFRESHTIME);
   }
}

jQuery(document).ready(function () {
   initURLs();
   initEffects();
   // try to stop the slides if you click on the page -- this seems not to work.
   jQuery('body').click(function () { freeze(); });
   onBottomPanelHidden();
   setPageReloadTimeout();
});
