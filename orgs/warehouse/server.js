'use strict';

const express = require('express')
const app = express()
const port = 3001
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies




// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');

// A wallet stores a collection of identities for use
const wallet = new FileSystemWallet('../identity/user/nick/wallet');

app.use(express.static('../public'));
app.post('/api/addbatch', async (req, res) => {
    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();

    // Main try/catch block
    try {

        // Specify userName for network access
        const userName = 'Admin@warehouse.nck.com';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('./gateway/networkConnection.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled: false, asLocalhost: true }

        };


        await gateway.connect(connectionProfile, connectionOptions);
        const network = await gateway.getNetwork('bychannel');
        const contract = await network.getContract('nckcc');
        const buyResponse = await contract.submitTransaction('createBatch',
            req.body.rfid,
            req.body.drugname,
           	req.body.amount,
            req.body.organization,
            req.body.manufacture_date,
            req.body.expiry_date,
            req.body.minTemp,
            req.body.maxTemp,
			req.body.temp
        );
        res.status(201).json({ success: true });
    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
        res.status(500).json({ success: false, error: error });
    } finally {

        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

    }
});






app.get('/api/find', async (req, res) => {
    const id = req.query.batchId;
   
    if (id === '') {
        res.status(200).json({ result: [] })
        return
    }

    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();

    // Main try/catch block
    try {

        // Specify userName for network access
        const userName = 'Admin@warehouse.nck.com';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('./gateway/networkConnection.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled: false, asLocalhost: true }

        };


        await gateway.connect(connectionProfile, connectionOptions);
        const network = await gateway.getNetwork('bychannel');
        const contract = await network.getContract('nckcc');
        const result = await contract.evaluateTransaction('getHistoryForBatch', id);
        console.log(`Transaction has been evaluated, result is: ${ JSON.stringify(JSON.parse(result))}`);
        res.status(200).json(result.toString());
    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
        res.status(500).json(error);
    } finally {
        // Disconnect from the gateway
       console.log('Disconnect from Fabric gateway - warehouse - server.');
        gateway.disconnect();

    }
});

app.delete('/api/recallBatch', async (req, res) => {
    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();
	const id = req.query.batchId;
    // Main try/catch block
    try {

        // Specify userName for network access
        const userName = 'Admin@warehouse.nck.com';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('./gateway/networkConnection.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled: false, asLocalhost: true }

        };


        await gateway.connect(connectionProfile, connectionOptions);
        const network = await gateway.getNetwork('bychannel');
        const contract = await network.getContract('nckcc');
		console.log('delete batch');
        const buyResponse = await contract.submitTransaction('removeBatch', id);
         res.status(204).json({ success: true });
    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
        res.status(500).json({ success: false, error: error });
    } finally {

        // Disconnect from the gateway
       console.log('Disconnect from Fabric gateway - warehouse - server.');
        gateway.disconnect();

    }
});

app.post('/api/updateBatch', async (req, res) => {
    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();
    console.log('Invoking update batch');
    // Main try/catch block
    try {

        // Specify userName for network access
        const userName = 'Admin@warehouse.nck.com';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('./gateway/networkConnection.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled: false, asLocalhost: true }

        };


        await gateway.connect(connectionProfile, connectionOptions);
        const network = await gateway.getNetwork('bychannel');
        const contract = await network.getContract('nckcc');
		  console.log('update batch');
         const buyResponse = await contract.submitTransaction('updateBatch',
            req.body.rfid,
            req.body.temp,
            req.body.isUpdate
        );
        res.status(204).json({ success: true });
    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
        res.status(500).json({ success: false, error: error });
    } finally {

        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

    }
});


app.post('/api/transferBatch', async (req, res) => {
    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();
	const id = req.query.batchId;
	const newOrg = req.query.organization;
	const temp = req.body.temp;
    // Main try/catch block
    try {

        // Specify userName for network access
        const userName = 'Admin@warehouse.nck.com';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('./gateway/networkConnection.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled: false, asLocalhost: true }

        };


        await gateway.connect(connectionProfile, connectionOptions);
        const network = await gateway.getNetwork('bychannel');
        const contract = await network.getContract('nckcc');
        const buyResponse = await contract.submitTransaction('transferBatch',
            req.body.rfid,
            req.body.organization,
			req.body.temp
        );
		 console.log('Batch Transferred.');
        res.status(204).json({ success: true });
    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
        res.status(500).json({ success: false, error: error });
    } finally {

        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

    }
});

app.listen(port, () => console.log(`Warehouse app listening on port ${port}!`))