var Bakery = function(pid, btype) {
    var obj = {
    ProdId : pid,
    BreadType : btype,
    }
    return {
        bakery : obj
    }
}
module.exports = Bakery;