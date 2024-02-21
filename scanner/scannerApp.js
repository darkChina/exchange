require("dotenv").config();

const { Web3 } = require("web3");
const web3 = new Web3(process.env.INFURA_ENDPOINT);

const { sendEth } = require("./sendEth.js");

const { Client } = require("pg");
const client = new Client({
  host: "127.0.0.1",
  port: 5432,
  database: "testdb",
  user: "postgres",
  password: "root",
});

client.connect().then("Connected to db...");

const scan = () => {
  client
    .query("SELECT * FROM IncomingTx")
    .then((queryResult) => {
      web3.eth.getBlockNumber().then((blockNumber) => {
        web3.eth.getBlock(Number(blockNumber) - 2).then((block) => {
          if (block.transactions != undefined) {
            for (let i = 0; i < block.transactions.length; i++) {
              web3.eth
                .getTransaction(block.transactions[i])
                .then((resultTx) => {
                  for (let j = 0; j < queryResult.rows.length; j++) {
                    if (queryResult.rows[j].exchange_address == resultTx.to) {
                      console.log("TX: " + resultTx.to + " is found.");
                      //sendERC20 here
                    }
                  }
                });
            }
          }
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
console.log("Scanner is running...");

setInterval(scan, 10000);
