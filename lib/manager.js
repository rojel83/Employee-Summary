const Employee = require("./employee");

class Manager extends Employee {
  constructor(name, id, email, officeNum) {
    super(name, id, email);

    this.officeNumber = officeNum;
    this.name = name;
    this.id = id;
    this.email = email;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    return "Manager";
  }
}

module.exports = Manager;
