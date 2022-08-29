
**************************************
ON EVERY LOGIN AFTER SETUP IS COMPLETE ONLY RUN BELOW COMMANDS
vagrant up
./down.sh

Smartcontract ::
cd smartcontracts
npm install

cd ..
./byfnsetup.sh

cd /BY-track-and-trace/ui
nvm install 10
npm install
sudo npm install -g  @quasar/cli
npm rebuild node-sass
source ~/.bashrc
quasar dev

Followed by below depending on one or all all nodes should be up

*****Depending on the node you are bringing up update quasar config dev proxy port sup-3000,war-3001,iss-3002*****

cd application/supplier
nvm use 10
npm install
rm -rf _idwallet && node addToWallet.js && node createBatch.js && node server.js

cd application/warehouse
nvm use 10
npm install
rm -rf _idwallet && node addToWallet.js && node createBatch.js && node server.js

on warehouse node

node deliverBatch.js 46793579024
now you will see Supplied By    

node acceptBatch.js 46793579024
now you will see Stored at

node issueBatch.js 46793579024
now you will see Pharmacy


cd application/issuer
nvm use 10
npm install
rm -rf _idwallet && node addToWallet.js && node readBatch.js && node server.js

ON UI view batch  : 46793579024

In case of server side code changes only in relevant warehouse/supplier/issuer node 
npm start


In case of UI change:
quasar dev

In case of change in smartcontract 
npm install
then Bring down the network
./down.sh
Bring up the network again
./byfnsetup.sh
