#!/bin/bash
# Perform code complexity/maintainability analysis
pushd ..
plato -r --exclude 'big-screen/(js|slide-panel)/' -d plato-output/big-screen big-screen
open -a 'Google Chrome' plato-output/big-screen/index.html &
popd
