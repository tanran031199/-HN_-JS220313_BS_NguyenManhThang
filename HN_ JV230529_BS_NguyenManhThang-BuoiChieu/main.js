let students = [
  {
    id: crypto.randomUUID(),
    name: " C Nguyen Van",
    email: "example@gmail.com",
    phoneNumber: "09001000",
    town: "Ha Noi",
    gender: "Nam",
  },
  {
    id: crypto.randomUUID(),
    name: "A Nguyen Van",
    email: "example@gmail.com",
    phoneNumber: "09001000",
    town: "Ha Noi",
    gender: "Nam",
  },
  {
    id: crypto.randomUUID(),
    name: "B Nguyen Van",
    email: "example@gmail.com",
    phoneNumber: "09001000",
    town: "Ha Noi",
    gender: "Nam",
  },
];

const formTag = document.querySelector(".form");
const inputTexts = document.querySelectorAll(".form-item .input-text");
const errorMessage = document.querySelectorAll(".error-message");
const addBtn = document.querySelector(".submit");
const tableTag = document.querySelector(".table");
const sortBtn = document.querySelector(".sort-btn");

// ---------------------Input Element---------------------
const inputName = document.querySelector("#full-name");
const inputEmail = document.querySelector("#email");
const inputPhone = document.querySelector("#phone-number");
const inputTown = document.querySelector("#town");
const radioGender = document.querySelectorAll('input[name="gender"]');

// ---------------------Render Data---------------------
function renderData(arr) {
  let studentSearch = students;

  if (arr) {
    studentSearch = arr;
  }

  let showData = `<tr>
                    <th>#</th>
                    <th>Họ và Tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Quê quán</th>
                    <th>Giới tính</th>
                    <th>Hành động</th>
                </tr>`;

  studentSearch.forEach((item, i) => {
    showData += `<tr>
                        <td>${i + 1}</td>
                        <td>${item.name}</td>
                        <td>${item.email}</td>
                        <td>${item.phoneNumber}</td>
                        <td>${item.town}</td>
                        <td>${item.gender}</td>
                        <td>
                            <button class="td-btn edit" data-id="${
                              item.id
                            }">Sửa</button>
                            <button class="td-btn delete" data-id="${
                              item.id
                            }">Xóa</button>
                        </td>
                    </tr>`;
  });

  tableTag.innerHTML = showData;
}

renderData();

// ---------------------Check Validate---------------------
const regexEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const regexPhone =
  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

// ---------------------Check input---------------------
function checkInput(e) {
  for (let i = 0; i < inputTexts.length; i++) {
    let parentElement = inputTexts[i].parentElement;

    if (inputTexts[i].value === "") {
      parentElement.querySelector(
        ".error-message"
      ).innerText = `Vui lòng nhập ${inputTexts[i].id}`;
    } else {
      parentElement.querySelector(".error-message").innerText = "";
    }
  }
}

// ---------------------Get Gender---------------------
function getGender() {
  let gender = "";

  radioGender.forEach((genderItem) => {
    if (genderItem.checked === true) {
      gender = genderItem.value;
    }
  });

  return gender;
}

// ---------------------Add Data---------------------

function addItem(e) {
  e.preventDefault();
  checkInput();

  let checkMail = inputEmail.value.match(regexEmail);
  let checkPhone = inputPhone.value.match(regexPhone);

  let phoneError = inputPhone.parentElement.querySelector(".error-message");
  let emailError = inputEmail.parentElement.querySelector(".error-message");

  if (!checkMail) {
    emailError.innerText = `Vui lòng nhập đúng định dạng ${inputEmail.id}`;
  }

  if (!checkPhone) {
    phoneError.innerText = `Vui lòng nhập đúng định dạng ${inputPhone.id}`;
  }

  let errorCheck = [];
  let errorMessage = document.querySelectorAll(".error-message");

  errorMessage.forEach((item) => errorCheck.push(item.innerText));

  let checkErrorValue = errorCheck.every((item) => item === "");

  if (checkErrorValue && checkMail && checkPhone) {
    if (addBtn.classList.contains("update")) {
      let updateId = addBtn.getAttribute("data-id");
      let index = students.findIndex((item) => item.id === updateId);

      students[index].name = inputName.value;
      students[index].email = inputEmail.value;
      students[index].phoneNumber = inputPhone.value;
      students[index].town = inputTown.value;
      students[index].gender = getGender();

      addBtn.classList.remove("update");
      addBtn.dataset.id = "";
      addBtn.innerText = "Thêm";
      formTag.reset();
    } else {
      students.push({
        id: crypto.randomUUID(),
        name: inputName.value,
        email: inputEmail.value,
        phoneNumber: inputPhone.value,
        town: inputTown.value,
        gender: getGender(),
      });

      formTag.reset();
    }

    renderData();
  }
}

addBtn.addEventListener("click", addItem);

// ---------------------Edit Data---------------------
function editItem(target) {
  let editId = target.getAttribute("data-id");
  let index = students.findIndex((item) => item.id === editId);

  inputName.value = students[index].name;
  inputEmail.value = students[index].email;
  inputPhone.value = students[index].phoneNumber;
  inputTown.value = students[index].town;

  radioGender.forEach((gender) => {
    if (gender.value === students[index].gender) {
      gender.checked = true;
    }
  });

  addBtn.dataset.id = editId;
  addBtn.classList.add("update");
  addBtn.innerText = "Chỉnh sửa";
}

// ---------------------Delete Data---------------------
function deleteItem(target) {
  let deleteId = target.getAttribute("data-id");
  let index = students.findIndex((item) => item.id === deleteId);

  students.splice(index, 1);

  renderData();
}

// ---------------------Table Btn Event---------------------
function handleTableBtn(e) {
  let target = e.target;

  if (target.classList.contains("edit")) {
    editItem(target);
  } else if (target.classList.contains("delete")) {
    deleteItem(target);
  }
}

tableTag.addEventListener("click", handleTableBtn);

// ---------------------Handle Sort---------------------
function hanldeSort() {
  students.sort((item1, item2) => {
    let a = item1.name.toLowerCase().trim();
    let b = item2.name.toLowerCase().trim();

    return a === b ? 0 : a < b ? -1 : 1;
  });

  renderData();
}

sortBtn.addEventListener("click", hanldeSort);

// ---------------------Handle Search---------------------
let searchInput = document.querySelector("#search");

function handleSearch(e) {
  let target = e.target;

  let result = students.filter((student) => {
    let nameConvert = student.name.trim().toLowerCase();

    if (nameConvert.includes(target.value.trim().toLowerCase())) {
      return student;
    }
  });

  renderData(result);
}

searchInput.addEventListener("input", handleSearch);
