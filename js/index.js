var staffList = [];

function validateForm() {
  var staffAccount = document.getElementById("StaffAccount").value;
  var staffName = document.getElementById("name").value;
  var staffEmail = document.getElementById("email").value;
  var staffPassword = document.getElementById("password").value;

  var staffDatePicker = document.getElementById("datepicker").value;
  var staffSalary = document.getElementById("baseSalary").value;
  var staffPosition = document.getElementById("position").value;
  var staffWorkTime = document.getElementById("workTime").value;

  var isValid = true;

  isValid &=
    required(staffAccount, "tbTKNV") &&
    checkLength(staffAccount, "tbTKNV", 4, 6);
  isValid &= required(staffName, "tbTen") && checkStaffName(staffName, "tbTen");
  isValid &=
    required(staffEmail, "tbEmail") && checkStaffEmail(staffEmail, "tbEmail");
  isValid &=
    required(staffPassword, "tbMatKhau") &&
    checkLength(staffPassword, "tbMatKhau", 6, 10) &&
    checkStaffPassWord(staffPassword, "tbMatKhau");
  // isValid &=
  //   required(staffDatePicker, "tbNgay") &&
  //   checkStaffDate(staffDatePicker, "tbNgay");
  isValid &=
    required(staffSalary, "tbLuongCB") &&
    checkStaffSalary(staffSalary, "tbLuongCB");
  isValid &= requiredPosition(staffPosition, "tbChucVu");
  isValid &=
    required(staffWorkTime, "tbGiolam") &&
    checkStaffWorkTime(staffWorkTime, "tbGiolam");

  return isValid;
}

function createStaff() {
  // validate dữ liệu
  var isValid = validateForm();
  if (!isValid) return;

  // lấy thông tin người dùng nhập từ input
  var staffAccount = document.getElementById("StaffAccount").value;
  var staffName = document.getElementById("name").value;
  var staffEmail = document.getElementById("email").value;
  var staffPassword = document.getElementById("password").value;
  var staffDatePicker = document.getElementById("datepicker").value;
  var staffSalary = document.getElementById("baseSalary").value;
  var staffPosition = document.getElementById("position").value;
  var staffWorkTime = document.getElementById("workTime").value;

  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].staffAccount === staffAccount) {
      alert(" Kiễm Tra Tài Khoản Nhân viên trùng lặp!");
      return;
    }
  }
  // tạo đối tượng nhân viên từ thông tin người dùng nhập
  var staff = new Staff(
    staffAccount,
    staffName,
    staffEmail,
    staffPassword,
    staffDatePicker,
    staffSalary,
    staffPosition,
    staffWorkTime
  );

  // thêm nhân viên
  staffList.push(staff);
  console.log(staff);
  // in danh sách nhân viên
  renderStaff();
  // lưu nhân viên xuống  local storage
  saveData();
}


