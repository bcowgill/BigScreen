# set up dirs and stuff here
# could do host detection or just hard code values for local setup

#SCRWIDTH=1920
#SCRWIDTH=1280
SCRWIDTH=1024
#SCRWIDTH=1360

#SCRHEIGHT=1200
#SCRHEIGHT=1024
SCRHEIGHT=768

BIGSCREEN=/cygdrive/c/sandbox/advertising/misc/big-screen
DROPBOX=$BIGSCREEN/Dropbox

BIGSCREENURL=file://$BIGSCREEN
BIGSCREENURL="file://C|sandbox/advertising/misc/big-screen"

DROPBOXURL=file://$DROPBOX
DROPBOXURL="file://C|sandbox/AdsMetricsDropbox"

BROWSER=chromium-browser
BROWSER="/cygdrive/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"

export BIGSCREEN BIGSCREENURL DROPBOX DROPBOXURL BROWSER SCRWIDTH SCRHEIGHT
