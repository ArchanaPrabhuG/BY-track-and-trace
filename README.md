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


curl -sSL http://bit.ly/2ysbOFE | bash -s 1.4.3

cd fabric-samples

git clone https://github.com/ArchanaPrabhuG/BY-track-and-trace.git


chmod -R 777 BY-track-and-trace
cd BY-track-and-trace

./byfnsetup.sh



Smartcontract ::
cd smartcontracts
sudo apt-get install npm
nvm install 8.17.0
npm install

UI ::

cd /by-track-and-trace/ui
nvm install 10
npm install
sudo npm install -g  @quasar/cli
npm rebuild node-sass
source ~/.bashrc
quasar dev





If Above command is successful you will see -"Chaincode invoke successful. result: status:200"

Only if above succeeded

cd application/supplier
nvm use 10
npm install
npm install --save cors
node addToWallet.js
node createBatch.js
npm start

On further logins
vagrant up
./down.sh delete the 3 folders
./byfnsetup.sh
npm start relevant folder within application
quasar dev on ui folder

Update server.js as in  https://jda365-my.sharepoint.com/:u:/g/personal/archana_prabhu_jda_com/ES7sQlXx4EhJpLyAaPX0FZUBdTL3S9Dailt8cugOirgMUQ?e=bl1gMt
-------------------------------------------------------------------------------------------------------------------------------------------


-------------------------------------------------------------------------------------------------------------------------------------------


Below Instructions are for issues only


Bring down the network
1)./down.sh
cd by-network
rm -rf channel-artifacts
rm -rf crypto-configs
rm -rf scripts
docker ps -a

If you want to tear down the vagrant - vagrant destroy followed by vargrant up perform step 7,8

if you want to restart vagrant-vagrant reload

If none of the commands work export PATH="/bin:/sbin:/usr/bin:/usr/sbin"


cmd to Uninstall node:
sudo npm rm npm -g
sudo rm -rf /usr/local/bin/npm /usr/local/share/man/man1/node* /usr/local/lib/dtrace/node.d ~/.npm ~/.node-gyp /opt/local/bin/node opt/local/include/node /opt/local/lib/node_modules
sudo rm -rf /usr/local/lib/node*
rm package-lock.json && npm i

Bring down the network
./down.sh

Delete all docker containers
docker rm -f $(docker ps -a -q)


npm install -g node-inspector




References:
https://www.coding-bootcamps.com/ultimate-guide-for-building-a-blockchain-supply-chain-using-hyperledger-fabric-and-composer.html
https://github.com/alentar/blockchain-based-IoT-platform-implementation/blob/master/README.md
https://github.com/saicharanpogul/supply-chain-management-using-hyperledger-fabric
https://hyperledger-fabric.readthedocs.io/en/v2.2.0/install.html
https://rapchan.gitbook.io/hyperledger-food-supply-chain/implementation
https://github.com/ialberquilla/hlf1.4-supply-chain
https://www.codegrepper.com/code-examples/javascript/express+cors+not+working
https://github.com/blockNCK/nck/tree/master/by-network


git remote add origin https://github.com/ArchanaPrabhuG/BY-track-and-trace.git

https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account