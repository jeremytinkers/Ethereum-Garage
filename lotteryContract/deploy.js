const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const metamaskMnemonic = require("./config");

const provider =  new HDWalletProvider( metamaskMnemonic , "https://rinkeby.infura.io/v3/2791c633103f4d4e96dc95527e21303a");
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);

  // console.log('Attempting to deploy from account', accounts[0]);

  // const result = await new web3.eth.Contract(JSON.parse(interface))
  //   .deploy({ data: bytecode })
  //   .send({ gas: '1000000', from: accounts[0] });

  // console.log(interface);
  // console.log('Contract deployed to', result.options.address);
  
  // provider.engine.stop();
};

deploy();
