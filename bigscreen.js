// bigscreen.js
// javascript to switch the visible panel in the bigscreen display

/*jslint browser: true, plusplus: true, maxerr: 1000, indent: 3 */
/*global
   AutoPics, Effects, FTURLs, Math, NO_INTERNET_IMAGE, SETTINGS, URLs,
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
   'FT',

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

var FTURLs = [
   'http://www.ft.com',
   'http://www.ft.com/intl/news-feed',
   'http://markets.ft.com/tearsheets/performance.asp?s=572009',
   'http://video.ft.com/',
   'http://www.ft.com/interactive',
   'http://www.ft.com/comment/blogs',
   'http://www.ft.com/alphaville',
   'http://markets.ft.com/tearsheets/performance.asp?s=PSON.GB%3APLU&vsc_appId=ts&ftsite=FTCOM&searchtype=equity&searchOption=equity',
   'http://blogs.ft.com/beyond-brics/',
   'http://www.ft.com/global-economy',
   'http://www.ft.com/special-reports',
   'http://markets.ft.com/research/Markets/Commodities',
   'http://www.ft.com/indepth',
   'http://www.ft.com/world',
   'http://www.ft.com/world/uk',
   'http://markets.ft.com/tearsheets/performance.asp?s=599362',
   'http://www.ft.com/world/uk/business',
   //'http://www.ft.com/london-2012-olympics',
   'http://www.ft.com/world/africa',
   'http://www.ft.com/world/asiapacific',
   'http://www.ft.com/world/asiapacific/china',
   'http://www.ft.com/world/asiapacific/india',
   'http://www.ft.com/world/asiapacific/japan',
   'http://markets.ft.com/tearsheets/performance.asp?s=568838',
   'http://www.ft.com/world/asiapacific/afghanistan',
   'http://www.ft.com/world/asiapacific/pakistan',
   'http://www.ft.com/world/europe',
   'http://www.ft.com/world/europe/brussels',
   'http://www.ft.com/world/us',
   'http://www.ft.com/companies',
   'http://www.ft.com/technology/science',
   'http://www.ft.com/ftfm',
   'http://markets.ft.com/research/Markets/Currencies',
   'http://www.ft.com/lex',
   'http://www.ft.com/comment',
   'http://www.ft.com/management',
   'http://www.ft.com/personal-finance',
   'http://howtospendit.ft.com/',
   'http://www.ft.com/intl/magazine',
   'http://www.ft.com/intl/arts',
   'http://www.ft.com/intl/arts/food',
   'http://www.ft.com/intl/house-home',
   'http://www.ft.com/intl/arts/style',
   'http://www.ft.com/intl/arts/books',
   'http://www.ft.com/intl/life-arts/pursuits',
   'http://www.ft.com/intl/travel',
   'http://www.ft.com/intl/life-arts/columnists',

   // Marks the end of array to prevent comma syntax errors, is skipped when processing
   '-'
];
FTURLs.pop();

var miscURLs = [
   'http://apod.nasa.gov/apod/astropix.html',
   'http://google.co.uk',
   //'http://bitcoincharts.com/markets/',
   //"https://docs.google.com/spreadsheet/oimg?key=0Ar5rWtMmPMitdEVKRElfUm44bTNPWTlsaDJDbWxXd3c&oid=10&zx=uuu9skvnyj3t",
   //"https://docs.google.com/spreadsheet/oimg?key=0Ar5rWtMmPMitdEVKRElfUm44bTNPWTlsaDJDbWxXd3c&oid=18&zx=wrg20gj9um9z",
   //"https://docs.google.com/spreadsheet/oimg?key=0Ar5rWtMmPMitdEVKRElfUm44bTNPWTlsaDJDbWxXd3c&oid=15&zx=ua9zcgo0kz31",
   //"https://docs.google.com/spreadsheet/oimg?key=0Ar5rWtMmPMitdEVKRElfUm44bTNPWTlsaDJDbWxXd3c&oid=17&zx=f3jya4r0mgjx",

   // intranet now redirects to neo which needs a login.
   //"http://ftintranet.com",
   "http://slashdot.org/",
   "http://www.theregister.co.uk/software/",
   "http://www.wired.com/",
   //"http://www.deathclock.com/dw.cfm?Day=19&Month=7&Year=1967&Sex=Male&Mode=Normal&bmi=-25&smoker=0",

   //"http://sync.in/BlfzqDhX3d", // ads team sync
   //"http://sync.in/xcBrWB8lJo", // big screen sync

   "http://itkanban.com",

   // Personal Pomodoro Chart - inaccessible publicly despite what google says about published pages.
   //"https://docs.google.com/a/ft.com/spreadsheet/oimg?key=0AhWXaqHa_7nEdHplZnpmSkJpdlo3MVRvYTViQVRJaXc&oid=2&zx=4hyid9h6jhv6",

   // Tennis scores
   // 'http://m.bbc.co.uk/sport/tennis/21092816?r=1#refresh',
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
   noInternet(FTURLs);
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
   if (URL === 'FT') {
      URL = chooseRandom(FTURLs);
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
   if (URL === 'FT') {
      URL = choose(FTURLs);
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
