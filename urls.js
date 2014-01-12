// We will add the dropbox location later to this string in initURLs()
var NO_INTERNET_IMAGE = "/HIDDEN/no-internet.jpg";

var URLs = [
   // your build screen URL here
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

// Your company website pages to check
var companyURLs = [
   'http://www.ontology.com',
   'http://www.ontology.com/solutions/support-and-training/',
   'http://www.ontology.com/news-and-media/?tag=news',

   // Marks the end of array to prevent comma syntax errors, is skipped when processing
   '-'
];

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
