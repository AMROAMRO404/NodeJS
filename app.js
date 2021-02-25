const yargs = require('./node_modules/yargs')
const fs = require('fs');
let data = "new data is added\n";
yargs.command({
    command: 'create',
    describe: 'create new file',
    builder: {
        fileName: {
            describe: 'create file',
            demandOption: true, // Required 
            type: 'text'
        },
    },
    handler(argv) {
        let oldData = '';
        if (fs.existsSync(argv.fileName)) {
            oldData = fs.readFileSync(argv.fileName, 'utf8', function(err, data) {
                if (err) throw err;
                console.log(data);
            });
        }
        fs.writeFileSync(argv.fileName, oldData + data);
    }
})
yargs.parse()