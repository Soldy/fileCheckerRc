

const crc32 = function(input) {
    let crcTable = (function(){
        let c;
        let crcTable = [];
        for(let n =0; n < 256; n++){
            c = n;
            for(let k =0; k < 8; k++){
                c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
            }
            crcTable[n] = c;
        }
        return crcTable;
    })();
    let crc = 0 ^ (-1);
    for (let i = 0;  input.length > i; i++ ) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ input[i]) & 0xFF];
    }
    return (crc ^ (-1)) >>> 0;
};




exports.crc32 = crc32;
