var Member = function(cId, points, Name, Phone, Email) {
    var obj = {
    customerId : cId,
    points : points,
    Name : Name,
    Phone : Phone,
    Email : Email
    }
    return {
        member : obj
    }
}

module.exports = Member;