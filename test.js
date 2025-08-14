import { readFile } from "node:fs";

readFile('./package.json', 'utf-8',(err, data) => {
    if (err) throw err;
    console.info(JSON.parse(data).version);
})