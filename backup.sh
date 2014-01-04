#!/bin/bash
DROPBOX=/Users/brent.cowgill/Dropbox/Photos/WorkSafe/_FT-docs
pushd ..
tar cvzf big-screen.tgz --exclude=.git/ big-screen
tar xvzf big-screen.tgz --directory=$DROPBOX
popd
