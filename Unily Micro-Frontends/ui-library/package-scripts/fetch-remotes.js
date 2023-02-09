const fs = require('fs');

const remoteFactory = async () => {
    return {oldUiLibrary: 'http://localhost:4202/remoteEntry.js'}
}

remoteFactory().then(result => {
    const esModule = `module.exports = ${JSON.stringify(result)}`;
    fs.writeFileSync('remotes.js', esModule, { flag: 'w' });
});