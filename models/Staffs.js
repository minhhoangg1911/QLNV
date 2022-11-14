function Staff(
  StaffAccount,
  name,
  email,
  password,
  datepicker,
  baseSalary,
  position,
  workTime
) {
  this.staffAccount = StaffAccount;
  this.fullName = name;
  this.email = email;
  this.password = password;
  this.datepicker = datepicker;
  this.baseSalary = baseSalary;
  this.position = position;
  this.workTime = workTime;

  this.calculateTotalSalary = function () {
    var totalSalary;
    if (this.position === "Sếp") {
      totalSalary = baseSalary * 3;
      return totalSalary;
    }
    if (this.position === "Trưởng phòng") {
      totalSalary = baseSalary * 2;
      return totalSalary;
    }
    if (this.position === "Nhân viên") {
      totalSalary = baseSalary;
      return totalSalary;
    }
  };
  this.classifyStaff = function () {
    var typeOfStaff;
    if (this.workTime >= 192) {
      return (typeOfStaff = "Nhân Viên xuất xắc");
    } else if (this.workTime >= 176) {
      return (typeOfStaff = "Nhân Viên giỏi");
    } else if (this.workTime >= 160) {
      return (typeOfStaff = "Nhân Viên khá");
    } else {
      return (typeOfStaff = "Nhân Viên trung bình");
    }
  };
}
