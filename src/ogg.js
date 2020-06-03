const rapidCrc = require('rapid-crc');

exports.parse = function( packet ) {
    let size = 0;
    let out = {
        "CapturePattern":packet.readUInt32LE(0),
        "HeaderType":packet.readUInt8(4),
        "Version":packet.readUInt8(5),
        "GranulePosition":packet.readBigUInt64LE(6),
        "BitstreamSserialNnumber":packet.readUInt32LE(14), // 32 bits
        "PageSequenceNumber":packet.readUInt32LE(18), // 32 bits
        "Checksum":packet.readUInt32LE(22), //  32 bits
        "Checksum1":packet.readUInt8(22), //  32 bits
        "Checksum2":packet.readUInt8(23), //  32 bits
        "Checksum3":packet.readUInt8(24), //  32 bits
        "Checksum4":packet.readUInt8(25), //  32 bits
        "SegmentsNumber":packet.readUInt8(26), // 8 bits
        "PageSegments":[],
        "PageSize":0
    }
    for (let i = 0;out.SegmentsNumber > i; i++){
        out.PageSize += parseInt(packet.readUInt8(27+i));
        out.PageSegments.push(packet.readUInt8(27+i));
    }
    return out;
}

exports.check = function(data, head){
    let end = parseInt(26+head.SegmentsNumber+head.PageSize);
    data.set([0,0,0,0],22);
    return  rapidCrc.crc32(data.slice(0, end));
}

