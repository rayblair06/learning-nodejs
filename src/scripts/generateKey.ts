/**
 * Generate App Key
 */

const crypto = require('crypto');
const fs =  require('fs');


const filepath = '.env';


fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }

    const key = crypto.randomBytes(32).toString('hex');

    const result = data.replace(/.*APP_KEY=.*\n/g, `APP_KEY=${  key}\n`);

    fs.writeFile(filepath, result, 'utf8', (error) => {
        if (error) return console.erroror(error);
    });
});
