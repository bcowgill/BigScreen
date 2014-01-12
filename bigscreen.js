// bigscreen.js
// javascript to switch the visible panel in the bigscreen display

/*jslint browser: true, plusplus: true, maxerr: 1000, indent: 3 */
/*global
   AutoPics, Math, SETTINGS, jQuery, hideTopPanel: true, NO_INTERNET_IMAGE: true, URLs, companyURLs, miscURLs
*/
/*properties
    '-', CHANGETIME, DEFAULT, DROPBOX, EFFECTTIME, NOINTERNET, Options,
    REFRESHTIME, SHOWURL, addClass, apply, blind, bounce, clip, console, drop,
    effect, explode, floor, fold, fold2, hasOwnProperty, hide, highlight,
    horizFirst, html, length, location, log, match, name, none, percent, pop,
    puff, push, random, ready, reload, removeClass, replace, scale, shake, show,
    size, slide
*/

"use strict";

var idx = 0;
var stop = false;
var bReloadFlag = false;
var loadedURL;

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

function log() {
   if (window.console && window.console.log) {
      window.console.log.apply(window.console, arguments);
   }
}

// pop off the final '-' entry of an array if it exists
function popFinal(rArray) {
   if ('-' === rArray[rArray.length - 1]) {
      rArray.pop();
   }
}

// Check if we should simply show the NO INTERNET image for everything
function noInternet(rArray) {
   var idxLoop;
   popFinal(rArray);
   if (SETTINGS.NOINTERNET) {
      log("using no internet image for everything: " + NO_INTERNET_IMAGE);
      //alert(rArray.join("\n"));
      for (idxLoop = rArray.length - 1; idxLoop >= 0; --idxLoop) {
         if (rArray[idxLoop].match(/^http/)) {
            rArray[idxLoop] = NO_INTERNET_IMAGE;
         }
      }
   }
}

function initURLs() {
   NO_INTERNET_IMAGE = SETTINGS.DROPBOX + NO_INTERNET_IMAGE;
   artURLs = AutoPics;

   noInternet(companyURLs);
   noInternet(miscURLs);
   noInternet(artURLs);

   //log(miscURLs);
}

// Create an ordered array of effect names for random choosing
// and store it in the '-' key of the effects object
function initEffects() {
   var key;
   for (key in Effects) {
      if (Effects.hasOwnProperty(key) && key !== '-') {
         Effects['-'].push(key);
      }
   }
}

// Choose one item after another from the array specified
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
   log("using URL: " + URL);
   return URL;
}

function chooseEffect() {
   var effect, TheEffect = {};
   effect = Effects['-'][Math.floor(Math.random() * Effects['-'].length)];

//effect = fixedEffect;
   log("using effect: " + effect);
   TheEffect.name = effect;
   TheEffect.Options = Effects[effect];
   effect = effect.replace(/\d+$/, '');
   TheEffect.effect = effect;
   return TheEffect;
}

// Show the URL of the slide content in the floating url bar
function setFloatURL(URL) {
   var rFloat = jQuery('#floatURL');
   if (URL) {
      rFloat.html('<code><b>' + URL + '</b></code>');
      if (SETTINGS.SHOWURL) {
         rFloat.removeClass('hidden');
      } else {
         rFloat.addClass('hidden');
      }
   }
}

// Load content into the currently hidden panel
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

// a debugging function to turn on showing of url
function showURL() {
   SETTINGS.SHOWURL = true;
   setFloatURL(loadedURL);
}

// a debugging function to stop the panels changing
function freeze() {
   stop = true;
}

// a debugging function to restart the panel changes
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

function start() {
   var timer = setInterval(function () {
      log('Interval timer ' + timer);
      if (!SETTINGS.DEFAULT && URLs) {
         clearInterval(timer);
         initURLs();
         initEffects();
         onBottomPanelHidden();
         setPageReloadTimeout();
      }
   }, 300);
}

jQuery(document).ready(function () {
   start();
});
