const express = require("express");
const router = express.Router();
const { testReq, addTx } = require("../db//dbProcessor.js");

router.get("/test", testReq);
router.post("/transactons/add", addTx);

module.exports = router;