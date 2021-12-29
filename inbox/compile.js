// compile code will go here
const path = require("path");
const fs = require("fs");
const solc = require("solc");

const pathInbox =  path.resolve(__dirname, "contracts", "Inbox.sol");

const sourceInbox = fs.readFileSync(pathInbox, "utf-8");

module.exports = solc.compile(sourceInbox, 1).contracts[":Inbox"];


