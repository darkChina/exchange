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
  let convRequest = {
    convert: req.body.convert,
  };

  console.log(convRequest);
  if (convRequest.convert === true) {
    const account = web3.eth.accounts.create();
    client
      .query(
        `INSERT INTO ReceiverAddress (Address, PrivateKey) VALUES ('${account.address}', '${account.privateKey}');
       INSERT INTO IncomingTx (ToAddress, State) VALUES ('${account.address.toLowerCase()}', 0);`
      )
      .then(() => res.json({ address: account.address.toLowerCase() }))
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
