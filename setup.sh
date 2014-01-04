#!/bin/bash
# set things up for the bigscreen monitor box Win7
mkdir -p /cygdrive/c/sandbox
pushd /cygdrive/c/sandbox
mkdir AdsMetricsDropbox
git clone http://git.svc.ft.com:9080/git/modules/advertising
cd advertising/misc/big-screen
ln -s /cygdrive/c/sandbox/AdsMetricsDropbox Dropbox

popd
