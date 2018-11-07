var Franchise = function(fid, did, address, phone) {
    var obj = {
    FID : fid,
    DID : did,
    Address : address,
    Phone : phone
    }
    return {
        franchise : obj
    }
}
module.exports = Franchise;
