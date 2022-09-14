1)Download Vagrant:https://releases.hashicorp.com/vagrant/2.3.0/vagrant_2.3.0_windows_amd64.msi
2)Download and Install Putty and PuttyGen
3)Open PowerShell mkdir crystal_ball cd crystal_ball
4)vagrant init hashicorp/bionic64
5)vagrant up
6)vagrant ssh-config
7)Open PuttyGen
Click “Load” and browse to your project folder all the way to **\\.vagrant\machines\default\virtualbox**. Switch to see “all files”, select “private_key” and click Open.
click the “Save private key” button, select “Yes” to save without a passphrase.
Name it something similar like “private_key_putty” in the same folder.
This will create a file with a .PPK extension. Close PuTTYGen and go back to PuTTY now.
8)In PuTTY, load your connection to the new server or type it in again if you didn’t save it.
Connection->SSH->Auth in the sidebar and click “Browse” to find the private key.
Now be sure to save your configuration so you can keep using it later.
9) Add below  to vagrant file in the folder you initiated the vargrant and got it up and running.
   config.vm.network "private_network", ip: "192.168.100.100"
   config.vm.network "forwarded_port", guest: 4200, host: 4200
   10)vagrant reload

11)Once you login to the vargant box using putty Password:vagrant follow the below steps:

sudo apt-get update
sudo apt-get install curl
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc
nvm install 8.9.0

sudo apt-get install \
ca-certificates \
curl \
gnupg \
lsb-release

sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

sudo apt-get install docker-compose
sudo systemctl start docker
sudo usermod -aG docker $USER
sudo chmod 666 /var/run/docker.sock


Install GO:
Download go on windows from https://go.dev/dl/go1.12.17.linux-amd64.tar.gz and drag and drop it in /home/vagrant folder using winscp
sudo tar -C /usr/local -xzf go1.12.17.linux-amd64.tar.gz
export GOPATH=$HOME/go
export PATH=$PATH:/usr/local/go/bin
source ~/.profile
export GOBIN="$GOPATH/bin"
go version
go mod
go env



git clone https://github.com/ArchanaPrabhuG/BY-track-and-trace.git


chmod -R 777 BY-track-and-trace
cd BY-track-and-trace

chaincode ::
cd chaincode
sudo apt-get install npm
nvm install 8.17.0
npm install

cd ..
./byfnup.sh
If Above command is successful you will see -"Chaincode invoke successful. result: status:200"


Client ::

cd /BY-track-and-trace/client

nvm install 10
npm install
sudo npm install -g  @quasar/cli
npm rebuild node-sass
source ~/.bashrc
quasar dev

cd orgs/supplier
nvm use 10
npm install
   rm -rf _idwallet && node addToWallet.js && node createBatch.js && node server.js

cd orgs/warehouse
nvm use 10
npm install
rm -rf _idwallet && node addToWallet.js && node createBatch.js && node server.js

on warehouse node

node deliverBatch.js 46793579024
now you will see supplied by

node acceptBatch.js 46793579024
now you will see stored at

cd orgs/issuer
nvm use 10
npm install
rm -rf _idwallet && node addToWallet.js && node readBatch.js && node server.js

ON client view batch  : 46793579024

In case of server side code changes only in each of above nodes
npm start
README.md
Bring down the network
1)./byfndown.sh

-------------------------------------------------------------------------------------------------------------------------------------------


-------------------------------------------------------------------------------------------------------------------------------------------


Below Instructions are for issues only

If you want to tear down the vagrant - vagrant destroy followed by vargrant up perform step 7,8

if you want to restart vagrant-vagrant reload

If none of the commands work export PATH="/bin:/sbin:/usr/bin:/usr/sbin"

After bringing down the network using ./down.sh if you are still facing issue
cd by-network
rm -rf channel-artifacts
rm -rf crypto-config
rm -rf scripts
docker ps -a


cmd to Uninstall node:
sudo npm rm npm -g
sudo rm -rf /usr/local/bin/npm /usr/local/share/man/man1/node* /usr/local/lib/dtrace/node.d ~/.npm ~/.node-gyp /opt/local/bin/node opt/local/include/node /opt/local/lib/node_modules
sudo rm -rf /usr/local/lib/node*
rm package-lock.json && npm i


Delete all docker containers
docker rm -f $(docker ps -a -q)


npm install -g node-inspector
npm install --save cors


curl -sSL http://bit.ly/2ysbOFE | bash -s 1.4.3

cd fabric-samples