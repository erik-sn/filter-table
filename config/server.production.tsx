import * as process from 'process';
/* tslint:disable:no-var-requires object-literal-sort-keys */
delete process.env.BROWSER;

import * as express from 'express';
import * as http from 'http';
import * as React from 'react';
import { renderToString } from 'react-dom/server';


let server: any;
const app = express(); // delcare application
const PORT = process.env.PORT || 3005;

// Set path to public assets
app.use('/filtertable/static', express.static('dist'));

const context: any = {};
app.use('*', (req: any, res: any) => {
    if (context.url) {
      res.writeHead(302, {
        Location: context.url,
      });
      res.end();
    } else {
      res.header('Content-Type', 'text/html; charset=utf-8');
      res.send(renderFullPage());
      res.end();
    }
});


// create server based on application configuration
server = http.createServer(app);

// start the server listening on specified port
server.listen(PORT);

function renderFullPage(): string {
  return `
    <!doctype html>
    <html>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <head>
        <title>Filter Table</title>
        <link rel="stylesheet" href="/filtertable/static/bundle.min.css">
      </head>
      <body id="app-body">
        <div id="app-container"></div>
      </body>
      <script src="/filtertable/static/bundle.min.js"></script>
    </html>
  `;
}