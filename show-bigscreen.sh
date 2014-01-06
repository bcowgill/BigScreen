#!/bin/bash
# start up the browser with any tabs needed for the big screen monitor

source settings.sh

killall "$BROWSER"
sleep 5

"$BROWSER" "$BIGSCREENURL/bigscreen.html" \
http://www.google.com \
> bigscreen-browser.log 2>&1 &