function renderStaff(data) {
  if (!data) data = staffList;
  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += `<tr>
    <td>${data[i].staffAccount}</td>
    <td>${data[i].fullName}</td>
    <td>${data[i].email}</td>
    <td>${data[i].password}</td> 
    <td>${data[i].datepicker}</td>
    <td>${data[i].baseSalary}</td>
    <td>${data[i].position}</td>
    <td>${data[i].workTime}</td>
    <td id="totalSalary">${data[i].calculateTotalSalary()}</td>
    <td id="typeOfStaff">${data[i].classifyStaff()}</td>
    <td>
    <button onclick="deleteStaff('${
      data[i].staffAccount
    }')" class="btn btn-danger">Xóa</button>
    <button onclick="getStaffDetail('${
      data[i].staffAccount
    }')" class="btn btn-success" data-toggle="modal"
    data-target="#myModal" >Sửa</button>
  </td>
    </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = html;
}
function saveData() {
  var staffListJSON = JSON.stringify(staffList);

  localStorage.setItem("NV", staffListJSON);
}

function getData() {
  var staffListJSON = localStorage.getItem("NV", staffList);

  if (!staffListJSON) return;

  var staffListLocal = JSON.parse(staffListJSON);
  staffList = mapData(staffListLocal);
  renderStaff();
}

function mapData(dataFromLocal) {
  var result = [];
  for (var i = 0; i < dataFromLocal.length; i++) {
    var oldStaff = dataFromLocal[i];
    var newStaff = new Staff(
      oldStaff.staffAccount,
      oldStaff.fullName,
      oldStaff.email,
      oldStaff.password,
      oldStaff.datepicker,
      oldStaff.baseSalary,
      oldStaff.position,
      oldStaff.workTime
    );
    result.push(newStaff);
  }
  console.log(dataFromLocal);
  console.log(result);
  return result;
}

function required(value, spanId) {
  if (value.length === 0) {
    document.getElementById(spanId).innerHTML = "* Không để trống";
    document.getElementById(spanId).style.display = "block";
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
}
function requiredPosition(value, spanId) {
  if (value.length === 0) {
    document.getElementById(spanId).innerHTML =
      "* Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)";
    document.getElementById(spanId).style.display = "block";
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
}

function checkLength(value, spanId, min, max) {
  if (value.length < min || value.length > max) {
    document.getElementById(
      spanId
    ).innerHTML = `*Độ dài phải từ ${min} > ${max} ký tự `;
    document.getElementById(spanId).style.display = "block";
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
}

function checkStaffName(value, spanId) {
  var pattern =
    /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).innerHTML = "Chỉ chấp nhận từ A-z";
  document.getElementById(spanId).style.display = "block";
  return false;
}
function checkStaffEmail(value, spanId) {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";

    return true;
  }
  document.getElementById(spanId).innerHTML = "Email Không đúng định dạng";
  document.getElementById(spanId).style.display = "block";
  return false;
}
function checkStaffPassWord(value, spanId) {
  var pattern = /^[0-9]+[A-z]+[!@#%]+$/;

  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }

  document.getElementById(spanId).innerHTML = "PassWord không đúng yêu cầu";
  document.getElementById(spanId).style.display = "block";
  return false;
}

function checkStaffSalary(value, spanId) {
  if (value >= 1000000 && value <= 20000000) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).innerHTML = "Lương Từ 1.000.000-20.000.000";
  document.getElementById(spanId).style.display = "block";
  return false;
}
function checkStaffWorkTime(value, spanId) {
  if (value >= 80 && value <= 200) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).innerHTML =
    "Giờ làm trong tháng phải từ 80 - 200";
  document.getElementById(spanId).style.display = "block";
  return false;
}
// function checkStaffDate(value, spanId) {
//   var pattern = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
//   if (pattern.test(value)) {
//     document.getElementById(spanId).innerHTML = "";
//     return true;
//   }
//   document.getElementById(spanId).innerHTML =
//     "Ngày Tháng Năm phải đúng định dạng";
//   return false;
// }

function deleteStaff(staffAccount) {
  var index = findById(staffAccount);
  if (index === -1) {
    alert("không tìm thấy tài khoản phù hợp");
    return;
  }
  staffList.splice(index, 1);
  renderStaff();
  saveData();
}
function findById(StaffAccount) {
  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].staffAccount === StaffAccount) {
      return i;
    }
  }
  return -1;
}
function searchStaff() {
  var result = [];
  var keyword = document.getElementById("searchName").value;
  for (var i = 0; i < staffList.length; i++) {
    var currentStaffAccount = staffList[i].staffAccount;
    var currentStaffName = staffList[i].fullName;
    var currentType = staffList[i].classifyStaff();
    if (
      currentStaffAccount === keyword ||
      currentStaffName === keyword ||
      currentType.includes(keyword)
    ) {
      result.push(staffList[i]);
    }
  }
  renderStaff(result);
}

function getStaffDetail(staffAccount) {
  var index = findById(staffAccount);
  if (index === -1) {
    alert("không tìm thấy Tài Khoản phù hợp");
    return;
  }

  var staff = staffList[index];

  document.getElementById("StaffAccount").value = staff.staffAccount;
  document.getElementById("name").value = staff.fullName;
  document.getElementById("email").value = staff.email;
  document.getElementById("password").value = staff.password;
  document.getElementById("datepicker").value = staff.datepicker;
  document.getElementById("baseSalary").value = staff.baseSalary;
  document.getElementById("position").value = staff.position;
  document.getElementById("workTime").value = staff.workTime;
  document.getElementById("totalSalary").value = staff.calculateTotalSalary();
  document.getElementById("typeOfStaff").value = staff.classifyStaff();

  document.getElementById("StaffAccount").disabled = true;
}

function updateStaff() {
  var isValid = validateForm();
  if (!isValid) return;

  var staffAccount = document.getElementById("StaffAccount").value;
  var staffName = document.getElementById("name").value;
  var staffEmail = document.getElementById("email").value;
  var staffPassword = document.getElementById("password").value;
  var staffDatePicker = document.getElementById("datepicker").value;
  var staffSalary = document.getElementById("baseSalary").value;
  var staffPosition = document.getElementById("position").value;
  var staffWorkTime = document.getElementById("workTime").value;

  var index = findById(staffAccount);
  if (index === -1) {
    alert("Không tìm thấy Tài khoản phù hợp!");
    return;
  }

  staffList[index] = new Staff(
    staffAccount,
    staffName,
    staffEmail,
    staffPassword,
    staffDatePicker,
    staffSalary,
    staffPosition,
    staffWorkTime
  );

  renderStaff();

  saveData();

  document.getElementById("formQLNV").reset();

  document.getElementById("StaffAccount").disabled = false;

  
}
window.onload = function (result) {
  console.log("window onload");
  getData();
};
