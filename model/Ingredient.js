var Ingredient = function(name, vegetarian, bbdate) {
    var obj = {
    iName : name,
    Vegetarian : vegetarian,
    BBDate : bbdate
}
return {
    ingredient : obj
}
}
module.exports = Ingredient;