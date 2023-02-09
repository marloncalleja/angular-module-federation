const fs = require('fs');

const remoteFactory = async () => {
    return {}
}

remoteFactory().then(result => {
    const esModule = `module.exports = ${JSON.stringify(result)}`;
    fs.writeFileSync('remotes.js', esModule, { flag: 'w' });
});