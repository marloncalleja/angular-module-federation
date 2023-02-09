const fs = require('fs');

const remoteFactory = async () => {
    return {
        uiLibrary: 'http://localhost:4201/remoteEntry.js',
        oldUiLibrary: 'http://localhost:4202/remoteEntry.js',
        tokens: 'http://localhost:4203/remoteEntry.js'
    }
}

remoteFactory().then(result => {
    const esModule = `module.exports = ${JSON.stringify(result)}`;
    fs.writeFileSync('remotes.js', esModule, { flag: 'w' });
});
