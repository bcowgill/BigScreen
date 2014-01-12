BigScreen
=========

A BigScreen display switcher which runs in the browser.

This allows you to alternate between team related views and other things like a Dropbox full of pictures, news sites and pages from the company website.

Setting up:

You can set this up on unix/linux/mac or Windows with cygwin installed.

Edit settings.sh to define where you installed this project, where your photos are (Dropbox), what browser to use and the screen dimensions. You can also set the transition and reload timings or turn on a display of the URL or NO INTERNET AVAILABLE image. Any directories or files in your Dropbox with HIDDEN in the name will not be shown.

Edit urls.js to configure the URL's for your team build results (builds, bugs, test results, coverage, etc) and other URL's to display.

Kicking it off:

Run the make-auto-pics.sh script to scan for your pictures and generate an automatic list of pictures to loop through.
This also updates the HTML and CSS files as needed for the screen size, Dropbox location  and starting image.
Check auto-pics.js to ensure it has only found the pictures you want to show on the Big Screen monitor.
Check the settings.js file to ensure it is correct.

Hopefully you won't have to tweak anything to get this working.

Now you can use go.sh to start things up. It will run make-auto-pics.sh again and fire up your browser.
You might want to add additional URL's to show-bigscreen.sh if you want the browser started with more than one tab open.
