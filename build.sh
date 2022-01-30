set -v
mkdir /sockjs-broker
cd /sockjs-broker || exit
mv /package.json .
echo "" > .env
yarn
rm -rf /build.sh
