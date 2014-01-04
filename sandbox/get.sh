#!/bin/bash
TOP=`pwd`
REPO=svn://anthill.svc.ft.com/repo
MODE='export -r HEAD'
TESTS=online/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war/h5ads-tests
CHAINER=online/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war/QUnitChainer
export AUTORUN='2.5*60*1000'

echo Checking out code from repository
rm checkout.log
svn $MODE $REPO/online --depth=files --force > checkout.log
svn $MODE $REPO/online/website online/website --depth=files --force >> checkout.log
svn $MODE $REPO/online/website/ft-mobile online/website/ft-mobile --depth=files --force >> checkout.log
svn $MODE $REPO/online/website/ft-mobile/trunk online/website/ft-mobile/trunk --depth=infinity --force >> checkout.log

grep 'jsonParseError =' online/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war/h5ads-tests/html5-ads-test-plan.js

echo Finding HTML test plan files
find $TESTS -name '*.html' | grep -v US16403 > html-tests.lst
echo Updating \$Rev\$ markers in test plan files to force browser to reload content
perl -i.bak -pne '$times = 1000000000000; $rand = $rand || int(rand()*$times); s{\$Rev[^\$]*\$}{v=$rand}xms' `cat html-tests.lst` 
echo " "
echo FINDING ?v CACHE BUSTING MARKER
grep \?v= `head -1 html-tests.lst`

echo Setting QUnitChainer auto-run time interval to $AUTORUN
perl -i.bak -pne 's{(autoRunInterval:\s*)\d+}{$1 $ENV{AUTORUN},//}xms' $CHAINER/QUnitChainer.js
perl -i.bak -pne 's{(toEqual\(")15(\s+sec"\);)}{${1}150$2}xms' $CHAINER/spec/QUnitChainerSpec.js

echo Setting up for jscoverage
perl -i.bak -pne 's{jscoverage/jscoverage-server}{jscoverage-server}xms; s{(--no-instrument=)(\S+)}{$1QUnitChainer/$2}xmsg; s{--verbose}{--verbose --no-instrument=QUnitChainer/QUnitChainer.js --no-instrument=html5play/ghostwriter.js --no-instrument=ghostwriter/lib/gw.min.js --no-instrument=h5ads-tests/html5-ads-test-plan.js --no-instrument=h5ads-tests/test-helpers.html.js --no-instrument=h5ads-tests/US16403-admaker/js/US16403.js --no-instrument=html5play/admaker/js/plugins.js --no-instrument=html5play/modernizr.custom.96736.js}xms; --no-instrument=Qucumber/Qucumber.js' $CHAINER/release/jscover-server.sh
#cat $CHAINER/release/jscover-server.sh

echo Activating checked out version for testing in the browser
mv testme deleteme
mv online testme
rm -rf deleteme&

echo Restart the jscover server
pushd testme/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war/QUnitChainer
jscoverage-server --shutdown
cp /usr/local/bin/jscoverage* jscoverage/ 
chmod +x release/*.sh
cd ..
QUnitChainer/release/jscover-server.sh
popd

echo " "
echo FINDING ADS LIBRARY VERSION
grep VERSION testme/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war/h5ads/ads.js
#grep '$Id' testme/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war/h5ads-tests/html5-ads-test-plan.js
#echo 0-control scan:
#grep 'nextTestPlan' testme/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war/QUnitChainer/0-control.html

echo QUnitChainerSpec.js:
perl -ne 'print if m{(toEqual\(")150?(\s+sec"\);)}xms' testme/website/ft-mobile/trunk/src/gwt/ft-ad-enablement/war/QUnitChainer/spec/QUnitChainerSpec.js
