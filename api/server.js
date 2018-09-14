
import http from 'http';

import app from './app';

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => console.log(`listening  on port ${port}...`));

export default server;
