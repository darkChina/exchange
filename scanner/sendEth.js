require("dotenv").config();
const { Web3 } = require("web3");
const web3 = new Web3(process.env.INFURA_ENDPOINT);

const sendEth = (toAddress) => {
  web3.eth.getGasPrice().then((gasPrice) => {
    console.log(gasPrice)
    web3.eth
      .getTransactionCount(
        "0x64180aAA2B17d88AeB585BE63f215DBF4760e201",
        "pending"
      )
      .then((nonce) => {
        web3.eth.accounts
          .signTransaction(
            {
              to: toAddress,
              from: "0x64180aAA2B17d88AeB585BE63f215DBF4760e201",
              value: 11300000000000,
              gas: 53000,
              gasPrice: gasPrice +10n,
              nonce: nonce,//нонс не уникален
            },
            process.env.SENDER_PRIVATE_KEY
          )
          .then((signed) => {
            web3.eth
              .sendSignedTransaction(signed.rawTransaction)
              .then((receipt) => {
                console.log(receipt);
              });
          }).catch(console.log);
      }).catch(console.log);
  }).catch(console.log);
};

module.exports = {
  sendEth,
};

