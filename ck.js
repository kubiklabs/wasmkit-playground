const fs = require('fs');
const yaml = require('js-yaml');

const inputFile = 'checkpoints/staking.yaml';
const outputFile = 'stake_output.json';

try {
  // Read the input YAML file
  const fileContents = fs.readFileSync(inputFile, 'utf8');
  
  // Parse the YAML into a JavaScript object
  const data = yaml.load(fileContents);
  
  // Write the object as JSON to the output file
  fs.writeFileSync(outputFile, JSON.stringify(data));
  
  console.log(`Successfully converted ${inputFile} to ${outputFile}`);
} catch (err) {
  console.error(err);
}
