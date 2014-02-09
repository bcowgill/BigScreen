#!/bin/bash
# scan dropbox for pictures to use in the bigscreen monitor display

source settings.sh

find $DROPBOX/$DROPBOXSUBDIR -type f -iname '*.jpg' -o -iname '*.png' -o -iname '*.gif' \
 | grep -v screen-measure.PNG \
 | perl -pne "s{\ }{%20}xmsg; s{\A$DROPBOX/$DROPBOXSUBDIR/}{   0x34$DROPBOXURL/}xms; s{\n\z}{0x34,\n}xms" | perl -pne 's{0x34}{"}xmsg'

