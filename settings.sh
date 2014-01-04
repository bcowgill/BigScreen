# set up dirs and stuff here
# could do host detection or just hard code values for local setup

# X11 display var if needed
#DISPLAY=:0.0
#DISPLAY=:0
#export DISPLAY

SCRWIDTH=1920
SCRHEIGHT=1080

# full path to location of this BigScreen project
BIGSCREEN=/cygdrive/d/d/s/github/BigScreen

# full path to location of image files to scan for
DROPBOX=$BIGSCREEN/Dropbox
DROPBOXSUBDIR=Photos/Wallpaper

# unix like systems use:
BIGSCREENURL=file://$BIGSCREEN
DROPBOXURL=file://$DROPBOX/$DROPBOXSUBDIR

# windows systems use:
BIGSCREENURL="file://D|d/s/github/BigScreen"
DROPBOXURL="file://D|d/Dropbox/$DROPBOXSUBDIR"

# set the browser to use unix/win/mac
BROWSER=chromium-browser
BROWSER="$BIGSCREEN/macbrowser.sh"
BROWSER="/cygdrive/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"

export BIGSCREEN BIGSCREENURL DROPBOX DROPBOXSUBIR DROPBOXURL BROWSER SCRWIDTH SCRHEIGHT

[ ! -d "$BIGSCREEN" ] && echo Directory BIGSCREEN set incorrectly: $BIGSCREEN does not exist
[ ! -d "$DROPBOX" ] && echo Directory DROPBOX set incorrectly: $DROPBOX does not exist
[ ! -d "$DROPBOX/$DROPBOXSUBDIR" ] && echo Directory DROPBOXSUBDIR set incorrectly: $DROPBOX/$DROPBOXSUBDIR does not exist
[ ! -x "$BROWSER" ] && echo Browser BROWSER set incorrectly: $BROWSER not executable
