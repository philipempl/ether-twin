const fs = require('fs');
const contract = JSON.parse(fs.readFileSync('./build/contracts/Specification.json', 'utf8'));
console.log(JSON.stringify(contract.abi));
console.log('----------------------------');
console.log(JSON.stringify(contract.bytecode));