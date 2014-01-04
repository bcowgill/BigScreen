#!/bin/bash
# start up the browser with any tabs for the big screen monitor

source settings.sh

#killall "$BROWSER"
#sleep 5

DISPLAY=:0.0
#DISPLAY=:0

$BROWSER "$BIGSCREENURL/bigscreen.html" \
&

echo You will have to manually log in to the Rally Tab in Chromium

#   http://manager.teads.tv/homepage \
#   'https://www.google.com/moderator/#1/e=201801&t=201801.40' \
#   'https://rally1.rallydev.com/#/3060295232d/custom/4661573112' \
#    http://cranmer.ft.com/QUnitChainer/0-control.html \
# 'https://www.google.com/calendar/render?cid=dmFvb2R2MmZjM290Y2htMThqNnBwOGNwajRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&invEmailKey=brent.cowgill@ft.com:d0fdcc666ac9153743bd8de109c6c13bdb06bece' &
