#!/bin/bash
# create auto-pics.js containing AutoPics array of pictures to show from Dropbox directory
# ignoring all files in any /hidden/ directory
# and puts them in a random order

source settings.sh

echo Updating auto-pics.js with list of picture files found in $DROPBOX
(\
 perl -e "print qq{var AutoPics = [\n}";\
 ./getpics.sh | grep -vi /hidden/ | grep Dropbox \
 | perl -pne '$_ = rand() . "\t" . $_' \
 | sort -nr \
 | perl -pne 's{\A[^\t]+\t}{}xms' ;\
 perl -e "print qq{   '-'\n];\nAutoPics.pop();\n}"\
)\
 > auto-pics.js
cat auto-pics.js

# Update settings.js with dropbox location and screen size
echo Updating settings.js with DROPBOX/WIDTH/HEIGHT from settings.sh
perl -e "print qq[var SETTINGS = {\n   'REFRESHTIME': '$REFRESHTIME',\n   'CHANGETIME': '$CHANGETIME',\n   'EFFECTTIME': '$EFFECTTIME',\n   'DROPBOX': '$DROPBOXURL',\n   'WIDTH': $SCRWIDTH,\n   'HEIGHT': $SCRHEIGHT,\n   'SHOWURL': $SHOWURL,\n   'NOINTERNET': $NOINTERNET,\n   'NOINTERNETIMAGE': '$NOINTERNETIMAGE',\n   '-': '-'\n};\n]" \
 > settings.js
cat settings.js

# Update style sheet with screen size
echo Updating css/style.css with WIDTH/HEIGHT from settings.sh
perl -i.bak -pne "s{width:.+/\\*WIDTH\\*/}{width: ${SCRWIDTH}px; /*WIDTH*/}xms; s{height:.+/\\*HEIGHT\\*/}{height: ${SCRHEIGHT}px; /*HEIGHT*/}xms" css/style.css
grep -E 'WIDTH|HEIGHT' css/style.css

# Update bigscreen.html with dropbox location
echo Updating bigscreen.html with DROPBOX values on hard coded images
perl -i.bak -pne "s{src='[^']+/$DROPBOXSUBDIR}{src='$DROPBOXURL}xmsg" bigscreen.html

