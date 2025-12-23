const db = require('./config/db.js');
console.log(db.prepare('PRAGMA table_info(companymaster)').all());
