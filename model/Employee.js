var Employee = function(empId, fid, pid, dob) {
    var obj = {
    employeeId : empId,
    FID : fid,
    personalId = pid,
    dateOfBirth = dob
    }
    return {
        employee : obj
    }
}
module.exports = Employee;