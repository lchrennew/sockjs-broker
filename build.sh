set -v
mkdir /sockjs-broker
cd /sockjs-broker || exit
mv /package.json .
touch .env
yarn
rm -rf /build.sh
