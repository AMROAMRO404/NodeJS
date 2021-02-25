const yargs = require('./node_modules/yargs')
const fs = require('fs');

yargs.command({
    command: 'createVote',
    describe: 'create new vote',
    builder: {
        id: {
            describe: 'your id',
            demandOption: true, // Required 
            type: 'number'
        },
        vote: {
            describe: 'your vote',
            demandOption: true, // Required 
            type: 'text'
        },
    },
    handler(argv) {
        let myFile = 'all-votes.json';
        var obj = {
            votes: []
        };
        var json = JSON.stringify(obj);

        if (fs.existsSync(myFile)) {
            fs.readFile(myFile, 'utf8', function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data); //now it an object
                    obj.votes.push({ id: argv.id, vote: argv.vote }); //add some data
                    json = JSON.stringify(obj); //convert it back to json
                    fs.writeFileSync(myFile, json); // write it back 
                }
            });
        } else {
            obj.votes.push({ id: argv.id, vote: argv.vote });
            json = JSON.stringify(obj);
            fs.writeFileSync(myFile, json);
        }
    }
})
yargs.parse()