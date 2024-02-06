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
      console.log(queryResult.rows);
      web3.eth
        .getBlockNumber()
        .then((blockNumber) => {
          web3.eth
            .getBlock(Number(blockNumber))
            .then((block) => {
              console.log(block.number);
              for (let i = 0; i < block.transactions.length; i++) {
                web3.eth
                  .getTransaction(block.transactions[i])
                  .then((resultTx) => {
                    for (let j = 0; j < queryResult.rows.length; j++) {
                      if (
                        queryResult.rows[j].toaddress.toLowerCase() ===
                        resultTx.to
                      ) {
                        sendEth(resultTx.from.toLowerCase());
                      }
                    }
                  })
                  .catch(console.log);
              }
            })
            .catch(console.log);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
};

//scan();

setInterval(scan, 1000);
