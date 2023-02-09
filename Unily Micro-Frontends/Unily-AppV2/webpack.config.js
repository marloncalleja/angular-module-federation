const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const { FederatedTypesPlugin } = require('@module-federation/typescript');
const path = require('path');

const remotes = require('./remotes');

const federationConfig = {
    name: 'unily',
    filename: 'remoteEntry.js',
    remotes,
    shared:  {
        // This allows us to import modules with different versions of angular.
        // This also lets us re-use packages that have already been loaded either by the shell or by previously loaded remote modules.
        ...shareAll({ requiredVersion: 'auto' })
    }
}

module.exports = {
    ...withModuleFederationPlugin(federationConfig),
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        }
    },
    plugins: [
        new FederatedTypesPlugin({ federationConfig })
    ],
    experiments: {
        // This allows us to use 'await' outside of a class or angular construct.
        // By doing so, we can asynchronously import remote modules before our root module is initialised,
        // which lets us provide services to @NgModule before the bootstrap function is called.
        topLevelAwait: true,
        outputModule: true
    }
}
