# BigScreen

A Team Big Screen slide switcher which runs in the browser.

This allows you to alternate between team related project views and other things like a Dropbox full of pictures, news sites and pages from the company website. During your regular stand up meeting you can have it only show your team screens (burndown, kanban wall, etc)

## Setting up:

You can set this up on unix/linux/mac or windows with cygwin installed.

1. Edit settings.sh to define:
    * where you installed this project
    * the screen dimensions. 
    * what browser to use
    * where your images/charts/photos are (Dropbox)
        * any directories or files in your Dropbox with HIDDEN in the name will not be shown
    * transition and page reload timings
    * select a fixed transition effect rather than a randomly chosen one
    * turn on a display of the Effect/URL
    * use a NO INTERNET AVAILABLE image (to bug the IT support people)

2. Edit urls.js to configure the URL's for:
    * your team build results (builds, bugs, test results, coverage, etc)
    * company website pages to monitor
    * public news or other industry related sites
    * a separate list to show only during your stand up meeting

3. Edit effects.js to disable any transition effects which don't work well for you.

## Checking Configuration:

Run the make-auto-pics.sh script to scan for your pictures and generate an automatic list of pictures to loop through.

This also updates the HTML and CSS files as needed for the screen size, Dropbox location  and starting image.

Check auto-pics.js to ensure it has only found the pictures you want to show on the Big Screen monitor.

Check the settings.js file to ensure it is correct.

Hopefully you won't have to tweak anything to get this working.

## Kicking it off:

Now you can use go.sh to start things up. 

It will run make-auto-pics.sh again and fire up your browser.

You might want to add additional URL's to show-bigscreen.sh if you want the browser started with more than one tab open.

## Enjoy
