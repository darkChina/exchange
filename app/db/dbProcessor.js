require("dotenv").config();

const { Web3 } = require("web3");
const web3 = new Web3(process.env.INFURA_ENDPOINT);

const { Client } = require("pg");
const client = new Client({
  host: "127.0.0.1",
  port: 5432,
  database: "testdb",
  user: "postgres",
  password: "root",
});

const enableConnection = async () => {
  await client.connect();
};

const disableConnection = async () => {
  await client.end();
};

const testReq = (req, res) => {
  client
    .query("SELECT * FROM test")
    .then((queryResult) => {
      const rows = queryResult.rows;
      res.json({
        rows,
      });
    })
    .catch((err) => {
      res.json({
        message: `Error caught: ${err}`,
      });
    });
};

const addTx = (req, res) => {
  let conversionRequest = {
    convert: req.body.convert,
    address: req.body.address,
    volume: req.body.volume,
  };

  console.log(conversionRequest);
  if (conversionRequest.convert === true) {
    const exchangeAccount = web3.eth.accounts.create();
    client
      .query(
        `INSERT INTO ReceiverAddress (address, private_key) VALUES ('${
          exchangeAccount.address
        }', '${exchangeAccount.privateKey}');
       INSERT INTO IncomingTx (volume, sender_address, exchange_address, state) VALUES ('${
        conversionRequest.volume
       }', '${conversionRequest.address.toLowerCase()}', '${exchangeAccount.address.toLowerCase()}', 0);`
      )
      .then(() => res.json({ exchangeAddress: exchangeAccount.address.toLowerCase() }))
      .catch((err) => {
        res.json({
          message: `Error caught: ${err}`,
        });
      });
  } else {
    res.json({
      message: `Conversion request is incorrect`,
    });
  }
};

module.exports = {
  enableConnection,
  disableConnection,
  testReq,
  addTx,
};
