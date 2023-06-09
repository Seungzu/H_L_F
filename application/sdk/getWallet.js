'use strict';

async function getWalletFunc(id){
    try{
        const { FileSystemWallet, Gateway } = require('fabric-network')
        const path = require('path')
        const ccpPath = path.resolve(__dirname, '..', 'connection.json')
        const walletPath = path.join(process.cwd(), '../application', 'wallet')
        const wallet = new FileSystemWallet(walletPath)
        const userExists = await wallet.exists('user1');
        if(!userExists){
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return
        }
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery:{ enabled: true, asLocalhost:true}})
        const network = await gateway.getNetwork('channelsales1');
        const contract = network.getContract('kkk6')
        // var walletid = process.argv[2]
        console.log('myId is ', id)
        const result =await contract.evaluateTransaction('getWallet', id);
        console.log(`Transaction has been evaluated, result is : ${result.toString()}`)

    } catch(error){
        console.error(`Failed to evaluate transaction: ${error}`)
        process.exit(1)
    }
}

module.exports = { getWalletFunc };