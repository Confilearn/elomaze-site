// Test script to verify build output
const fs = require('fs');
const path = require('path');

console.log('Checking build output...');

const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  const files = fs.readdirSync(distPath);
  console.log('Build output files:', files);
  
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    console.log('index.html exists and contains:', indexContent.substring(0, 200) + '...');
  }
} else {
  console.log('No dist directory found');
}
