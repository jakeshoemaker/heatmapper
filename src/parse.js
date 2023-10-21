import csv from 'csv-parser';
import { createReadStream } from 'fs';

function read_csv() {
    let results = [];
    return new Promise((resolve, _) => {
        createReadStream('../data/harborcap.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
        });
    });
}
