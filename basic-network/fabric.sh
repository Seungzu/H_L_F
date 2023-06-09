#!/bin/bash

if [ "$1" = "up" ]; then
    
    cp -r /$GOPATH/src/fabric-samples/bin ./

    if [ -d "config" ]; then
        echo "already exist config directory"
    else
        mkdir config
    fi

    if [ -d "crypto-config" ]; then
        echo "already exist crypto-config directory"
    else
        mkdir crypto-config
    fi

    export FABRIC_CFG_PATH=$PWD

    ./bin/cryptogen generate --config=./crypto-config.yaml

    ./bin/configtxgen -profile OrdererGenesis -outputBlock ./config/genesis.block

    ./bin/configtxgen -profile Channel1 -outputCreateChannelTx ./config/channel1.tx -channelID channelsales1

    ./bin/configtxgen -profile Channel1 -outputAnchorPeersUpdate ./config/Sales1Organchors.tx -channelID channelsales1 -asOrg Sales1Org

    ./bin/configtxgen -profile Channel1 -outputAnchorPeersUpdate ./config/CustomerOrganchors.tx -channelID channelsales1 -asOrg CustomerOrg

    docker-compose -f docker-compose.yaml up -d orderer.acornpub.com peer0.sales1.acornpub.com peer1.sales1.acornpub.com peer0.customer.acornpub.com peer1.customer.acornpub.com cli

    docker ps -a

    echo "change keystore on connection.json"
    echo "change keystore on docker-compose-ca.yaml"
    echo "order ===>  docker-compose -f docker-compose-ca.yaml up -d ca.sales1.acornpub.com"
    echo "docker exec -it cli bash"

elif [ "$1" = "down" ]; then

    sudo rm -rf config
    sudo rm -rf crypto-config
    sudo rm -rf bin
    docker compose down
    docker stop ca.sales1.acornpub.com
    docker rm $(docker ps -aq)
    docker ps -a
    echo "change keystore on connection.json"
    echo "change ca on docker-compose-ca.yaml"

elif [ "$1" = "start" ]; then

    sudo docker-compose -f docker-compose.yaml up -d orderer.acornpub.com peer0.sales1.acornpub.com peer1.sales1.acornpub.com peer0.customer.acornpub.com peer1.customer.acornpub.com cli
    docker-compose -f docker-compose-ca.yaml up -d ca.sales1.acornpub.com
    docker ps -a
    docker exec -it cli bash

elif [ "$1" = "stop" ]; then

    docker compose down
    docker stop ca.sales1.acornpub.com
    docker rm $(docker ps -aq)
    docker ps -a

else

    echo "wrong order"

fi


# peer channel create -o orderer.acornpub.com:7050 -c channelsales1 -f /etc/hyperledger/configtx/channel1.tx

# peer channel join -b channelsales1.block

# peer channel update -o orderer.acornpub.com:7050 -c channelsales1 -f /etc/hyperledger/configtx/Sales1Organchors.tx

# CORE_PEER_ADDRESS=peer1.sales1.acornpub.com:7051

# peer channel join -b channelsales1.block
############################################################################################################################################
# peer chaincode install -l golang -n kkk6 -v 1.0 -p chaincode/go/

# peer chaincode instantiate -o orderer.acornpub.com:7050 -C channelsales1 -n kkk6 -v 1.0 -c '{"Args":[""]}' -P "OR ('Sales1Org.member')"

# peer chaincode query -o orderer.acornpub.com:7050 -C channelsales1 -n kkk6 -c '{"function":"getWallet","Args":["1Q2W3E4R"]}'


fruits=("사과" "바나나" "오렌지")
for fruit in "${fruits[@]}"
do
    echo "asdf: $fruit"
done