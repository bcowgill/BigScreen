#!/bin/bash
TOP=`pwd`
REPO=svn://anthill.svc.ft.com/repo
MODE='export -r HEAD'
TESTS=online/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war/h5ads-tests
CHAINER=online/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war/QUnitChainer
export AUTORUN='2.5*60*1000'

echo Checking out code from repository
rm checkouttest.log
svn $MODE $REPO/online --depth=files --force > checkouttest.log
svn $MODE $REPO/online/website online/website --depth=files --force >> checkouttest.log
svn $MODE $REPO/online/website/ft-mobile online/website/ft-mobile --depth=files --force >> checkouttest.log
svn $MODE $REPO/online/website/ft-mobile/trunk online/website/ft-mobile/trunk --depth=infinity --force >> checkouttest.log

grep VERSION online/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war/h5ads/ads.js
grep '$Id' online/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war/h5ads-tests/html5-ads-test-plan.js
grep jsonParseError online/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war/h5ads-tests/html5-ads-test-plan.js
grep 'addRandomParam' online/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war/QUnitChainer/QUnitChainer.js

