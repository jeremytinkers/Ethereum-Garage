const assert = require("assert");
const Web3 = require("web3");
const ganache=  require("ganache-cli");

const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require("../compile");

let inbox;
let accounts;

beforeEach(async ()=>{
    
    accounts = await web3.eth.getAccounts();
    
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ["Initial Msg"]})
    .send({from:accounts[0], gas: "1000000" });

})


describe("Inbox", ()=>{
    it("checks for initial/constructor msg", async ()=>{

        assert.ok(inbox.options.address);
        let curMsg = await inbox.methods.message().call();
        assert.equal(curMsg, "Initial Msg");
        // console.log(inbox);
    
    })

    it("checks for setMessage", async ()=>{

     await inbox.methods.setMessage("popeye").send({from: accounts[0]});
     const curMsg = await inbox.methods.message().call();

     assert.equal(curMsg, "popeye");

    })


})





