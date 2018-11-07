var IngredientProducer = function(prodId, did, address, phone) {
    var obj = {
    ProdId : prodId,
    DID : did,
    Address : address,
    Phone : phone
    }

    return {
        ingredient : obj
    }
}

module.exports = IngredientProducer;