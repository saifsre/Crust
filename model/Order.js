var Order = function(oId, cId, empId, paymentMethod, time, price) {
    var obj = {
    orderId : oId,
    customerId : cId,
    employeeId : empId,
    paymentMethod : paymentMethod,
    timeStamp : time,
    Price : price
    }
    return {
        order : obj
    }
}

module.exports = Order;