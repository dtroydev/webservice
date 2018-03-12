'use strict';

const fs = require('fs');

module.exports = (maintenance, req) => {
  let now = new Date();
  const ms = now.getMilliseconds().toString()
    .padStart(3, '0');
  now = now.toString();
  const log = `${now.slice(0, 24)}.${ms}${now.slice(24)} ${maintenance ? 'Maintenance Mode ' : ''}${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', `${log}\n`, (err) => {
    if (err) {
      console.log(`Unable to update server log: ${err.message}`);
    }
  });
};
