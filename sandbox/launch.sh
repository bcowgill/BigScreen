#!/bin/bash
BROWSER=firefox
#BROWSER=chromium-browser
#$BROWSER testme/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war/QUnitChainer/0-control.html &
$BROWSER "http://127.0.0.1:8080/jscoverage.html?missing=true&frame=QUnitChainer/0-control.html" "http://127.0.0.1:8080/jscoverage.html?missing=true&frame=QUnitChainer/0-monitor.html" &
