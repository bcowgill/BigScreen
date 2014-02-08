// bigscreen.js
// javascript to switch the visible panel in the bigscreen display

/*jslint browser: true, plusplus: true, maxerr: 1000, indent: 3 */
/*global
   AutoPics, Math, SETTINGS, jQuery, hideTopPanel: true, URLs, companyURLs, miscURLs
*/
/*properties
    '-', CHANGETIME, CHANGETME, DEFAULT, DROPBOX, EFFECTTIME, FIXEDEFFECT,
    NOINTERNET, NOINTERNETIMAGE, Options, REFRESHTIME, REFRESHTME, SHOWURL,
    addClass, apply, blind, blind2, blind3, blind4, blind5, blind6, bounce, clip,
    clip2, color, console, direction, drop, drop2, drop3, drop4, effect, explode,
    explode2, explode3, fade, floor, fold, fold2, hasOwnProperty, hide,
    highlight, horizFirst, html, length, location, log, match, name, none,
    origin, percent, pieces, pop, puff, pulsate, push, random, ready, reload,
    removeClass, replace, scale, scale2, scale3, scale4, scale5, shake, shake2,
    show, size, slide, slide2, slide3, slide4, times
*/

"use strict";

var idx = 0;
var stop = false;
var bReloadFlag = false;
var loadedURL;
var effectUsed;

var artURLs = [];

// Documentation for Effects:
// http://api.jqueryui.com/category/effects/
var Effects = {
   'none': {},
   'blind': { direction: "up" },
   'blind2': { direction: "down" },
   'blind3': { direction: "left" },
   'blind4': { direction: "right" },
   'blind5': { direction: "vertical" },
   'blind6': { direction: "horizontal" },
   'bounce': {},
   'clip': { direction: "vertical" },
   'clip2': { direction: "horizontal" },
   'drop': { direction: "left" },
   'drop2': { direction: "right" },
   'drop3': { direction: "up" },
   'drop4': { direction: "down" },
   'explode': { pieces: 9 },
   'explode2': { pieces: 4 },
   'explode3': { pieces: 16 },
   'fade': {}, // new
   'fold': { size: 200 },
   'fold2': { size: 200, horizFirst: true },
   'highlight': { color: "red" }, // only works well for images smaller than the viewport
/*
   'highlight3': { color: "yellow" },
   'highlight4': { color: "green" },
   'highlight5': { color: "blue" },
   'highlight6': { color: "violet" },
   'highlight7': { color: "black" },
*/
   'puff': { percent: 150 },
   'pulsate': { times: 3 },
   'scale': { percent: 0 }, // default center
   'scale2': { percent: 0, origin: ["bottom", "right"] },
   'scale3': { percent: 0, origin: ["bottom", "left"] },
   'scale4': { percent: 0, origin: ["top", "right"] },
   'scale5': { percent: 0, origin: ["top", "left"] },
   'shake': { times: 5 },
   'shake2': { direction: "up", times: 5 },
   //'size': { to: { width: 0, height: 200 }, origin: ["bottom", "right"], scale: "content" },
   'slide': { direction: "left" },
   'slide2': { direction: "up" },
   'slide3': { direction: "down" },
   'slide4': { direction: "right" },

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
      log("using no internet image for everything: " + SETTINGS.NOINTERNETIMAGE);
      //alert(rArray.join("\n"));
      for (idxLoop = rArray.length - 1; idxLoop >= 0; --idxLoop) {
         if (rArray[idxLoop].match(/^http/)) {
            rArray[idxLoop] = SETTINGS.NOINTERNETIMAGE;
         }
      }
   }
}

function initURLs() {
   SETTINGS.NOINTERNETIMAGE = SETTINGS.DROPBOX + '/' + SETTINGS.NOINTERNETIMAGE;
   log("SETTINGS", SETTINGS);
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
   if ('-' === rArray[idxNow]) {
      // skip any '-' signal in the array
      return choose(rArray);
   }
   return rArray[idxNow];
}

function chooseRandom(rArray) {
   var URL = rArray[Math.floor(Math.random() * rArray.length)];
   if ('-' === URL) {
      // skip any '-' signal in the array
      return chooseRandom(rArray);
   }
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

   effect = SETTINGS.FIXEDEFFECT;
   if ("" === SETTINGS.FIXEDEFFECT) {
      effect = Effects['-'][Math.floor(Math.random() * Effects['-'].length)];
   }
   log("using effect: " + effect);
   effectUsed = effect;
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
      rFloat.html('<code>' + effectUsed + '&nbsp;<b>' + URL + '</b></code>');
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
      log("onBottomPanelHidden", SETTINGS.CHANGETME);
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
      log("onTopPanelHidden", SETTINGS.CHANGETME);
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
   log("setting stop flag");
}

// a debugging function to restart the panel changes
function thaw() {
   log("clearing stop flag and scheduling a slide change");

   if (stop) {
      jQuery('#panel1').show();
      setTimeout(function () {
         hideTopPanel();
      }, SETTINGS.CHANGETIME);
   }
   stop = false;
}

function setPageReloadTimeout() {
   if (SETTINGS.REFRESHTIME) {
      log("setPageReloadTimeout", SETTINGS.REFRESHTME);
      setTimeout(function () {
         bReloadFlag = true;
      }, SETTINGS.REFRESHTIME);
   }
}

function help() {
   log("help - debug functions you can use:");
   log("freeze: set stop flag to pause slide change on next timeout");
   log("thaw: clear stop flag and schedule a slid change");
   log("showURL: turn on display of effect and URL bar");
}

function start() {
   help();
   var timer = setInterval(function () {
      log('Interval timer ' + timer);
      if (!SETTINGS.DEFAULT && URLs) {
         if (timer) {
            clearInterval(timer);
            timer = 0;
         }
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
