
const client = require('firebase-tools');
const path = require('path');

// Load the service account key
const keyPath = path.resolve('./key.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Bypass proxy SSL issues

console.log(`Starting Hosting deployment using credentials from: ${keyPath}`);

client.deploy({
    project: 'jinwoong-shin-portfolio',
    token: null, // Force usage of GOOGLE_APPLICATION_CREDENTIALS
    cwd: process.cwd(),
    only: 'hosting'
}).then(() => {
    console.log('✅ Hosting Deployment successful!');
}).catch(err => {
    console.error('❌ Hosting Deployment error:', err);
});
