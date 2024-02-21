// require("dotenv").config();

// const { Web3 } = require("web3");
// const web3 = new Web3(process.env.INFURA_ENDPOINT);

// const { Client } = require("pg");
// const client = new Client({
//   host: "127.0.0.1",
//   port: 5432,
//   database: "testdb",
//   user: "postgres",
//   password: "root",
// });

// const someArr = [
//   "0x57427ba1fc0951d7382d56d9b156b4d587513147_01",
//   "0xae5b5ac2973bfedcb7d5d922abb409e42177103a",
// ];

// const requestArray = async () => {
//   return await someArr;
// };

// client.connect().then(() => {
//   client.query("SELECT * FROM IncomingTx").then((queryResult) => {
//     requestArray().then((arr) => {
//       for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < queryResult.rows.length; j++) {
//           if (queryResult.rows[j].toaddress.toLowerCase() === arr[i]) {
//             console.log("tx is found");
//           }
//         }
//       }
//     });
//   });
// });

// // const address = "0x27Bc84873c51b0B6c2612918BF2620e543449AA6";

// // web3.eth.getBalance(address).then((res) => {
// //   console.log(web3.utils.fromWei(res, "ether"));
// // });

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});
