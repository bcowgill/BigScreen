#!/bin/bash
# Script to make things go again once you've rebooted

# Generate the .js file listing all pictures to show
./make-auto-pics.sh

# Fires up the browser to show the metrics
./show-metrics.sh

echo "If the tab with cranmer.ft.com is not working, log in as root and use the go.sh script to start apache after adjusting the IP addresses that script tells you about."

