import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { resolve as resolvePath } from 'path';
import App from './app';

// add some generic error handlers here, to log any exceptions we're not expecting
process.on('uncaughtException', (err) => console.log('uncaughtException', err));
process.on('unhandledRejection', (reason) =>
  console.log('unhandledRejection', reason)
);

// this kicks off the running of the application
// it'll check the environment variables for a base url and port
function runApp() {
  // get the base url
  const BASE_URL = process.env.BASE_URL || '';
  const PORT = process.env.PORT || 3901;

  // Start listening for connections, and serve static files.
  const server = new MRE.WebHost({
    baseDir: resolvePath(__dirname, '../public'),
    baseUrl: BASE_URL,
    port: PORT
  });

  // Handle new application sessions
  server.adapter.onConnection((context) => {
    return new App(context);
  });
}

// this checks for a debugger, if there is one, takes a little time
// before starting the app
const delay = 1000;
const argv = process.execArgv.join();
const isDebug = argv.includes('inspect') || argv.includes('debug');

if (isDebug) {
  setTimeout(runApp, delay);
} else {
  runApp();
}
