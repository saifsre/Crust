var Sandwich = function(name, size, toasted, price, veg, cals) {
   var obj = {
    sName : name,
    Size : size,
    Toasted : toasted,
    Price : price,
    Vegetarian : veg,
    Calories : cals,
   }
   return {
    sandwich : obj
}
}
module.exports =  Sandwich;