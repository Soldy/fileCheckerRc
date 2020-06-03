const fs = require('fs');
const nanoTest  = new (require("nanoTest")).test();
const rc = new (require('./index.js')).filecheckerrc();

let filesHeads = {};
let filesDatas = {};
let filesNames = [
    "song62",
    "song61",
    "song60",
    "song59",
    "song58",
    "song57",
    "song56",
    "song55",
    "song54",
    "song53",
    "song52",
    "song51",
    "song50"
];

for (let i = 0 ; filesNames.length > i ; i++){
    filesDatas[filesNames[i]] = fs.readFileSync(
        "testFiles/"+filesNames[i]+".ogg"
    );
}
for (let i = 0 ; filesNames.length > i ; i++){
    filesHeads[filesNames[i]] = rc.ogg.parse(
        filesDatas[filesNames[i]]
    );
}
for (let i = 0 ; filesNames.length > i ; i++){
    nanoTest.add(
        "checksum  "+filesNames[i]+" "+filesHeads[filesNames[i]].Checksum,
        {
             "function":rc.ogg.check,
             "options":[
                filesDatas[filesNames[i]],
                filesHeads[filesNames[i]]
             ]
        },
        "===",
        filesHeads[filesNames[i]].Checksum
    );
}
nanoTest.run();
