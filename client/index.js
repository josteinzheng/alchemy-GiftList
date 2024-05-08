const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  let merkleTee = new MerkleTree(niceList);
  const args = process.argv.slice(2);
  const name = args[0];
  const index = niceList.findIndex(n => n === name);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof: merkleTee.getProof(index),
    leaf: name
  });

  console.log({ gift });
}

main();