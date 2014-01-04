#!/bin/bash
# Script to make things go again once you've rebooted

# Generate the .js file listing all pictures to show
./make-auto-pics.sh

# Fires up the browser to show the bigscreen display
./show-bigscreen.sh

