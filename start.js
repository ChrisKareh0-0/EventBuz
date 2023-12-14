const next = require('next');
const { createServer } = require('http');
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(handle).listen(3000);
});