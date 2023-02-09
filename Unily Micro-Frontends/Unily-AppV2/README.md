The following commands include pipelines for the application building process, both for production and development, and also for testing.

**Commands for building the application:**

To build the application for development (The code will not be bundled or minified, for easier debugging).
```
npm run build
```

To build the application for **production** (The code will be bundled and minified), also runs the 'generate-docs' command - refer to the next command underneath.
```
npm run build-prod
```

To generate the Unily APIs documentation for the specified services defined inside *typedoc.json* configuration file with the *entryPoints* option.
Note: any newly introduced services or components must be included in the csproj, else they would not be copied over when deployed.
The following folders contain the documentation files.
    Unily\Views\JSDocumentation\classes
    Unily\Views\JSDocumentation\modules

```
npm run generate-docs
```

To build the application for development and then watch for any changes being made (after a file has been saved) in the code during development to update the build automatically without the need of running the 'build' command each time.
```
npm run start
```

To build the application for **production** and then watch for any changes being made (after a file has been saved) in the code during development to update the build automatically without the need of running the 'build-prod' command each time.
```
npm run start-prod
```

**Commands for testing the application:**

To run the application in watch mode and launch the Karma test runner to start execution on spec files.
```
npm run test
```

To run Cypress end-to-end tests for desktop and mobile in headless mode (without browser UI) - provides faster execution and results.
```
npm run e2e
```

To run Cypress end-to-end tests for desktop in headed mode (with browser UI) - better suited for debugging purposes.
```
npm run e2e:open:desktop
```

To run Cypress end-to-end tests for mobile in headed mode (with browser UI) - better suited for debugging purposes.
```
npm run e2e:open:mobile
```

**Additional development commands:**

[Installing class libraries](https://brightstarr.visualstudio.com/Unily/_wiki/wikis/Unily.wiki/7894/Unily-JS-TS-POC?anchor=some-useful-commands%3A)
