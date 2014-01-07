// bigscreen.js
// javascript to switch the visible panel in the bigscreen display

/*jslint browser: true, plusplus: true, maxerr: 1000, indent: 3 */
/*global
   AutoPics, Effects, companyURLs, Math, NO_INTERNET_IMAGE, SETTINGS, URLs,
   artURLs: true, changeContent, choose, chooseContent, chooseEffect, chooseRandom,
   document, fixedEffect, freeze, hideTopPanel, idx, initEffects,
   initURLs, jQuery, loadContent, miscURLs, noInternet, onBottomPanelHidden,
   onTopPanelHidden, setTimeout, showTopPanel, stop, thaw
*/
/*properties
    '-', REFRESHTIME, EFFECTTIME, DROPBOX, HEIGHT, Options, WIDTH, blind, bounce, click, clip, drop,
    effect, explode, floor, fold, fold2, hasOwnProperty, hide, highlight,
    horizFirst, html, length, match, name, none, percent, pop, puff, push,
    random, ready, replace, scale, shake, show, size, slide
*/

"use strict";

var idx = 0;
var stop = false;

// We will add the dropbox location later to this string in initURLs()
var NO_INTERNET_IMAGE = "/Photos/big-screen/HIDDEN/got-internet.png";

var URLs = [
   // Teads Inread video in article dashboard requires login
//   'http://manager.teads.tv/homepage',
   // Ads Inread video stats splunk monitor page
//   'http://splunk.internal.ft.com/en-US/app/search/ads_inread_video_24hr_stats',
//   'http://splunk.internal.ft.com/en-US/app/search/ads_inread_video_stats',

   // Gathercole's IT Predictions for 2013
//   'https://www.google.com/moderator/#1/e=201801&t=201801.40',

//   'http://ft-wd20104.osb.ft.com:8081/env/',
//   'http://ahp.svc.ft.com/tasks/reporting/ReportingTasks/runReportStep2?report_id=107&basicAuthRequired=true&report_template_id=42&ftWorkFlowIds=211:277&run-report=Run',
   'COMPANY',

//   'http://cranmer.ft.com/QUnitChainer/0-monitor.html',

   // Site intelligence gives errors every morning
//   'https://realtime.site-intelligence.co.uk/financialtimes/dashboard.html',

   // AHP site starts failing with an error button
   //'http://ahp.svc.ft.com/tasks/reporting/ReportingTasks/runReportStep2?report_id=107&basicAuthRequired=true&report_template_id=42&ftWorkFlowIds=262:274:257:241:204&run-report=Run',

   'MISC',

// Google test calendar puts up an alert every day stopping the page flow
//   'https://www.google.com/calendar/render?cid=dmFvb2R2MmZjM290Y2htMThqNnBwOGNwajRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&invEmailKey=brent.cowgill@ft.com:d0fdcc666ac9153743bd8de109c6c13bdb06bece',
   // Doubleclick Quality of Service monitor breaks out of the iframe and hogs the display. too bad because it looks good.
   //'http://qos.doubleclick.net/default.htm',

   // Site intelligence gives errors every morning
   //'https://realtime.site-intelligence.co.uk/financialtimes/itdashboard.html',

   'ART',

   // Marks the end of array to prevent comma syntax errors, is skipped when processing
   '-'
];
URLs.pop();

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
   'http://google.co.uk',
   'http://bitcoincharts.com/markets/',

   "http://slashdot.org/",
   "http://www.theregister.co.uk/software/",
   "http://www.wired.com/",
   "http://www.deathclock.com/dw.cfm?Day=1&Month=1&Year=1987&Sex=Male&Mode=Normal&bmi=-25&smoker=0",

   "http://itkanban.com",

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

function initURLs() {
   NO_INTERNET_IMAGE = SETTINGS.DROPBOX + NO_INTERNET_IMAGE;
   artURLs = AutoPics;
   noInternet(companyURLs);
   noInternet(miscURLs);
   noInternet(artURLs);
}

function noInternet(rArray) {
   var idx;
   return; // disable this line to simply show the NO INTERNET image
   for (idx = rArray.length - 1; idx >= 0; --idx) {
      if (rArray[idx].match(/^http/)) {
         rArray[idx] = NO_INTERNET_IMAGE;
      }
   }
   //alert(rArray.join("\n"));
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
   return rArray[idx++ % rArray.length];
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

function loadContent(idImg) {
   var html = '', URL = chooseContent(), idPanel = idImg.replace(/img/, 'panel'), rNode = jQuery('#' + idPanel);
   if (URL.match(/\.(jpg|gif|png)$/i)) {
      html = '<' + 'img id="' + idImg + '" src="' + URL + '" alt="' + URL + '"/>';
      //html = "<" + "img id='" + idImg + "' width='" + SETTINGS.WIDTH + "' height='" + SETTINGS.HEIGHT + "' src='" + URL + "'\/>";
   } else {
      html = '<' + 'iframe id="' + idImg + '" src="' + URL + '"><\/iframe>';
   }
   rNode.html(html);
}

function onTopPanelHidden() {
   if (!stop) {
      setTimeout(function () {
         showTopPanel();
      }, SETTINGS.REFRESHTIME);
   }
   loadContent('img1');
}

function onBottomPanelHidden() {
   if (!stop) {
      setTimeout(function () {
         hideTopPanel();
      }, SETTINGS.REFRESHTIME);
   }
   loadContent('img2');
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

function freeze() {
   stop = true;
}

function thaw() {
   stop = false;
   jQuery('#panel1').show();
   setTimeout(function () {
      hideTopPanel();
   }, SETTINGS.REFRESHTIME);
}

function changeContent() {
   var html = '', URL = URLs[idx++ % URLs.length], rNode = jQuery('#statusDiv');
   if (URL === 'COMPANY') {
      URL = choose(companyURLs);
   } else if (URL === 'ART') {
      URL = choose(artURLs);
   } else if (URL === 'MISC') {
      URL = choose(miscURLs);
   }

   if (URL.match(/\.(jpg|gif|png)$/i)) {
      html = "<img width='" + SETTINGS.WIDTH + "' height='" + SETTINGS.HEIGHT + "' src='" + URL + "'/>";
   } else {
      html = '<iframe id="status" width="' + SETTINGS.WIDTH + '" height="' + SETTINGS.HEIGHT + '" src="' + URL + '">';
   }
   rNode.html(html);
}

jQuery(document).ready(function () {
   initURLs();
   initEffects();
   // try to stop the slides if you click on the page -- this seems not to work.
   jQuery('body').click(function () { freeze(); });
   onBottomPanelHidden();
});
