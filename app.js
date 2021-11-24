const fs = require('fs');
const csv = require('csv-parser');
const StreamZip = require('node-stream-zip');

const normalizer = require('./services/normalize.service');

const zip = new StreamZip({
    file: 'Test-data.zip',
    storeEntries: true
});

zip.on('ready', () => {
    for (const entry of Object.values(zip.entries())) {
        const zipFilesContents = zip.entryDataSync(entry.name).toString('utf8');

        fs.appendFile('ResultCsv.csv', zipFilesContents, (err) => {
            if(err) {
                throw new Error(err.toString());
            }
        });
    }

    const result = [];

    fs.createReadStream('ResultCsv.csv')
        .pipe(csv({separator: '||'}))
        .on('data', (data) => {
            result.push(data);
        })
        .on('end', () => {
            const users = [];
            result.map((value) => {
                const user = {
                    name: value.first_name+' '+value.last_name,
                    phone: normalizer.normPhone(value.phone),
                    person: {
                        firstName: value.first_name,
                        lastName: value.last_name
                    },
                    amount: Number(value.amount),
                    date: normalizer.normDate(value.date),
                    costCenterNum: normalizer.normCostCenterNum(value.cc)
                };

                users.push(user);

            });
            fs.writeFile('Result.json', JSON.stringify(users, null, 4), (err) => {
                if (err) {
                    throw new Error(err.toString());
                }
            });
            fs.rm('ResultCsv.csv', (err) => {
                if (err) {
                    throw new Error(err.toString());
                }
            });
        });

    zip.close();
});
